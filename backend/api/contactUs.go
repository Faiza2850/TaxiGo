package api

import (
	"time"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) ContactUsAPI(c *gin.Context, fb *models.FeedbackRequest, role string, userId *uint) error {

	currentTime := time.Now()
	fb.CreatedAt = &currentTime

	err := api.postgres.ContactUsDb(fb, role, userId)
	if err != nil {
		println(12)
		return err
	}

	return nil
}
