package postgres

import (
	"crypto/rand"
	"database/sql"
	"encoding/base64"

	"errors"
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"
	"golang.org/x/crypto/bcrypt"
)

func (db *AiportTaxiDBImpl) CreateBookingDb(booking models.AddBookingRequest, role string, userId *uint) (*models.Booking, *string, error) {
	var localUserId uint
	var randomPassword *string

	if role == "guest" && userId == nil {
		query := `SELECT id FROM users WHERE email = $1 AND role = $2`
		err := db.dbConn.QueryRow(query, booking.Email, "guest").Scan(&localUserId)
		if err != nil {
			if err == sql.ErrNoRows {
				generatedPassword, err := generateRandomPassword()
				if err != nil {
					return nil, nil, err
				}
				hashed, err := hashPassword(generatedPassword)
				if err != nil {
					return nil, nil, errors.New(err.Error())
				}
				query = `INSERT INTO users (firstname, lastname, email, phone_number, password, role) 
                         VALUES ($1, $2, $3, $4, $5, 'guest') RETURNING id`
				err = db.dbConn.QueryRow(query, booking.FirstName, booking.LastName, booking.Email, booking.PhoneNumber, hashed).Scan(&localUserId)
				if err != nil {
					return nil, nil, err
				}
				randomPassword = &generatedPassword

			} else {
				return nil, nil, err
			}
		}
		
		for _, quoteID := range booking.QuoteIDs {
			updateQuery := `UPDATE locations SET user_id = $1 WHERE id = $2`
			_, err = db.dbConn.Exec(updateQuery, localUserId, quoteID)
			if err != nil {
				return nil, nil, err
			}
		}
	} else if (role == "customer") || (userId != nil && role == "guest") {
		localUserId = *userId
	}

	err := db.storebookingDetails(booking, &localUserId)
	if err != nil {
		return nil, nil, err
	}

	var createdBooking models.Booking
	query := `SELECT b.id, b.user_id, b.car_id, b.location_id, 
                 u.firstname, u.lastname, u.email, u.phone_number, 
                 b.total_price, b.number_of_passengers, b.number_of_suitcases, b.flight_number, 
                 b.flight_arriving_from, b.flight_date_time, b.meet_and_greet, b.has_pet, 
                 b.booking_status, b.created_at, b.standard_fare, b.two_way, b.multiple_journey_disc
          FROM bookings b
          JOIN users u ON b.user_id = u.id
          WHERE b.user_id = $1
          ORDER BY b.created_at DESC LIMIT 1`

	err = db.dbConn.QueryRow(query, localUserId).Scan(
		&createdBooking.ID,
		&createdBooking.UserID,
		&createdBooking.CarID,
		&createdBooking.LocationID,
		&createdBooking.FirstName,
		&createdBooking.LastName,
		&createdBooking.Email,
		&createdBooking.PhoneNumber,
		&createdBooking.TotalPrice,
		&createdBooking.NumberOfPassengers,
		&createdBooking.NumberOfSuitcases,
		&createdBooking.FlightNumber,
		&createdBooking.FlightArrivingFrom,
		&createdBooking.FlightDateTime,
		&createdBooking.MeetAndGreet,
		&createdBooking.HasPet,
		&createdBooking.BookingStatus,
		&createdBooking.CreatedAt,
		&createdBooking.StandardFare,
		&createdBooking.TwoWay,
		&createdBooking.MultipleJourneyDisc,
	)

	if err != nil {
		return nil, nil, err
	}

	return &createdBooking, randomPassword, nil
}

func (db *AiportTaxiDBImpl) storebookingDetails(booking models.AddBookingRequest, userId *uint) error {
	// 	 query to calculate the standard fare
	standardFareQuery := `
SELECT 
	(c.mileage_price * l.total_distance) AS standard_fare
FROM 
	cars c
JOIN 
	locations l ON l.id = $1
WHERE 
	c.id = $2;
`

	// Variable to store the result
	var standardFare float64

	// Execute the query and scan the result into the standardFare variable
	err := db.dbConn.QueryRow(standardFareQuery, booking.LocationID, booking.CarID).Scan(&standardFare)
	if err != nil {
		return fmt.Errorf("error calculating standard fare: %v", err)
	}

	// Now calculate total price using standardFare
	var totalPrice float64

	fmt.Println(booking.MultipleJourneyDisc)
	multipleJournyDisc := 15

	if *booking.TwoWay {
		if *booking.MeetAndGreet {
			totalPrice = standardFare + 5 - float64(multipleJournyDisc)
		} else {
			totalPrice = standardFare - float64(multipleJournyDisc)
		}
	} else {
		if *booking.MeetAndGreet {
			totalPrice = standardFare + 5
		} else {
			totalPrice = standardFare
		}
	}
	// Now you have the totalPrice calculated based on the standardFare
	bookingquery := `INSERT INTO bookings (user_id, car_id, location_id, total_price, standard_fare,
                      number_of_passengers, number_of_suitcases, flight_number, 
                      flight_arriving_from, flight_date_time, meet_and_greet, 
                      has_pet, two_way, multiple_journey_disc)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
`
	_, err = db.dbConn.Exec(bookingquery, userId, booking.CarID, booking.LocationID, totalPrice, standardFare,
		booking.NumberOfPassengers, booking.NumberOfSuitcases, booking.FlightNumber,
		booking.FlightArrivingFrom, booking.FlightDateTime, booking.MeetAndGreet, booking.HasPet, booking.TwoWay, multipleJournyDisc)

	if err != nil {
		return err

	}
	return nil
}

func generateRandomPassword() (string, error) {
	length := 8
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(bytes)[:length], nil
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return "", fmt.Errorf("error in Hashing password")
	}
	return string(bytes), nil

}
