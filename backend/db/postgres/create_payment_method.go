package postgres

import (
	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) CreatePaymentMehthodDb(request models.PaymentResponse) (*models.PaymentResponse, error) {

	guestCard := &models.PaymentResponse{}

	tx, err := db.dbConn.Begin()
	if err != nil {
		return nil, err
	}

	query := `
 		INSERT INTO payments (user_id, amount,currency,payment_type,payment_status,payment_intent_id,created_at)
		VALUES ($1, $2, $3, $4, $5, $6, NOW())
		RETURNING user_id, amount,currency, payment_type, payment_status, payment_intent_id
	`

	if err := tx.QueryRow(query, request.UserID, request.Amount, request.Currency, request.PaymentType, request.PaymentStatus, request.PaymentIntentID).Scan(
		&guestCard.UserID, &guestCard.Amount, &guestCard.Currency, &guestCard.PaymentType, &guestCard.PaymentStatus, &guestCard.PaymentIntentID,
	); err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return guestCard, nil

}
