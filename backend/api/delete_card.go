package api

import (
	"errors"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) DeleteCardAPI(c *gin.Context, cardId models.DeleteCardRequest) error {

	cardExists, err := api.postgres.CardExistsDb(cardId)
	if err != nil {
		return err
	}

	if !cardExists {
		return errors.New("card not found")
	}

	err = api.postgres.DeleteCardDb(cardId)
	if err != nil {
		return err
	}

	return nil

}
