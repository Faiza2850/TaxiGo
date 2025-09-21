package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/jackc/pgtype"
)

func (api *AiportTaxiAPIImpl) FindLocations(req models.SaveLocationRequest) (*models.Location, error) {

	var startPoint, endPoint *pgtype.Point
	var waypoints []pgtype.Point
	var totalDistance float64

	if req.StartPoint.PlaceID != "" {
		startPointDetails, err := getPlaceDetails(req.StartPoint.PlaceID)
		if err != nil {
			return nil, err
		}
		startPoint = &pgtype.Point{
			P: pgtype.Vec2{
				X: startPointDetails.Location.Lat,
				Y: startPointDetails.Location.Lng,
			},
			Status: pgtype.Present,
		}
	}

	if req.EndPoint.PlaceID != "" {
		endPointDetails, err := getPlaceDetails(req.EndPoint.PlaceID)
		if err != nil {
			return nil, err
		}
		endPoint = &pgtype.Point{
			P: pgtype.Vec2{
				X: endPointDetails.Location.Lat,
				Y: endPointDetails.Location.Lng,
			},
			Status: pgtype.Present,
		}
	}

	previousPoint := startPoint
	for _, waypoint := range req.Waypoints {
		if waypoint.PlaceID != "" {
			waypointDetails, err := getPlaceDetails(waypoint.PlaceID)
			if err != nil {
				return nil, err
			}
			currentPoint := pgtype.Point{
				P: pgtype.Vec2{
					X: waypointDetails.Location.Lat,
					Y: waypointDetails.Location.Lng,
				},
				Status: pgtype.Present,
			}
			waypoints = append(waypoints, currentPoint)
			if previousPoint != nil {
				totalDistance += calculateDistance(previousPoint, &currentPoint)
			}
			previousPoint = &currentPoint
		}
	}

	if previousPoint != nil && endPoint != nil {
		totalDistance += calculateDistance(previousPoint, endPoint)
	}

	return &models.Location{
		StartPoint:    startPoint,
		EndPoint:      endPoint,
		Waypoints:     waypoints,
		TotalDistance: &totalDistance,
	}, nil
}

func calculateDistance(point1, point2 *pgtype.Point) float64 {
	const R = 3958.8 // Radius of the Earth in miles
	lat1 := point1.P.X * (math.Pi / 180)
	lng1 := point1.P.Y * (math.Pi / 180)
	lat2 := point2.P.X * (math.Pi / 180)
	lng2 := point2.P.Y * (math.Pi / 180)

	dlat := lat2 - lat1
	dlng := lng2 - lng1

	a := math.Sin(dlat/2)*math.Sin(dlat/2) + math.Cos(lat1)*math.Cos(lat2)*math.Sin(dlng/2)*math.Sin(dlng/2)
	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))

	return R * c
}

func getPlaceDetails(placeID string) (*models.Geometry, error) {
	apiKey := config.Cfg.MapApiKey
	url := fmt.Sprintf("https://maps.googleapis.com/maps/api/place/details/json?place_id=%s&key=%s", placeID, apiKey)

	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	var response struct {
		Result struct {
			Geometry struct {
				Location struct {
					Lat float64 `json:"lat"`
					Lng float64 `json:"lng"`
				} `json:"location"`
				Viewport struct {
					Northeast struct {
						Lat float64 `json:"lat"`
						Lng float64 `json:"lng"`
					} `json:"northeast"`
					Southwest struct {
						Lat float64 `json:"lat"`
						Lng float64 `json:"lng"`
					} `json:"southwest"`
				} `json:"viewport"`
			} `json:"geometry"`
		} `json:"result"`
		Status string `json:"status"`
	}

	err = json.Unmarshal(body, &response)
	if err != nil {
		return nil, err
	}

	if response.Status != "OK" {
		return nil, fmt.Errorf("error from API: %s", response.Status)
	}

	return &models.Geometry{
		Location: models.Coordinates{
			Lat: response.Result.Geometry.Location.Lat,
			Lng: response.Result.Geometry.Location.Lng,
		},
		Viewport: models.Viewport{
			Northeast: models.Coordinates{
				Lat: response.Result.Geometry.Viewport.Northeast.Lat,
				Lng: response.Result.Geometry.Viewport.Northeast.Lng,
			},
			Southwest: models.Coordinates{
				Lat: response.Result.Geometry.Viewport.Southwest.Lat,
				Lng: response.Result.Geometry.Viewport.Southwest.Lng,
			},
		},
	}, nil
}
