package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func (api *AiportTaxiAPIImpl) GetLocationName(lat, lng float64) (string, error) {
	// Helper function to get place name from latitude and longitude
	getPlaceName := func(lat, lng float64) (string, error) {

	  url := fmt.Sprintf("https://maps.googleapis.com/maps/api/geocode/json?latlng=%f,%f&key=AIzaSyCYqgo3_0qvQVJ20cAfwoxqK_mKlNQh06Y", lat, lng)
    
		resp, err := http.Get(url)
		if err != nil {
			return "", err
		}
		defer resp.Body.Close()


		var result struct {
			Results []struct {
				FormattedAddress string `json:"formatted_address"`
			} `json:"results"`
		}
		if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
			return "", err
		}

		if len(result.Results) > 0 {
			return result.Results[0].FormattedAddress, nil
		}
		return "", fmt.Errorf("no address found for lat: %f, lng: %f", lat, lng)
	}

	name, err := getPlaceName(lat, lng)
	if err != nil {
		return "", err
	}

	return name, nil
}
