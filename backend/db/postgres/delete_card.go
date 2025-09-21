package postgres

import (
	"database/sql"
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) CardExistsDb(cardId models.DeleteCardRequest) (bool, error) {
	var exists bool

	query := `
    SELECT EXISTS(SELECT 1 FROM cards WHERE card_id = $1 AND deleted_at IS NULL)
    `
	err := db.dbConn.QueryRow(query, cardId.CardID).Scan(&exists)
	if err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}
		return false, err
	}

	return exists, nil
}

func (db *AiportTaxiDBImpl) DeleteCardDb(card models.DeleteCardRequest) error {

	tx, err := db.dbConn.Begin()
	if err != nil {
		return err
	}

	query := `
	 UPDATE cards SET deleted_at = NOW() WHERE card_id = $1
	`

	_, err = tx.Exec(query, card.CardID)
	if err != nil {
		tx.Rollback()
		fmt.Println("Error executing delete:", err)
		return err
	}

	if err := tx.Commit(); err != nil {
		return err
	}

	return nil
}
