package api

import (
	"errors"
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (api *AiportTaxiAPIImpl) UserRideHistory(userID int64) ([]models.BookingResponse, error) {
	if userID == 0 {
		return nil, errors.New("booking ID is required")
	}

	booking, err := api.postgres.UserRideHistoryDb(userID)
	if err != nil {
		return nil, fmt.Errorf("error retrieving booking from DB: %w", err)
	}

	if booking == nil {
		return nil, nil
	}

	return booking, nil
}
