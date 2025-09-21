package postgres

import (
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) GetQuoteDB(UserId *uint) (data []models.QuoteResponse, err error) {
	query := `SELECT id, user_id
FROM locations
WHERE user_id = $1;`

	rows, err := db.dbConn.Query(query, UserId)
	if err != nil {
		return nil, fmt.Errorf("query failed: %w", err)
	}
	defer rows.Close()

	var quotes []models.QuoteResponse
	for rows.Next() {
		var quote models.QuoteResponse
		if err := rows.Scan(&quote.LocationID, &quote.UserID); err != nil {
			return nil, err
		}
		quotes = append(quotes, quote)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error occurred during rows iteration: %w", err)
	}

	return quotes, nil
}