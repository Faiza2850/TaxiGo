package postgres

import (
	// "AiportTaxi/models"
	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) LoginUserDb(loginCredentials models.LoginRequest) ([]*models.User, error) {

	var users []*models.User

	tx, err := db.dbConn.Begin()
	if err != nil {
		return nil, err
	}
	query := `SELECT id, firstname, lastname, email, password, role 
	FROM users 
	WHERE email = $1 
	AND (role = 'customer' OR role = 'guest') `
	rows, err := tx.Query(query, loginCredentials.Email)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		user := &models.User{}
		if err := rows.Scan(
			&user.UserID,
			&user.FirstName,
			&user.LastName,
			&user.Email,
			&user.Password,
			&user.Role,
		); err != nil {
			tx.Rollback()
			return nil, err
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return users, nil
}