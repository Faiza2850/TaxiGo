package postgres

import (
	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) ResetpasswordDB(userId int64, updatedpassword models.ResetPasswordRequest) (*models.User, error) {

	updatedpwd := &models.User{}

	tx, err := db.dbConn.Begin()
	if err != nil {
		return nil, err
	}

	query := `
		UPDATE users 
		SET password = $1
		WHERE id = $2
	`

	if _, err := tx.Exec(query, updatedpassword.Password, userId); err != nil {
		tx.Rollback()
		return nil, err

	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return updatedpwd, nil
}
