package api

import (
	middlewares "github.com/CapregSoft/project-airport-taxi/middleware"

	"errors"
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"

	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) LoginAdmin(c *gin.Context, AdminloginCredentials models.LoginRequest) (string, error) {

	user, err := api.postgres.LoginAdminDb(AdminloginCredentials)
	if user == nil {
		return "", errors.New("user not found")
	}
	if err != nil {
		return "", err
	}
	if user.Password == nil {
		return "", errors.New("user password is not set")
	}

	isMatched, err := checkPassword(*AdminloginCredentials.Password, *user.Password)
	if err != nil && !isMatched {
		return "", errors.New("incorrect password")
	}
	if err != nil {
		return "", fmt.Errorf("error checking password: %v", err)
	}

	token, err := middlewares.GenerateToken(user)
	if err != nil {
		return "", fmt.Errorf("error generating token: %v", err)
	}

	return token, nil
}
