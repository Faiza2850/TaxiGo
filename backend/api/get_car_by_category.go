package api

import (
	"errors"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (api *AiportTaxiAPIImpl) GetCarByCategoryAPI(carCategory string) (*models.Car, error) {

	if carCategory == "" {
		return nil, errors.New("car category is required")
	}

	category, err := api.postgres.GetCarByCategoryDB(carCategory)
	if err != nil {
		return nil, err
	}

	if category == nil {
		return nil, errors.New("car with this category not found")
	}

	return category, nil
}
