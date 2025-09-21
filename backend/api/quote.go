package api

import (
	"errors"
	"fmt"
	"log"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) GetQuoteAPI(c *gin.Context, UserId *uint) ([]models.QuoteResponse, error) {

	log.Printf("recieved user id : %v", UserId)

	data, err := api.postgres.GetQuoteDB(UserId)

	if err != nil {
		return nil, fmt.Errorf("error retrieving quote from DB: %w", err)
	}
	fmt.Println(*data[0].LocationID)

	for i := range data {
		location, err := api.postgres.GetLocationByIDDB(int64(*data[i].LocationID))
		if err != nil {
			return nil, fmt.Errorf("error retrieving location from DB: %w", err)
		}

		startPointName, err := api.GetLocationName(location.StartPoint.P.X, location.StartPoint.P.Y)
		if err != nil {
			return nil, fmt.Errorf("error retrieving start point: %w", err)
		}

		startPoint := &models.PointsWithName{
			Name: &startPointName,
			Point: &models.Point{
				Latitude:  location.StartPoint.P.X,
				Longitude: location.StartPoint.P.Y,
			},
		}

		endPointName, err := api.GetLocationName(location.EndPoint.P.X, location.EndPoint.P.Y)
		if err != nil {
			return nil, fmt.Errorf("error retrieving end point: %w", err)
		}

		endPoint := &models.PointsWithName{
			Name: &endPointName,
			Point: &models.Point{
				Latitude:  location.EndPoint.P.X,
				Longitude: location.EndPoint.P.Y,
			},
		}

		data[i].StartPoint = startPoint
		data[i].EndPoint = endPoint
	}

	if data == nil{
		return nil, errors.New("no quotes found for this user")
	}

	return data, nil
}