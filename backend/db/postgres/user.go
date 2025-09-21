package postgres

import (
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) GetUserByIdDB(userid int64) (*models.UserResponse, error) {
	var userdata models.UserResponse
query := `SELECT id, firstname, lastname, email, role, phone_number, address, city, country, postcode FROM public.users WHERE id=$1`
 err := db.dbConn.QueryRow(query, userid).Scan(&userdata.UserID,
	&userdata.FirstName, &userdata.LastName, &userdata.Email, &userdata.Role, &userdata.PhoneNumber,
	&userdata.Address, &userdata.City, &userdata.Country, &userdata.PostCode,
)
if err != nil {
	return nil, fmt.Errorf("failed to get user by ID: %w", err)
}
return &userdata, nil
}

func (db *AiportTaxiDBImpl)EditProfileDB( updateUser *models.UpdateUserRequest, userid int64)(error){
	query := `UPDATE users SET  firstname=$1, lastname=$2, email=$3, phone_number=$4, address=$5, city=$6, country=$7, postcode=$8 WHERE id = $9`
    _, err := db.dbConn.Exec(query, updateUser.FirstName, updateUser.LastName, updateUser.Email, updateUser.PhoneNumber, updateUser.Address, updateUser.City, updateUser.Country, updateUser.PostCode, userid)
    if err != nil {
        return err
    }

	return nil
}