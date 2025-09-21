package api

import (
	"time"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (api *AiportTaxiAPIImpl) SaveLocation(location *models.Location) (*models.Location, error) {
	currentTime := time.Now()
	location.CreatedAt = &currentTime
	err := api.postgres.SaveLocationDb(location)
	if err != nil {
		return nil, err
	}
	return location, nil
}
