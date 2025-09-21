package postgres

import (
	"fmt"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/lib/pq"
)

func (db *AiportTaxiDBImpl) EditLocationDb(location *models.Location) error {
	waypoints := make([]string, len(location.Waypoints))
	for i, point := range location.Waypoints {
		if point.P.X == 0 && point.P.Y == 0 {
			return fmt.Errorf("failed to save location: pq: parse error - invalid geometry")
		}
		waypoints[i] = fmt.Sprintf("SRID=4326;POINT(%f %f)", point.P.X, point.P.Y)
	}

	query := `UPDATE locations SET start_point = $1, end_point = $2, waypoints = $3 WHERE id = $4`
	result, err := db.dbConn.Exec(query, 
		fmt.Sprintf("SRID=4326;POINT(%f %f)", location.StartPoint.P.X, location.StartPoint.P.Y),
		fmt.Sprintf("SRID=4326;POINT(%f %f)", location.EndPoint.P.X, location.EndPoint.P.Y), 
		pq.Array(waypoints), location.ID,
	)

	if err != nil {
		fmt.Println("error", err)
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to retrieve rows affected: %v", err)
	}
	if rowsAffected == 0 {
		return fmt.Errorf("location not found in database: %v", err)
	}

	return nil
}
