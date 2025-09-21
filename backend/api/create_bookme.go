package api

import (

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (api *AiportTaxiAPIImpl) CreateBooking(req models.AddBookingRequest, role string, userId *uint) (*models.Booking,*string, error) {
	booking, password, err := api.postgres.CreateBookingDb(req, role, userId)
	if err != nil {
		return nil,nil, err
	}
	

	return booking, password, nil
}
