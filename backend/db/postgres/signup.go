package postgres

import "github.com/CapregSoft/project-airport-taxi/models"

func (db *AiportTaxiDBImpl) SignUpUserDb(signupcredentials models.SignUpRequest) (bool, error) {

	var exists bool

	checkQuery := `SELECT EXISTS(SELECT 1 FROM users WHERE email = $1 AND role = 'customer' )`
	err := db.dbConn.QueryRow(checkQuery, signupcredentials.Email).Scan(&exists)
	if err != nil {
		return false, err
	}

	if exists {
		return true, nil
	}

	query := `INSERT INTO users(firstname, lastname, phone_number, email,password, city, country, address, postcode ) VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9)`

	_, err = db.dbConn.Exec(query, signupcredentials.FirstName, signupcredentials.LastName, signupcredentials.PhoneNumber, signupcredentials.Email, signupcredentials.Password, signupcredentials.City, signupcredentials.Country, signupcredentials.Address, signupcredentials.PostCode)
	if err != nil {
		return false, err
	}

	return false, nil
}
