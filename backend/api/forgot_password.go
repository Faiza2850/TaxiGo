package api

import (
	"errors"

	middlewares "github.com/CapregSoft/project-airport-taxi/middleware"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) ForgotPasswordAPI(c *gin.Context, email models.ForgotPasswordRequest) (*string, error) {

	user, err := api.postgres.ForgotPasswordDb(email)
	if err != nil {
		return nil, err
	}

	resetToken, err := middlewares.GenerateResetToken(user)
	if err != nil {
		return nil, errors.New("error generating reset token")
	}

	return &resetToken, nil

}
