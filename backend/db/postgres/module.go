package postgres

import (
	// "AiportTaxi/config"
	"fmt"
	"log"

	"github.com/CapregSoft/project-airport-taxi/models"

	"github.com/CapregSoft/project-airport-taxi/config"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type AiportTaxiDB interface {
	SignUpUserDb(SignUpCredentials models.SignUpRequest) (bool, error)
	LoginAdminDb(AdminloginCredentials models.LoginRequest) (*models.User, error)
	LoginUserDb(loginCredentials models.LoginRequest) ([]*models.User, error)
	ResetpasswordDB(userId int64, updatedpassword models.ResetPasswordRequest) (*models.User, error)
	ForgotPasswordDb(email models.ForgotPasswordRequest) (*models.User, error)
	AddCarDb(AddCarCredentials models.AddCarRequest) (bool, error)
	GetAllCarsDb() (allcars []models.Car, err error)
	GetCarByCategoryDB(carCategory string) (*models.Car, error)
	CreateBookingDb(booking models.AddBookingRequest, role string, userId *uint)(*models.Booking, *string, error) 
	GetAllBookingsDb() (allbookings []models.AllBookingsResponse, err error)
	UserRideHistoryDb(userID int64) ([]models.BookingResponse, error)
	UserAllBookingDb(userID int64, bookingID int64) ([]models.BookingResponse, error)
	ViewBookingDb(userID int64) ([]models.BookingResponse, error)
	UpdateCarDb(Updatecar models.UpdateCarRequest) error
	SaveLocationDb(location *models.Location) error
	SaveLocationForGuestDb(location *models.Location) error
	GetLocationByIDDB( locationID int64) (*models.Location, error)
	ContactUsDb(fb *models.FeedbackRequest, role string, userId *uint) error
	GetCustomerByUserID(userID int) (string, error)
	SavedCardDb(cardCredentials models.StripeAddCardResponse) (*models.StripeAddCardResponse, error)
	GetCardByID(cardID int64) (*models.StripeAddCardResponse, error)
	SavePaymentRecord(payment models.PaymentResponse) (*models.PaymentResponse, error)
	UpdateBookingStatus(bookingID int64, status string) error
	GetbookingByID(bookingID int64) (*models.BookingResponse, error)
	CardExistsDb(cardId models.DeleteCardRequest) (bool, error)
	DeleteCardDb(cardID models.DeleteCardRequest) error
	CreatePaymentMehthodDb(request models.PaymentResponse) (*models.PaymentResponse, error)
	GetAllCardDb(request models.GetAllCardsRequest) (*[]models.GetAllCardResp, error)
	UpdatePaymentStatus(payment models.PaymentResponse) error
	GetUserByIdDB(userid int64) (*models.UserResponse, error)
	EditProfileDB(updateUser *models.UpdateUserRequest, userid int64) error
	EditLocationDb(location *models.Location) (error)
	GetQuoteDB(incomingUserId *uint) (data []models.QuoteResponse, err error)
}

type AiportTaxiDBImpl struct {
	dbConn *sqlx.DB
}

func NewAiportTaxiDBImpl() *AiportTaxiDBImpl {
	if err := config.LoadConfig(); err != nil {
		log.Fatalf("Error loading config: %v", err)
	}
	dbconnection := fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=%s",
		config.Cfg.PG_USER, config.Cfg.PG_PASSWORD, config.Cfg.PG_HOST, config.Cfg.PG_PORT, config.Cfg.PG_DB, config.Cfg.SSL_MODE)

	db, err := sqlx.Open("postgres", dbconnection)
	if err != nil {
		log.Fatalf("Error opening database connection: %v", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	return &AiportTaxiDBImpl{
		dbConn: db,
	}
}

var _ AiportTaxiDB = &AiportTaxiDBImpl{}
