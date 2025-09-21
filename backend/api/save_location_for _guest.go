package api

import (
	"time"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (api *AiportTaxiAPIImpl) SaveLocationsForGuest(location *models.Location) (*models.Location, error) {
	currentTime := time.Now()
	location.CreatedAt = &currentTime
	// fmt.Printf("currenttime %+v",currentTime)
	err := api.postgres.SaveLocationForGuestDb(location)
	if err != nil {
		return nil, err
	}
	return location, nil
}
