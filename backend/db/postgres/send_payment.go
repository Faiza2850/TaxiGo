package postgres

import "github.com/CapregSoft/project-airport-taxi/models"

func (db *AiportTaxiDBImpl) GetCardByID(cardID int64) (*models.StripeAddCardResponse, error) {

	card := &models.StripeAddCardResponse{}

	tx, err := db.dbConn.Begin()
	if err != nil {
		return nil, err
	}

	query := `SELECT user_id, stripe_token,customer_id, last4, exp_month, exp_year, cardholder_name, card_brand, first_name, last_name, created_at FROM cards WHERE card_id = $1`
	if err := tx.QueryRow(query, cardID).Scan(
		&card.UserID, &card.StripeToken, &card.CustomerId, &card.Last4, &card.ExpMonth,
		&card.ExpYear, &card.CardholderName, &card.CardBrand,
		&card.FirstName, &card.LastName, &card.CreatedAt,
	); err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return card, nil
}

func (db *AiportTaxiDBImpl) SavePaymentRecord(payment models.PaymentResponse) (*models.PaymentResponse, error) {

	savedPayment := &models.PaymentResponse{}

	tx, err := db.dbConn.Begin()
	if err != nil {
		return nil, err
	}

	query := `
		INSERT INTO payments (user_id, card_id, amount, currency, payment_type, payment_status, payment_intent_id, charge_id, booking_id, created_at, receipt_url)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10) 
		RETURNING id, user_id, card_id, amount, currency, payment_type, payment_status, payment_intent_id, charge_id, booking_id, created_at, receipt_url
	`
	err = tx.QueryRow(query,
		payment.UserID, payment.CardID, payment.Amount, payment.Currency,
		payment.PaymentType, payment.PaymentStatus,
		payment.PaymentIntentID, payment.ChargeID, payment.BookingID, payment.ReceiptURL,
	).Scan(&savedPayment.ID, &savedPayment.UserID, &savedPayment.CardID,
		&savedPayment.Amount, &savedPayment.Currency, &savedPayment.PaymentType,
		&savedPayment.PaymentStatus, &savedPayment.PaymentIntentID, &savedPayment.ChargeID, &savedPayment.BookingID, &savedPayment.ReceiptURL,
		&savedPayment.CreatedAt)

		if err == nil {
			if updateErr := db.UpdateBookingStatus(payment.BookingID, "confirmed"); updateErr != nil {
				tx.Rollback()
				return nil, updateErr
			}
		}
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return savedPayment, nil
}

func (db *AiportTaxiDBImpl) GetbookingByID(bookingID int64) (*models.BookingResponse, error) {

	booking := &models.BookingResponse{}

	tx, err := db.dbConn.Begin()
	if err != nil {
		return nil, err
	}

	query := `
	SELECT id, total_price FROM bookings WHERE id = $1
	`

	err = tx.QueryRow(query, bookingID).Scan(&booking.ID, &booking.TotalFare)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return booking, err

}

func (db *AiportTaxiDBImpl) UpdateBookingStatus(bookingID int64, status string) error {

	query := `UPDATE bookings SET booking_status = $1 WHERE id = $2`
	_, err := db.dbConn.Exec(query, status, bookingID)
	return err

}
