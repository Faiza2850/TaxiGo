package api

import (
	"github.com/CapregSoft/project-airport-taxi/models"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)
func (api *AiportTaxiAPIImpl) AddCar(c *gin.Context, AddCarCredentials models.AddCarRequest) (bool, error) {
	
	currentTime := time.Now()
	AddCarCredentials.CreatedAt = &currentTime
	fmt.Printf("currenttime %+v",currentTime)
	car, err := api.postgres.AddCarDb(AddCarCredentials)
	if err != nil {
		println(12)
		return false, err
	}
	return car,nil
}

func (api *AiportTaxiAPIImpl) UpdateCarAPI(c *gin.Context, Updatecar models.UpdateCarRequest) (error){
err := api.postgres.UpdateCarDb(Updatecar)
	if err != nil {
		return err
	}
	return nil
}