package models

import (
	"time"
)

type LoginResponse struct {
	Token string `json:"token"`
}

type BookingResponse struct {
	ID                  *int64          `json:"id" db:"id"`
	StartPoint          *PointsWithName `json:"start_point" db:"start_point"`
	EndPoint            *PointsWithName `json:"end_point" db:"end_point"`
	Fleet               string          `json:"car_category"`
	Image               string          `json:"image" db:"image"`
	NumberOfPassengers  int             `json:"number_of_passengers"`
	NumberOfSuitcases   int             `json:"number_of_suitcases"`
	FlightNumber        string          `json:"flight_number"`
	FlightArrivingFrom  string          `json:"flight_arriving_from"`
	FlightDateTime      string          `json:"flight_date_time"`
	MeetAndGreet        bool            `json:"meet_and_greet"`
	BookingStatus       string          `json:"booking_status"`
	MultipleJourneyDisc *float64        `json:"multiple_journey_disc"`
	TwoWay              *bool           `json:"two_way" db:"two_way"`
	StandardFare        *float64        `json:"standard_fare"`
	TotalFare           *float64        `json:"total_price"`
	LocationID          int64           `json:"location_id"`
	BookingID           int64           `json:"bid"`
	UserID              int64           `json:"user_id"`
}
type AllBookingsResponse struct {
	ID             *int64   `json:"id" db:"id"`
	FirstName      *string  `json:"firstname" db:"firstname"`
	Email          *string  `json:"email" db:"email"`
	Fleet          string   `json:"car_category"`
	FlightDateTime string   `json:"flight_date_time"`
	BookingStatus  string   `json:"booking_status"`
	TwoWay         *bool    `json:"two_way" db:"two_way"`
	StandardFare   *float64 `json:"standard_fare"`
	TotalFare      *float64 `json:"total_price"`
	UserID         int64    `json:"user_id"`
}
type GetPlacesResponse struct {
	Predictions []Prediction `json:"predictions"`
	Status      string       `json:"status"`
}

type Prediction struct {
	Description string `json:"description"`
	PlaceID     string `json:"place_id"`
	Reference   string `json:"reference"`
	City        string `json:"city"`
	Country     string `json:"country"`
}
type Point struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type GetLocationResponse struct {
	Message  string            `json:"message"`
	Status   int               `json:"status"`
	Location *LocationResponse `json:"location"`
}

type PointsWithName struct {
	Name  *string `json:"name"`
	Point *Point
}
type LocationResponse struct {
	ID            *int             `json:"id" db:"id"`
	UserID        *int64           `json:"user_id" db:"user_id"`
	StartPoint    *PointsWithName  `json:"start_point" db:"start_point"`
	EndPoint      *PointsWithName  `json:"end_point" db:"end_point"`
	Waypoints     []PointsWithName `json:"waypoints" db:"waypoints"`
	TotalDistance *float64         `json:"total_distance" db:"total_distance"`
	CreatedAt     *time.Time       `json:"created_at" db:"created_at"`
}
type UserResponse struct {
	UserID      *int64  `json:"id" db:"id"`
	FirstName   *string `json:"firstname" db:"firstname"`
	LastName    *string `json:"lastname" db:"lastname"`
	Email       *string `json:"email" db:"email"`
	Role        *string `json:"role" db:"role"`
	PhoneNumber *string `json:"phone_number" db:"phone_number"`
	Address     *string `json:"address" db:"address"`
	City        *string `json:"city" db:"city"`
	Country     *string `json:"country" db:"country"`
	PostCode    *string `json:"postcode" db:"postcode"`
}

type StripeAddCardResponse struct {
	CardID         int64  `json:"card_id" db:"card_id"`
	UserID         int64  `json:"user_id" db:"user_id"`
	StripeToken    string `json:"stripe_token" db:"stripe_token"`
	Last4          string `json:"last4" db:"last4"`
	ExpMonth       string `json:"exp_month" db:"exp_month"`
	ExpYear        string `json:"exp_year" db:"exp_year"`
	CardholderName string `json:"cardholder_name" db:"cardholder_name"`
	CardBrand      string `json:"card_brand" db:"card_brand"`
	FirstName      string `json:"first_name" db:"first_name"`
	LastName       string `json:"last_name" db:"last_name"`
	CreatedAt      string `json:"created_at" db:"created_at"`
	CustomerId     string `json:"customer_id" db:"customer_id"`
}

type PaymentResponse struct {
	ID              int64   `json:"id" db:"id"`
	BookingID       int64   `json:"booking_id" db:"booking_id"`
	UserID          int64   `json:"user_id" db:"user_id"`
	CardID          int64   `json:"card_id" db:"card_id"`
	Amount          float64 `json:"amount" db:"amount"`
	Currency        string  `json:"currency" db:"currency"`
	PaymentType     string  `json:"payment_type" db:"payment_type"`
	PaymentStatus   string  `json:"payment_status" db:"payment_status"`
	PaymentIntentID string  `json:"payment_intent_id" db:"payment_intent_id"`
	ChargeID        string  `json:"charge_id,omitempty" db:"charge_id,omitempty"`
	ReceiptURL      string  `json:"receipt_url" db:"reciept_id"`
	CreatedAt       string  `json:"created_at" db:"created_at"`
}

type GetAllCardResp struct {
	CardID         int64  `json:"card_id" db:"card_id"`
	StripeToken    string `json:"stripe_token" db:"stripe_token"`
	Last4          string `json:"last4" db:"last4"`
	ExpMonth       string `json:"exp_month" db:"exp_month"`
	ExpYear        string `json:"exp_year" db:"exp_year"`
	CardholderName string `json:"cardholder_name" db:"cardholder_name"`
	CardBrand      string `json:"card_brand" db:"card_brand"`
	CustomerId     string `json:"customer_id" db:"customer_id"`
	FirstName      string `json:"first_name" db:"first_name"`
	LastName       string `json:"last_name" db:"last_name"`
}

type CreateClientSecretResp struct {
	ClientSecret string `json:"client_secret" db:"client_secret"`
}

type StripeResponse struct {
	ID string `json:"id"`
}
type QuoteResponse struct {
	LocationID *int            `json:"location_id" db:"location_id"`
	UserID     *int            `json:"user_id" db:"user_id"`
	StartPoint *PointsWithName `json:"start_point" db:"start_point"`
	EndPoint   *PointsWithName `json:"end_point" db:"end_point"`
}
