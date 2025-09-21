package postgres

import (
	"database/sql"
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/jackc/pgtype"
	"github.com/lib/pq"
)

func (db *AiportTaxiDBImpl) SaveLocationDb(location *models.Location) error {


	query := `
        INSERT INTO public.locations (
            user_id, location_name, start_point, end_point, total_distance, created_at, city, country
        ) VALUES (
            $1, $2, ST_GeogFromText($3), ST_GeogFromText($4), $5, $6, $7, $8
        )
        RETURNING id
    `

	waypoints := make([]string, len(location.Waypoints))
	for i, point := range location.Waypoints {
		if point.P.X == 0 && point.P.Y == 0 {
			return fmt.Errorf("failed to save location: pq: parse error - invalid geometry")
		}
		waypoints[i] = fmt.Sprintf("SRID=4326;POINT(%f %f)", point.P.X, point.P.Y)
	}

	var locationID int
	err := db.dbConn.QueryRow(query,
		location.UserID, location.LocationName,
		fmt.Sprintf("SRID=4326;POINT(%f %f)", location.StartPoint.P.X, location.StartPoint.P.Y),
		fmt.Sprintf("SRID=4326;POINT(%f %f)", location.EndPoint.P.X, location.EndPoint.P.Y),
		*location.TotalDistance, location.CreatedAt, location.City, location.Country,
	).Scan(&locationID)

	if err != nil {
		fmt.Printf("Error executing query: %v\n", err)
		if pqErr, ok := err.(*pq.Error); ok {
			fmt.Printf("Postgres error: %v\n", pqErr)
			switch pqErr.Code.Name() {
			case "invalid_geometry":
				return fmt.Errorf("failed to save location: pq: parse error - invalid geometry")
			case "undefined_table":
				return fmt.Errorf("failed to save location: pq: error - undefined table")
			case "undefined_column":
				return fmt.Errorf("failed to save location: pq: error - undefined column")
			default:
				return fmt.Errorf("failed to save location: %v", err)
			}
		}
		return fmt.Errorf("failed to save location: %v", err)
	}

	location.ID = &locationID

	// Uncomment and handle waypoints if needed
	for _, point := range location.Waypoints {
		if point.P.X == 0 && point.P.Y == 0 {
			return fmt.Errorf("failed to save location: pq: parse error - invalid geometry")
		}
		waypointQuery := `
	        INSERT INTO public.waypoints (location_id, waypoint)
	        VALUES ($1, ST_GeogFromText($2))
	    `
		waypoint := fmt.Sprintf("SRID=4326;POINT(%f %f)", point.P.X, point.P.Y)
		_, err := db.dbConn.Exec(waypointQuery, locationID, waypoint)
		if err != nil {
			return fmt.Errorf("failed to save waypoint: %v", err)
		}
	}

	return nil
}
func (db *AiportTaxiDBImpl) SaveLocationForGuestDb(location *models.Location) error {

	query := `
		INSERT INTO public.locations (
			 location_name, start_point, end_point, waypoints, total_distance, created_at, city, country
		) VALUES (
			$1, ST_GeogFromText($2), ST_GeogFromText($3), $4, $5, $6, $7, $8
		)
		RETURNING id
	`

	// Convert waypoints to a format that can be inserted into the database
	waypoints := make([]string, len(location.Waypoints))
	for i, point := range location.Waypoints {
		if point.P.X == 0 && point.P.Y == 0 {
			return fmt.Errorf("failed to save location: pq: parse error - invalid geometry")
		}
		waypoints[i] = fmt.Sprintf("SRID=4326;POINT(%f %f)", point.P.X, point.P.Y)
	}

	var locationID int
	err := db.dbConn.QueryRow(query,
		location.LocationName,
		fmt.Sprintf("SRID=4326;POINT(%f %f)", location.StartPoint.P.X, location.StartPoint.P.Y),
		fmt.Sprintf("SRID=4326;POINT(%f %f)", location.EndPoint.P.X, location.EndPoint.P.Y),
		pq.Array(waypoints), *location.TotalDistance, location.CreatedAt, location.City, location.Country,
	).Scan(&locationID)
	// fmt.

	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "invalid_geometry":
				return fmt.Errorf("failed to save location: pq: parse error - invalid geometry")
			case "undefined_table":
				return fmt.Errorf("failed to save location: pq: error - undefined table")
			case "undefined_column":
				return fmt.Errorf("failed to save location: pq: error - undefined column")
			default:
				return fmt.Errorf("failed to save location: %v", err)
			}
		}
		return fmt.Errorf("failed to save location: %v", err)
	}

	location.ID = &locationID
	return nil
}

