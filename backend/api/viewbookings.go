package api

import (
	"errors"
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (api *AiportTaxiAPIImpl) ViewBooking(userID int64) ([]models.BookingResponse, error) {
	if userID == 0 {
		return nil, errors.New("booking ID is required")
	}

	booking, err := api.postgres.ViewBookingDb(userID)
	if err != nil {
		return nil, fmt.Errorf("error retrieving booking from DB: %w", err)
	}

	if booking == nil {
		return nil, errors.New("no booking history found for this user")
	}

	return booking, nil
}
