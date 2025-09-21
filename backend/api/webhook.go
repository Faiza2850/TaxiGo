package api

import (
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/stripe/stripe-go"
)

func (api *AiportTaxiAPIImpl) UpdatePaymentAfterSuccess(paymentIntent stripe.PaymentIntent) error {
	// fmt.Printf("%+v", paymentIntent.Charges)
	// fmt.Println(paymentIntent.Charges, "2")
	// fmt.Println(paymentIntent.Charges.Data, "3")
	// fmt.Println(paymentIntent.Charges.Data[0], "4")
	// fmt.Println(paymentIntent.Charges.Data[0].ID, "5")

	paymentUpdate := models.PaymentResponse{
		PaymentStatus: "succeeded",
		// ChargeID:        paymentIntent.Charges.Data[0].ID,
		// ReceiptURL:      paymentIntent.Charges.Data[0].ReceiptURL,
		PaymentIntentID: paymentIntent.ID,
	}

	err := api.postgres.UpdatePaymentStatus(paymentUpdate)
	if err != nil {
		return err
	}
	return nil
}

func (api *AiportTaxiAPIImpl) UpdatePaymentAfterCancellation(paymentIntent stripe.PaymentIntent) error {
	paymentUpdate := models.PaymentResponse{
		PaymentStatus:   "canceled",
		PaymentIntentID: paymentIntent.ID,
	}

	err := api.postgres.UpdatePaymentStatus(paymentUpdate)
	if err != nil {
		return err
	}
	return nil
}

func (api *AiportTaxiAPIImpl) UpdatePaymentAfterFailure(paymentIntent stripe.PaymentIntent) error {
	paymentUpdate := models.PaymentResponse{
		PaymentStatus:   "failed",
		PaymentIntentID: paymentIntent.ID,
	}

	err := api.postgres.UpdatePaymentStatus(paymentUpdate)
	if err != nil {
		return err
	}
	return nil

}
