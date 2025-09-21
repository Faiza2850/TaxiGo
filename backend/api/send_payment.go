package api

import (
	"time"

	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/paymentintent"
)

func (api *AiportTaxiAPIImpl) MakePaymentAPI(c *gin.Context, request *models.PaymentRequest) (*models.PaymentResponse, error) {

	myStripeKey := config.Cfg.STRIPE_KEY
	stripe.Key = myStripeKey

	cardDetails, err := api.postgres.GetCardByID(request.CardID)
	if err != nil {
		return nil, err
	}
	booking, err := api.postgres.GetbookingByID(request.BookingID)
	if err != nil {
		return nil, err
	}

	customerID := cardDetails.CustomerId

	paymentMethodID := cardDetails.StripeToken

	paymentIntentParams := &stripe.PaymentIntentParams{
		Amount:        stripe.Int64(int64(*booking.TotalFare * 100)),
		Currency:      stripe.String("eur"),
		PaymentMethod: stripe.String(paymentMethodID),
		Customer:      stripe.String(customerID),
		Confirm:       stripe.Bool(true),
	}

	paymentIntent, err := paymentintent.New(paymentIntentParams)
	if err != nil {
		return nil, err
	}

	paymentRecord := models.PaymentResponse{
		UserID:          request.UserID,
		CardID:          request.CardID,
		Amount:          *booking.TotalFare,
		BookingID:       request.BookingID,
		Currency:        "eur",
		PaymentType:     "one-time",
		PaymentStatus:   string(paymentIntent.Status),
		PaymentIntentID: paymentIntent.ID,
		ChargeID:        paymentIntent.Charges.Data[0].ID,
		ReceiptURL:      paymentIntent.Charges.Data[0].ReceiptURL,
		CreatedAt:       time.Now().Format(time.RFC3339),
	}

	savePayment, err := api.postgres.SavePaymentRecord(paymentRecord)
	if err != nil {
		return nil, err
	}

	if savePayment.PaymentStatus == "succeeded" {

		if savePayment.Amount == *booking.TotalFare {
			err = api.postgres.UpdateBookingStatus(int64(*booking.ID), "confirmed")
			if err != nil {
				return nil, err
			}
		}
	}

	return savePayment, nil
}
