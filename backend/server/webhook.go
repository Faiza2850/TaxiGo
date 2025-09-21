package server

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/webhook"
)

func (s *Server) StripeWebhook(c *gin.Context) {

	const MaxBodyBytes = int64(65536)
	c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, MaxBodyBytes)

	payload, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Failed to read request body"})
		return
	}

	signature := c.GetHeader("stripe-signature")

	event, err := webhook.ConstructEvent(payload, signature, config.Cfg.STRIPE_WEBHOOK_SECRET)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: fmt.Sprintf("Failed to verify signature: %v", err)})
		return
	}

	switch event.Type {

	case "payment_intent.succeeded":

		var paymentIntent *stripe.PaymentIntent

		err := json.Unmarshal(event.Data.Raw, &paymentIntent)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Failed to parse webhook event"})
			return
		}

		err = s.api.UpdatePaymentAfterSuccess(*paymentIntent)
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
			return
		}

		c.JSON(http.StatusOK, models.Response{Message: "Payment succeeded and updated", Status: http.StatusOK})

	case "payment_intent.canceled":

		var paymentIntent stripe.PaymentIntent

		err := json.Unmarshal(event.Data.Raw, &paymentIntent)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Failed to parse webhook event"})
			return
		}

		err = s.api.UpdatePaymentAfterCancellation(paymentIntent)
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
			return
		}

		c.JSON(http.StatusOK, models.Response{Message: "Payment canceled and updated", Status: http.StatusOK})

	case "payment_intent.payment_failed":

		var paymentIntent stripe.PaymentIntent

		err := json.Unmarshal(event.Data.Raw, &paymentIntent)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Failed to parse webhook event"})
			return
		}

		err = s.api.UpdatePaymentAfterFailure(paymentIntent)
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
			return
		}

		c.JSON(http.StatusOK, models.Response{Message: "Payment failed and updated", Status: http.StatusOK})

	default:
		c.JSON(http.StatusOK, models.Response{Message: "Unhandled event type", Status: http.StatusOK})
	}
}
