package postgres

import (
	"database/sql"
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) ContactUsDb(fb *models.FeedbackRequest, role string, userId *uint) error {

	if role == "guest" {

		var existingUserId uint
		queryCheck := `SELECT id FROM users WHERE email = $1 AND role = $2`
		err := db.dbConn.QueryRow(queryCheck, fb.Email, role).Scan(&existingUserId)

		if err != nil {
			if err == sql.ErrNoRows {

				queryInsert := `INSERT INTO users (firstname, lastname, email, phone_number, role) 
				 VALUES ($1, $2, $3, $4, $5) RETURNING id`
				err := db.dbConn.QueryRow(queryInsert, fb.FirstName, fb.LastName, fb.Email, fb.PhoneNumber, role).Scan(&existingUserId)
				if err != nil {
					return fmt.Errorf("failed to insert guest user: %w", err)
				}
			} else {
				return fmt.Errorf("failed to check for existing guest user: %w", err)
			}
		}

		feedbackQuery := `INSERT INTO feedback (user_id, description, created_at) 
				 VALUES ($1, $2, $3)`
		_, err = db.dbConn.Exec(feedbackQuery, existingUserId, fb.Description, fb.CreatedAt)
		if err != nil {
			return fmt.Errorf("failed to insert feedback for guest user: %w", err)
		}

	} else if role == "customer" {

		feedbackQuery := `INSERT INTO feedback (user_id, description, created_at) 
        VALUES ($1, $2, $3)`
		_, err := db.dbConn.Exec(feedbackQuery, userId, fb.Description, fb.CreatedAt)
		if err != nil {
			return fmt.Errorf("failed to insert feedback for customer: %w", err)
		}
	} else {
		return fmt.Errorf("invalid role: %s", role)
	}

	return nil
}
