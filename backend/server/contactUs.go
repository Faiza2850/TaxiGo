package server

import (
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/config"
	middlewares "github.com/CapregSoft/project-airport-taxi/middleware"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) ContactUs(c *gin.Context) {

	var fb *models.FeedbackRequest

	if err := c.BindJSON(&fb); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	token := c.GetHeader("Authorization")
	var UserID *uint
	role := "customer"

	if token == "" {
		role = "guest"
		UserID = nil

	} else {
		claims, err := middlewares.DecodeToken(token, config.Cfg.JwtSecret)
		if err != nil {
			c.JSON(http.StatusUnauthorized, models.ErrorResponse{Error: "Invalid token"})
			return
		}
		UserID = &claims.Id
	}

	err := s.api.ContactUsAPI(c, fb, role, UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	err = SendFeedbackNotification(*fb.Description, *fb.Email, *fb.FirstName )

	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to send contactus notification."})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Feedback Submited successfully",
	})

}
