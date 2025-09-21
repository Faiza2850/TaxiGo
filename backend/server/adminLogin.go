package server

import (
	// "AiportTaxi/models"
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) AdminLogin(c *gin.Context) {

	var AdminloginCredentials models.LoginRequest

	if err := c.BindJSON(&AdminloginCredentials); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}
	if AdminloginCredentials.Email == nil || AdminloginCredentials.Password == nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "All fields must be provided"})
		return
	}

	token, err := s.api.LoginAdmin(c, AdminloginCredentials)
	if err != nil {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.LoginResponse{Token: token})
}
