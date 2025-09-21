package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sort"

	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/models"
)

var response struct {
	Predictions []struct {
		Description          string `json:"description"`
		PlaceID              string `json:"place_id"`
		Reference            string `json:"reference"`
		StructuredFormatting struct {
			MainText      string `json:"main_text"`
			SecondaryText string `json:"secondary_text"`
		} `json:"structured_formatting"`
	} `json:"predictions"`
	Status string `json:"status"`
}

func (api *AiportTaxiAPIImpl) GetRecommendedPlaces(placeName string) (*models.GetPlacesResponse, error) {
	apiKey := config.Cfg.MapApiKey
	url := "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + placeName + "&key=" + apiKey
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)
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

	err = json.Unmarshal(body, &response)
	if err != nil {
		return nil, err
	}

	if response.Status != "OK" {
		return nil, fmt.Errorf("error from API: %s", response.Status)
	}

	var predictions []models.Prediction
	for _, prediction := range response.Predictions {
		predictions = append(predictions, models.Prediction{
			Description: prediction.Description,
			PlaceID:     prediction.PlaceID,
			Reference:   prediction.Reference,
			City:        prediction.StructuredFormatting.MainText,
			Country:     prediction.StructuredFormatting.SecondaryText,
		})
	}
	sort.SliceStable(predictions, func(i, j int) bool {
        return predictions[i].Country == "UK" && predictions[j].Country != "UK"
    })
	return &models.GetPlacesResponse{
		Predictions: predictions,
		Status:      response.Status,
	}, nil
}