func (db *AiportTaxiDBImpl) GetLocationByIDDB(locationID int64) (*models.Location, error) {

	fmt.Printf("Querying location with ID: %d\n", locationID)

	query := `
		SELECT 
			id, user_id, location_name, 
			ST_AsText(start_point) AS start_point, 
			ST_AsText(end_point) AS end_point, 
			total_distance, created_at, city, country
		FROM 
			public.locations
		WHERE 
			id = $1
	`

	var location models.Location
	var startPoint, endPoint string

	err := db.dbConn.QueryRow(query, locationID).Scan(
		&location.ID, &location.UserID, &location.LocationName,
		&startPoint, &endPoint,
		&location.TotalDistance, &location.CreatedAt, &location.City, &location.Country,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("Location not found")
			return nil, fmt.Errorf("location not found")
		}
		fmt.Printf("Error retrieving location from DB: %v\n", err)
		return nil, fmt.Errorf("error retrieving location from DB: %w", err)
	}

	fmt.Printf("Retrieved StartPoint: %s, EndPoint: %s\n", startPoint, endPoint)

	var startPointX, startPointY, endPointX, endPointY float64
	if _, err := fmt.Sscanf(startPoint, "POINT(%f %f)", &startPointX, &startPointY); err != nil {
		fmt.Printf("Error parsing start point: %v\n", err)
		return nil, fmt.Errorf("error parsing start point: %w", err)
	}
	if _, err := fmt.Sscanf(endPoint, "POINT(%f %f)", &endPointX, &endPointY); err != nil {
		fmt.Printf("Error parsing end point: %v\n", err)
		return nil, fmt.Errorf("error parsing end point: %w", err)
	}
	location.StartPoint = &pgtype.Point{P: pgtype.Vec2{X: startPointX, Y: startPointY}, Status: pgtype.Present}
	location.EndPoint = &pgtype.Point{P: pgtype.Vec2{X: endPointX, Y: endPointY}, Status: pgtype.Present}

	query2 := `SELECT ST_AsText(waypoint) FROM waypoints WHERE location_id = $1`

	rows, err := db.dbConn.Query(query2, locationID)
	if err != nil {
		fmt.Printf("Error retrieving waypoints from DB: %v\n", err)
		return nil, fmt.Errorf("error retrieving waypoints from DB: %w", err)
	}
	defer rows.Close()

	var waypoints []pgtype.Point
	for rows.Next() {
		var waypoint sql.NullString
		if err := rows.Scan(&waypoint); err != nil {
			fmt.Printf("Error scanning waypoint: %v\n", err)
			return nil, fmt.Errorf("error scanning waypoint: %w", err)
		}
		if waypoint.Valid {
			fmt.Printf("Retrieved Waypoint: %s\n", waypoint.String)
			var waypointX, waypointY float64
			if _, err := fmt.Sscanf(waypoint.String, "POINT(%f %f)", &waypointX, &waypointY); err != nil {
				fmt.Printf("Error parsing waypoint: %v\n", err)
				return nil, fmt.Errorf("error parsing waypoint: %w", err)
			}
			waypoints = append(waypoints, pgtype.Point{P: pgtype.Vec2{X: waypointX, Y: waypointY}, Status: pgtype.Present})
		}
	}

	if err := rows.Err(); err != nil {
		fmt.Printf("Error iterating waypoints rows: %v\n", err)
		return nil, fmt.Errorf("error iterating waypoints rows: %w", err)
	}

	location.Waypoints = waypoints

	fmt.Printf("Final Waypoints: %v\n", waypoints)

	return &location, nil
}