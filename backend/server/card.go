package server

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/CapregSoft/project-airport-taxi/api"
	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) DeleteCard(c *gin.Context) {

	request := &models.DeleteCardRequest{}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if err := api.ValidateRequest(c, request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	err := s.api.DeleteCardAPI(c, *request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Card Deleted Successfully",
		Status:  http.StatusOK,
		Data:    nil,
	})

}

func (s *Server) GetAllCards(c *gin.Context) {

	request := &models.GetAllCardsRequest{}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if err := api.ValidateRequest(c, request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	cards, err := s.api.GetAllCardsAPI(c, *request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Card fetched successfully",
		Status:  http.StatusOK,
		Data:    cards,
	})

}

func (s *Server) GetStripeToken(c *gin.Context) {
	request := &models.StripeCardRequest{}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if err := api.ValidateRequest(c, request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	url := "https://api.stripe.com/v1/tokens"
	method := "POST"

	payload := strings.NewReader(fmt.Sprintf("card[number]=%s&card[exp_month]=%s&card[exp_year]=%s&card[cvc]=%s",
		request.CardNumber, request.ExpMonth, request.ExpYear, request.CVC))
	// payload := strings.NewReader("card%5Bnumber%5D=4000005910000000&card%5Bexp_month%5D=11&card%5Bexp_year%5D=2025&card%5Bcvc%5D=456")

	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Authorization", "Basic "+config.Cfg.STRIPE_TOKEN_KEY)

	res, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to read response body"})
		return
	}

	var response models.StripeResponse
	if err := json.Unmarshal(body, &response); err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	if response.ID == "" {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to fetch Stripe token"})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Stripe token fetched successfully",
		Status:  http.StatusOK,
		Data:    response,
	})
}
