package api

import (
	"fmt"

	middlewares "github.com/CapregSoft/project-airport-taxi/middleware"

	"errors"

	"github.com/CapregSoft/project-airport-taxi/models"

	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) LoginUser(c *gin.Context, loginCredentials models.LoginRequest) (string, error) {

	users, err := api.postgres.LoginUserDb(loginCredentials)
	if users == nil {
		return "", errors.New("user not found")
	}
	if err != nil {
		return "", err
	}

	token := ""
	for _, user := range users {
		if user.Password == nil {
			continue // Skip users without a password
		}

		isMatched, err := checkPassword(*loginCredentials.Password, *user.Password)
		if err != nil {
			continue
		}
		if isMatched {
			token, err = middlewares.GenerateToken(user)
			if err != nil {
				continue
			}
			break
		}
	}

	if token == "" {
		return "", fmt.Errorf("error generating token: %v", err)
	}

	return token, nil
}