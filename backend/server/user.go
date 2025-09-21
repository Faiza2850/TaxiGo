package server

import (
	"net/http"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) GetUserById(c *gin.Context){

	userId, _ := c.Get("Id")
    userIDUint, ok := userId.(uint)
	if !ok { 
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "invalid user ID type"})
        return 
    }
    userID := int64(userIDUint)

	user, err := s.api.GetUserByIdAPI(c, userID )
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Server is unable to get from api"})
		return
	}
	c.JSON(http.StatusOK, models.Response{
		Message: "User retrieved successfully",
		Status:  http.StatusOK,
		Data:    user,
	})

	
}

func (s *Server)EditProfile(c *gin.Context){

	var EditUserCredentials *models.UpdateUserRequest
	if err := c.BindJSON(&EditUserCredentials); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}
	if EditUserCredentials.FirstName == nil || EditUserCredentials.LastName == nil || EditUserCredentials.Email == nil || EditUserCredentials.PhoneNumber == nil || EditUserCredentials.Address == nil || EditUserCredentials.City == nil  || EditUserCredentials.Country == nil  || EditUserCredentials.PostCode == nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "All fields must be provided"})
		return
	}


	userId, _ := c.Get("Id")
    userIDUint, ok := userId.(uint)
	if !ok { 
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "invalid user ID type"})
        return 
    }
    userID := int64(userIDUint)
	err := s.api.EditProfileAPI(c, EditUserCredentials, userID )
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Server is unable to update api"})
		return
	}
	c.JSON(http.StatusOK, models.Response{
		Message: "User Updated successfully",
		Status:  http.StatusOK,
	})

}