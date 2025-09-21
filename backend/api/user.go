package api

import (
	"errors"
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) GetUserByIdAPI(c *gin.Context, userid int64 )(*models.UserResponse, error){
	if userid == 0 {
		
		return nil, errors.New("user ID is required")
	}
	userdata, err := api.postgres.GetUserByIdDB(userid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error retrieving user from DB:": err.Error()})
		return nil, err
	}

	if userdata == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"User Not Found": "User data is nil"})
		return nil, errors.New("user data is nil") // Updated error handling
	}

	return userdata, nil
}

func (api *AiportTaxiAPIImpl) EditProfileAPI(c *gin.Context, updateUser *models.UpdateUserRequest, userid int64)(error){
	if userid == 0 {
		
		return  errors.New("user ID is required")
	}
	err := api.postgres.EditProfileDB(updateUser, userid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error updating user in DB:": err.Error()})
		return  err
	}


	return nil
}