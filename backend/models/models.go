package models

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/jackc/pgtype"
)

type ErrorResponse struct {
	Error string `json:"error"`
}

type Response struct {
	Message string      `json:"message"`
	Status  int         `json:"status"`
	Data    interface{} `json:"data"`
	GuestToken string      `json:"guest_token,omitempty"`
}
type ResponseWithoutData struct {
	Message string `json:"message"`
	Status  int    `json:"status"`
}

type JwtUser struct {
	UserID *int64  `json:"id"`
	Email  *string `json:"email"`
	Name   *string `json:"name"`
	Role   *string `json:"role"`
}

type User struct {
	UserID      *int64   `json:"id" db:"id"`
	FirstName   *string  `json:"firstname" db:"firstname"`
	LastName    *string  `json:"lastname" db:"lastname"`
	Email       *string  `json:"email" db:"email"`
	Password    *string  `json:"password" db:"password"`
	Role        *string  `json:"role" db:"role"`
	PhoneNumber *string  `json:"phone_number" db:"phone_number"`
	Address     *string  `json:"address" db:"address"`
	City        *string  `json:"city" db:"city"`
	Country     *string  `json:"country" db:"country"`
	PostCode    *float64 `json:"postcode" db:"postcode"`
}

type UserClaims struct {
	Id        uint    `json:"id"`
	Email     *string `json:"email"`
	FirstName *string `json:"firstname"`
	LastName  *string `json:"lastname"`
	Role      *string `json:"role"`
	jwt.StandardClaims
}

type CustomClaims struct {
	Id        uint    `json:"id"`
	Email     *string `json:"email"`
	FirstName *string `json:"firstname"`
	LastName  *string `json:"lastname"`
	Role      *string `json:"role"`
	jwt.StandardClaims
}

type Admin struct {
	Id       uint    `json:"id" db:"id"`
	Email    *string `json:"email" db:"email"`
	Password string  `json:"password" db:"password"`
	Is_admin *bool   `json:"is_admin" db:"is_admin"`
}

type Car struct {
	Id           *int64     `json:"id" db:"id"`
	MileagePrice *float64   `json:"mileage_price" db:"mileage_price"`
	Available    *bool      `json:"available" db:"available"`
	CarCategory  *string    `json:"car_category" db:"car_category"`
	Image        *string    `json:"image" db:"image"`
	MetaData     *string    `json:"metadata" db:"metadata"`
	CreatedAt    *time.Time `json:"created_at" db:"created_at"`
}

type Booking struct {
	ID                  *int64     `json:"id" db:"id"`
	UserID              *int64     `json:"user_id" db:"user_id"`
	CarID               *int64     `json:"car_id" db:"car_id"`
	LocationID          *int64     `json:"location_id" db:"location_id"`
	FirstName           *string    `json:"firstname" db:"firstname"`
	LastName            *string    `json:"lastname" db:"lastname"`
	PhoneNumber         *string    `json:"phone_number" db:"phone_number"`
	Email               *string    `json:"email" db:"email"`
	TotalPrice          *float64   `json:"total_price" db:"total_price"`
	NumberOfPassengers  *int64     `json:"number_of_passengers" db:"number_of_passengers"`
	NumberOfSuitcases   *int64     `json:"number_of_suitcases" db:"number_of_suitcases"`
	FlightNumber        *string    `json:"flight_number" db:"flight_number"`
	FlightArrivingFrom  *string    `json:"flight_arriving_from" db:"flight_arriving_from"`
	FlightDateTime      *time.Time `json:"flight_date_time" db:"flight_date_time"`
	MeetAndGreet        *bool      `json:"meet_and_greet" db:"meet_and_greet"`
	HasPet              *bool      `json:"has_pet" db:"has_pet"`
	BookingStatus       *string    `json:"booking_status" db:"booking_status"`
	CreatedAt           *time.Time `json:"created_at" db:"created_at"`
	StandardFare        *float64   `json:"standard_fare" db:"standard_fare"`
	TwoWay              *bool      `json:"two_way" db:"two_way"`
	MultipleJourneyDisc *float64   `json:"multiple_journey_disc" db:"multiple_journey_disc"`
}

type Location struct {
	ID            *int           `json:"id" db:"id"`
	UserID        *int64         `json:"user_id" db:"user_id"`
	LocationName  *string        `json:"location_name" db:"location_name"`
	StartPoint    *pgtype.Point  `json:"start_point" db:"start_point"`
	EndPoint      *pgtype.Point  `json:"end_point" db:"end_point"`
	Waypoints     []pgtype.Point `json:"waypoints" db:"waypoints"`
	TotalDistance *float64       `json:"total_distance" db:"total_distance"`
	CreatedAt     *time.Time     `json:"created_at" db:"created_at"`
	City          *string        `json:"city" db:"city"`
	Country       *string        `json:"country" db:"country"`
}

type Payment struct {
	ID              *int64     `json:"id" db:"id"`
	UserID          *int64     `json:"user_id" db:"user_id"`
	Amount          *float64   `json:"amount" db:"amount"`
	Currency        *string    `json:"currency" db:"currency"`
	PaymentType     *string    `json:"payment_type" db:"payment_type"`
	PaymentStatus   *string    `json:"payment_status" db:"payment_status"`
	PaymentIntentID *string    `json:"payment_intent_id" db:"payment_intent_id"`
	ChargeID        *string    `json:"charge_id" db:"charge_id"`
	CreatedAt       *time.Time `json:"created_at" db:"created_at"`
}

type Coordinates struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

type Viewport struct {
	Northeast Coordinates `json:"northeast"`
	Southwest Coordinates `json:"southwest"`
}

type Geometry struct {
	Location Coordinates `json:"location"`
	Viewport Viewport    `json:"viewport"`
}
type Feedback struct {
	ID          *int64    `json:"id" db:"id"`
	UserID      int64     `json:"user_id" db:"user_id"`
	Description string    `json:"description" db:"description"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}
