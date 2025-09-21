package postgres

import "github.com/CapregSoft/project-airport-taxi/models"

func (db *AiportTaxiDBImpl) ForgotPasswordDb(email models.ForgotPasswordRequest) (*models.User, error) {

	user := &models.User{}

	tx, err := db.dbConn.Begin()
	if err != nil {
		return nil, err
	}

	query := `
		SELECT id, email, role FROM users WHERE email = $1 
	`
	if err := tx.QueryRow(query, email.Email).Scan(
		&user.UserID,
		&user.Email,
		&user.Role,
	); err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return user, nil

}
