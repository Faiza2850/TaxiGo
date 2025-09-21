package server

import (
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/api"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) SavedCard(c *gin.Context) {

	request := &models.TokenRequest{}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if err := api.ValidateRequest(c, request); err != nil {
		return
	}

	savedCard, err := s.api.SavedCardAPI(c, *request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Data:    savedCard,
		Message: "Card saved successfully",
		Status:  http.StatusOK,
	})

}

func (s *Server) ProcessPayment(c *gin.Context) {

	request := &models.PaymentRequest{}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if err := api.ValidateRequest(c, request); err != nil {
		return
	}

	paymentIntentID, err := s.api.MakePaymentAPI(c, request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Data:    paymentIntentID,
		Message: "Payment processed successfully",
		Status:  http.StatusOK,
	})

}

func (s *Server) CreatePaymentMethod(c *gin.Context) {

	request := &models.CreateClientSecretReq{}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if err := api.ValidateRequest(c, request); err != nil {
		return
	}

	resp, err := s.api.CreatePaymentMehthodAPI(c, *request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Client secret's created successfully",
		Status:  http.StatusOK,
		Data:    resp,
	})

}
