package api

import (
	"errors"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) SignUpUser(c *gin.Context, SignUpCredentials models.SignUpRequest) (bool, error) {

	hashed, err := hashPassword(*SignUpCredentials.Password)
	if err != nil {
		return false, errors.New(err.Error())
	}

	SignUpCredentials.Password = &hashed
	exists, err := api.postgres.SignUpUserDb(SignUpCredentials)
	if err != nil {
		return false, err
	}

	return exists, nil
}
