package postgres

import (
	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) GetAllCardDb(request models.GetAllCardsRequest) (*[]models.GetAllCardResp, error) {

	cards := []models.GetAllCardResp{}

	query := `
	SELECT card_id, stripe_token, customer_id, last4, exp_month, exp_year, cardholder_name, card_brand, first_name, last_name
	FROM cards 
	WHERE user_id = $1 AND deleted_at IS NULL
	`

	rows, err := db.dbConn.Query(query, request.UserID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var card models.GetAllCardResp
		if err := rows.Scan(
			&card.CardID, &card.StripeToken, &card.CustomerId, &card.Last4,
			&card.ExpMonth, &card.ExpYear, &card.CardholderName, &card.CardBrand,
			&card.FirstName, &card.LastName,
		); err != nil {
			return nil, err
		}
		cards = append(cards, card)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return &cards, nil

}
