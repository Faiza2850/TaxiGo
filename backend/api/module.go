package api

import (
	// "AiportTaxi/db/postgres"
	// "AiportTaxi/models"

	"context"
	"github.com/CapregSoft/project-airport-taxi/db/postgres"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go"
)

type AiportTaxiAPI interface {
	SignUpUser(c *gin.Context, SignUpCredentials models.SignUpRequest) (bool, error)
	LoginAdmin(c *gin.Context, AdminloginCredentials models.LoginRequest) (string, error)
	LoginUser(c *gin.Context, loginCredentials models.LoginRequest) (string, error)
	ResetPasswordAPI(c *gin.Context, req models.ResetPasswordRequest, id int64) (*models.User, error)
	ForgotPasswordAPI(c *gin.Context, email models.ForgotPasswordRequest) (*string, error)
	AddCar(c *gin.Context, AddCarCredentials models.AddCarRequest) (bool, error)
	GetAllCarsAPI(c *gin.Context) ([]models.Car, error)
	GetCarByCategoryAPI(carCategory string) (*models.Car, error)
	UpdateCarAPI(c *gin.Context, updatecar models.UpdateCarRequest) error
	CreateBooking(req models.AddBookingRequest, role string, userId *uint) (*models.Booking, *string, error)
	GetAllBookingsAPI(c *gin.Context) ([]models.AllBookingsResponse, error)
	UserRideHistory(userID int64) ([]models.BookingResponse, error)
	UserAllBooking(userID int64, bookingID int64) ([]models.BookingResponse, error)
	ViewBooking(userID int64) ([]models.BookingResponse, error)
	GetRecommendedPlaces(placeName string) (*models.GetPlacesResponse, error)
	FindLocations(req models.SaveLocationRequest) (*models.Location, error)
	SaveLocation(location *models.Location) (*models.Location, error)
	SaveLocationsForGuest(location *models.Location) (*models.Location, error)
	GetLocationByID(ctx context.Context, locationID int64) (*models.Location, error)
	ContactUsAPI(c *gin.Context, fb *models.FeedbackRequest, role string, userId *uint) error
	SavedCardAPI(c *gin.Context, Request models.TokenRequest) (*models.StripeAddCardResponse, error)
	MakePaymentAPI(c *gin.Context, request *models.PaymentRequest) (*models.PaymentResponse, error)
	DeleteCardAPI(c *gin.Context, cardID models.DeleteCardRequest) error
	GetAllCardsAPI(c *gin.Context, request models.GetAllCardsRequest) (*[]models.GetAllCardResp, error)
	CreatePaymentMehthodAPI(c *gin.Context, request models.CreateClientSecretReq) (*models.CreateClientSecretResp, error)
	UpdatePaymentAfterSuccess(paymentIntent stripe.PaymentIntent) error
	UpdatePaymentAfterCancellation(paymentIntent stripe.PaymentIntent) error
	UpdatePaymentAfterFailure(paymentIntent stripe.PaymentIntent) error
	GetUserByIdAPI(c *gin.Context, userid int64) (*models.UserResponse, error)
	EditProfileAPI(c *gin.Context, updateUser *models.UpdateUserRequest, userid int64) error
	GetLocationName(lat, lng float64) (string, error)
	GetQuoteAPI(c *gin.Context, UserId *uint) ([]models.QuoteResponse, error)
	EditLocation(location *models.Location) error
	
}

type AiportTaxiAPIImpl struct {
	postgres postgres.AiportTaxiDB
}

func NewAiportTaxiAPIImpl() *AiportTaxiAPIImpl {
	pg := postgres.NewAiportTaxiDBImpl()

	return &AiportTaxiAPIImpl{
		postgres: pg,
	}
}

var _ AiportTaxiAPI = &AiportTaxiAPIImpl{}
