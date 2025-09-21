package api

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/customer"
	"github.com/stripe/stripe-go/paymentmethod"
	"github.com/stripe/stripe-go/token"
)

func (api *AiportTaxiAPIImpl) SavedCardAPI(c *gin.Context, Request models.TokenRequest) (*models.StripeAddCardResponse, error) {

	myStripeKey := config.Cfg.STRIPE_KEY
	stripe.Key = myStripeKey

	stripeToken, err := token.Get(Request.Token, nil)
	if err != nil {
		return nil, err
	}

	if stripeToken.Card == nil {
		return nil, errors.New("no card information returned from Stripe")
	}

	existingCustomerID, err := api.postgres.GetCustomerByUserID(int(Request.UserID))
	if err != nil {
		return nil, err
	}

	var stripeCustomerID string

	if existingCustomerID != "" {
		stripeCustomerID = existingCustomerID
	} else {
		customerParams := &stripe.CustomerParams{
			Description: stripe.String("Customer for " + *Request.FirstName + " " + *Request.LastName),
		}
		stripeCustomer, err := customer.New(customerParams)
		if err != nil {
			return nil, err
		}
		stripeCustomerID = stripeCustomer.ID

	}

	paymentMethodParams := &stripe.PaymentMethodParams{
		Type: stripe.String("card"),
		Card: &stripe.PaymentMethodCardParams{
			Token: stripe.String(stripeToken.ID),
		},
	}
	paymentMethod, err := paymentmethod.New(paymentMethodParams)
	if err != nil {
		return nil, err
	}

	attachParams := &stripe.PaymentMethodAttachParams{
		Customer: stripe.String(stripeCustomerID),
	}
	_, err = paymentmethod.Attach(paymentMethod.ID, attachParams)
	if err != nil {
		return nil, err
	}

	cardDetails := models.StripeAddCardResponse{
		UserID:         Request.UserID,
		StripeToken:    paymentMethod.ID,
		Last4:          paymentMethod.Card.Last4,
		ExpMonth:       strconv.Itoa(int(paymentMethod.Card.ExpMonth)),
		ExpYear:        strconv.Itoa(int(paymentMethod.Card.ExpYear)),
		CardholderName: stripeToken.Card.Name,
		CardBrand:      string(paymentMethod.Card.Brand),
		FirstName:      *Request.FirstName,
		LastName:       *Request.LastName,
		CustomerId:     stripeCustomerID,
	}
	fmt.Println(stripeToken.Card.Name, "card_holder_name")

	savedCard, err := api.postgres.SavedCardDb(cardDetails)
	if err != nil {
		return nil, err
	}

	return savedCard, nil
}
