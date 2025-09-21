package api

import (
	"time"

	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/paymentintent"
)

func (api *AiportTaxiAPIImpl) CreatePaymentMehthodAPI(c *gin.Context, request models.CreateClientSecretReq) (*models.CreateClientSecretResp, error) {

	myStripeKey := config.Cfg.STRIPE_KEY
	stripe.Key = myStripeKey

	currency := "eur"

	amountInCents := int64(*request.Amount * 100)

	paymentIntentParams := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(amountInCents)),
		Currency: stripe.String(currency),
	}
	PaymentIntent, err := paymentintent.New(paymentIntentParams)
	if err != nil {
		return nil, err
	}

	resp := &models.PaymentResponse{
		UserID:          *request.UserID,
		Amount:          *request.Amount,
		Currency:        "eur",
		PaymentType:     "one-time",
		PaymentStatus:   "pending",
		PaymentIntentID: PaymentIntent.ID,
		CreatedAt:       time.Now().Format(time.RFC3339),
	}

	_, err = api.postgres.CreatePaymentMehthodDb(*resp)
	if err != nil {
		return nil, err
	}

	clientSecretResp := &models.CreateClientSecretResp{
		ClientSecret: PaymentIntent.ClientSecret,
	}

	return clientSecretResp, nil
}
