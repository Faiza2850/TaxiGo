package postgres

import (
	"database/sql"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) GetCustomerByUserID(userID int) (string, error) {
	var customerID string

	query := `
		SELECT customer_id 
		FROM cards 
		WHERE user_id = $1
		LIMIT 1
	`
	err := db.dbConn.QueryRow(query, userID).Scan(&customerID)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", nil
		}
		return "", err
	}

	return customerID, nil
}

func (db *AiportTaxiDBImpl) SavedCardDb(cardCredentials models.StripeAddCardResponse) (*models.StripeAddCardResponse, error) {

	card := &models.StripeAddCardResponse{}

	tx, err := db.dbConn.Begin()
	if err != nil {
		return nil, err
	}

	query := `
 		INSERT INTO cards (user_id, stripe_token,customer_id, last4, exp_month, exp_year, cardholder_name, card_brand, first_name, last_name, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
		RETURNING card_id,user_id, stripe_token,customer_id, last4, exp_month, exp_year, cardholder_name, card_brand, first_name, last_name
	`

	if err := tx.QueryRow(query, cardCredentials.UserID, cardCredentials.StripeToken, &cardCredentials.CustomerId, cardCredentials.Last4, cardCredentials.ExpMonth, cardCredentials.ExpYear, cardCredentials.CardholderName, cardCredentials.CardBrand, cardCredentials.FirstName, cardCredentials.LastName).Scan(
		&card.CardID, &card.UserID, &card.StripeToken, &card.CustomerId, &card.Last4, &card.ExpMonth, &card.ExpYear, &card.CardholderName, &card.CardBrand, &card.FirstName, &card.LastName,
	); err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return card, nil
}
