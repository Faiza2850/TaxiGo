package server

import (
	// "AiportTaxi/models"

	"net/http"

	"github.com/CapregSoft/project-airport-taxi/api"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) SignUp(c *gin.Context) {

	var SignUpCredentials models.SignUpRequest

	if err := c.BindJSON(&SignUpCredentials); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if err := api.ValidateRequest(c, SignUpCredentials); err != nil {
		return
	}

	exists, err := s.api.SignUpUser(c, SignUpCredentials)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}else{
	
	if exists {
		c.JSON(http.StatusConflict, models.Response{
			Data:    exists,
			Message: "User already exists",
			Status:  http.StatusConflict,
		})
	} else {
		c.JSON(http.StatusOK, models.Response{
			Message: "User signed up successfully",
			Status:  http.StatusOK,
		})

		err = welcomeNotification(*SignUpCredentials.FirstName, *SignUpCredentials.Email)
		// fmt.Println(err)
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to send welcome email."})
			return
		}
	}
	}
}
