package server

import (
	// "AiportTaxi/models"
	"fmt"
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) Login(c *gin.Context) {

	var loginCredentials models.LoginRequest

	fmt.Println("passowrd-----------", loginCredentials)

	if err := c.BindJSON(&loginCredentials); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}
	if loginCredentials.Email == nil || loginCredentials.Password == nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "All fields must be provided"})
		return
	}

	token, err := s.api.LoginUser(c, loginCredentials)
	if err != nil {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.LoginResponse{Token: token})
}