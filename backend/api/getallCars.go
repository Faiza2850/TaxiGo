package api

import (
	"github.com/CapregSoft/project-airport-taxi/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) GetAllCarsAPI(c *gin.Context) ([]models.Car, error) {

	allCarsDB, err := api.postgres.GetAllCarsDb()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return nil, err
	}

	return allCarsDB, nil

}
