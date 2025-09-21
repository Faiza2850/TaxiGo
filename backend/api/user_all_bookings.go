package api

import (
	"errors"
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (api *AiportTaxiAPIImpl) UserAllBooking(userID int64, bookingID int64) ([]models.BookingResponse, error) {
	if userID == 0 {
		return nil, errors.New("booking ID is required")
	}

	booking, err := api.postgres.UserAllBookingDb(userID, bookingID)
	if err != nil {
		return nil, fmt.Errorf("error retrieving booking from DB: %w", err)
	}

	if booking == nil {
		return nil, errors.New("no booking found for this user")
	}

	return booking, nil
}
