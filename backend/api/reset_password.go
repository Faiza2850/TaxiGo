package api

import (
	"errors"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) ResetPasswordAPI(c *gin.Context, req models.ResetPasswordRequest, id int64) (*models.User, error) {

	hashed, err := hashPassword(*req.Password)
	if err != nil {
		return nil, errors.New(err.Error())
	}

	req.Password = &hashed

	updatedpassword, err := api.postgres.ResetpasswordDB(id, req)
	if err != nil {
		return nil, err
	}

	return updatedpassword, nil

}
