package postgres

import (
	// "AiportTaxi/models"
	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) LoginAdminDb(AdminloginCredentials models.LoginRequest) (*models.User, error) {

	user := &models.User{}

	tx, err := db.dbConn.Begin()
	if err != nil {
		return nil, err
	}
	query := `SELECT id, firstname, lastname, email, password, role 
	FROM users 
	WHERE email = $1 
	AND role ='admin'`
	if err := tx.QueryRow(query, AdminloginCredentials.Email).Scan(
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

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return user, nil
}
