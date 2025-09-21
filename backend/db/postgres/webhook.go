package postgres

import "github.com/CapregSoft/project-airport-taxi/models"

func (db *AiportTaxiDBImpl) UpdatePaymentStatus(payment models.PaymentResponse) error {

	tx, err := db.dbConn.Begin()
	if err != nil {
		return err
	}

	query := `
		UPDATE payments 
		SET payment_status = $1
		WHERE payment_intent_id = $4
	`

	_, err = tx.Exec(query, payment.PaymentStatus, payment.PaymentIntentID)
	if err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Commit(); err != nil {
		return err
	}

	return nil
}
