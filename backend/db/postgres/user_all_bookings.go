package postgres

import (
	"fmt"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) UserAllBookingDb(userID int64, bookingID int64) ([]models.BookingResponse, error) {

	// Updated query to fetch all bookings for the user
	
	query := `SELECT 
	b.location_id,
	c.car_category,
	c.image,
    b.flight_arriving_from, 
    b.flight_date_time, 
    b.flight_number, 
    b.number_of_passengers, 
    b.number_of_suitcases, 
    b.meet_and_greet,
	b.multiple_journey_disc,
	b.two_way,
    b.standard_fare,
	b.total_price
	
FROM 
    bookings b
JOIN 
    cars c ON b.car_id = c.id
WHERE 
	b.user_id = $1
    AND b.id=$2
	`

	rows, err := db.dbConn.Query(query, userID, bookingID) // Use Query instead of QueryRow
	if err != nil {
		return nil, fmt.Errorf("query failed: %w", err)
	}
	defer rows.Close() // Ensure rows are closed after processing

	var bookings []models.BookingResponse // Change to slice of pointers
	for rows.Next() {
		var booking models.BookingResponse
		if err := rows.Scan(&booking.LocationID,
			&booking.Fleet,
			&booking.Image,
			&booking.FlightArrivingFrom,
			&booking.FlightDateTime,
			&booking.FlightNumber,
			&booking.NumberOfPassengers,
			&booking.NumberOfSuitcases,
			&booking.MeetAndGreet,
			&booking.MultipleJourneyDisc,
			&booking.TwoWay,
			&booking.StandardFare,
			&booking.TotalFare); err != nil {
			return nil, err
		}
		bookings = append(bookings, booking)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error occurred during rows iteration: %w", err)
	}
	return bookings, nil
}
