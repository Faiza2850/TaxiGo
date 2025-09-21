package api

import (
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) GetAllCardsAPI(c *gin.Context, request models.GetAllCardsRequest) (*[]models.GetAllCardResp, error) {

	cards, err := api.postgres.GetAllCardDb(request)
	if err != nil {
		return nil, err
	}

	return cards, nil
}
