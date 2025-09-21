package models

import (
	"time"

	"github.com/jackc/pgtype"
)

type LoginRequest struct {
	Email    *string `json:"email" db:"email"`
	Password *string `json:"password" db:"password"`
}

type SignUpRequest struct {
	FirstName   *string `json:"first_name" db:"first_name" validate:"required,min=2,max=100"`
	LastName    *string `json:"last_name" db:"last_name" validate:"required,min=2,max=100"`
	Email       *string `json:"email" db:"email" validate:"required,email"`
	Password    *string `json:"password" db:"password" validate:"required,min=8"`
	PhoneNumber *string `json:"phone_number" db:"phone_number" validate:"required"`
	Address     *string `json:"address" db:"address" validate:"required"`
	City        *string `json:"city" db:"city" validate:"required"`
	Country     *string `json:"country" db:"country" validate:"required"`
	PostCode    *string `json:"postal_code" db:"postal_code" validate:"required"`
}

type AddCarRequest struct {
	CarCategory  *string    `json:"car_category" `
	MileagePrice *float64   `json:"mileage_price"`
	Image        *string    `json:"image" `
	MetaData     *string    `json:"metadata" `
	CreatedAt    *time.Time `json:"created_at" `
}

type AddBookingRequest struct {
	UserID              *int64   `json:"user_id"`
	CarID               *int64   `json:"car_id"`
	LocationID          *int64   `json:"location_id"`
	FirstName           *string  `json:"firstname"`
	LastName            *string  `json:"lastname"`
	PhoneNumber         *string  `json:"phone_number"`
	Email               *string  `json:"email"`
	TotalPrice          *float64 `json:"total_price"`
	NumberOfPassengers  *int     `json:"number_of_passengers"`
	NumberOfSuitcases   *int     `json:"number_of_suitcases"`
	FlightNumber        *string  `json:"flight_number"`
	FlightArrivingFrom  *string  `json:"flight_arriving_from"`
	FlightDateTime      string   `json:"flight_date_time"`
	MeetAndGreet        *bool    `json:"meet_and_greet"`
	HasPet              *bool    `json:"has_pet"`
	TwoWay              *bool    `json:"two_way"`
	MultipleJourneyDisc *float64 `json:"multiple_journey_disc"`
	QuoteIDs            []int64  `json:"quote_ids"` 
}

type AddLocationRequest struct {
	UserID       *int64         `json:"user_id"`
	BookingID    *int64         `json:"booking_id"`
	LocationName *string        `json:"location_name"`
	StartPoint   *pgtype.Point  `json:"start_point"`
	EndPoint     *pgtype.Point  `json:"end_point"`
	Waypoints    []pgtype.Point `json:"waypoints"`
	CreatedAt    *time.Time     `json:"created_at"`
	City         *string        `json:"city"`
	Country      *string        `json:"country"`
}

type AddPaymentRequest struct {
	UserID          *int64   `json:"user_id" bson:"user_id"`
	Amount          *float64 `json:"amount" bson:"amount"`
	PaymentType     *string  `json:"payment_type" bson:"payment_type"`
	PaymentStatus   *string  `json:"payment_status" bson:"payment_status"`
	PaymentIntentID *string  `json:"payment_intent_id" bson:"payment_intent_id"`
	ChargeID        *string  `json:"charge_id" bson:"charge_id"`
}

type UpdateCarRequest struct {
	CarID        *int64   `json:"car_id"`
	MileagePrice *float64 `json:"mileage_price"`
}

type SaveLocationRequest struct {
	StartPoint Prediction   `json:"start_point"`
	EndPoint   Prediction   `json:"end_point"`
	Waypoints  []Prediction `json:"waypoints"`
}

type ResetPasswordRequest struct {
	Password *string `json:"password" db:"password" validate:"required,min=8"`
}

type ForgotPasswordRequest struct {
	Email *string `json:"email" db:"email" validate:"required,email"`
}
type FeedbackRequest struct {
	ID          *int64     `json:"id" db:"id"`
	UserID      int64      `json:"user_id" db:"user_id"`
	FirstName   *string    `json:"first_name" db:"first_name" validate:"required,min=2,max=100"`
	LastName    *string    `json:"last_name" db:"last_name" validate:"required,min=2,max=100"`
	Email       *string    `json:"email" db:"email" validate:"required,email"`
	PhoneNumber *string    `json:"phone_number" db:"phone_number" validate:"required,e164"`
	Description *string    `json:"description" db:"description"`
	CreatedAt   *time.Time `json:"created_at" db:"created_at"`
}

type TokenRequest struct {
	UserID     int64   `json:"user_id" db:"user_id" validate:"required"`
	Token      string  `json:"token" validate:"required"`
	NameOnCard *string `json:"name_on_card" db:"name_on_card"`
	FirstName  *string `json:"first_name" db:"first_name"`
	LastName   *string `json:"last_name" db:"last_name"`
}

type PaymentRequest struct {
	UserID    int64   `json:"user_id" db:"user_id" validate:"required"`
	CardID    int64   `json:"card_id" db:"card_id" validate:"required"`
	BookingID int64   `json:"booking_id" db:"booking_id" validate:"required"`
}

type UpdateUserRequest struct {
	FirstName   *string `json:"firstname" db:"firstname" validate:"required,min=2,max=100"`
	LastName    *string `json:"lastname" db:"lastname" validate:"required,min=2,max=100"`
	Email       *string `json:"email" db:"email" validate:"required,email"`
	PhoneNumber *string `json:"phone_number" db:"phone_number" validate:"required,e164"`
	Address     *string `json:"address" db:"address" validate:"required"`
	City        *string `json:"city" db:"city" validate:"required"`
	Country     *string `json:"country" db:"country" validate:"required"`
	PostCode    *string `json:"postcode" db:"postal_code" validate:"required"`
}

type DeleteCardRequest struct {
	CardID *int64 `json:"card_id" db:"card_id" validate:"required"`
}

type GetAllCardsRequest struct {
	UserID *int64 `json:"user_id" db:"user_id" validate:"required"`
}

type CreateClientSecretReq struct {
	UserID *int64   `json:"user_id" db:"user_id" validate:"required"`
	Amount *float64 `json:"amount" db:"amount" validate:"required"`
}
type GetCurrentBooking struct {
	ID          *int64     `json:"id" db:"id"`
	UserID      int64      `json:"user_id" db:"user_id"`
}

type StripeCardRequest struct {
	CardNumber string `json:"card_number"`
	ExpMonth   string `json:"exp_month"`
	ExpYear    string `json:"exp_year"`
	CVC        string `json:"cvc"`
}

type EditLocationRequest struct {
	ID         *int         `json:"id" db:"id"`
	StartPoint *Prediction  `json:"start_point" db:"start_point"`
	EndPoint   *Prediction  `json:"end_point" db:"end_point"`
	Waypoints  []Prediction `json:"waypoints" db:"waypoints"`
}