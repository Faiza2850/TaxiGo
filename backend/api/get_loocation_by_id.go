package api

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (api *AiportTaxiAPIImpl) GetLocationByID(ctx context.Context, locationID int64) (*models.Location, error) {
	if locationID == 0 {
		return nil, errors.New("location ID is required")
	}

	//TODO: get user_id from ctx

	// userId := int64(1)

	location, err := api.postgres.GetLocationByIDDB( locationID)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("location not found")
		}
		return nil, fmt.Errorf("error retrieving location from DB: %w", err)
	}

	return location, nil
}
