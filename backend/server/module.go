package server

import (
	"github.com/CapregSoft/project-airport-taxi/api"
	middlewares "github.com/CapregSoft/project-airport-taxi/middleware"

	"github.com/gin-gonic/gin"
)

type ServerImpl interface {
	SignUp(c *gin.Context)
	Login(c *gin.Context)
	AddCar(c *gin.Context)
	GetAllCars(c *gin.Context)
	GetCarByCategory(c *gin.Context)
	UpdateCar(c *gin.Context)
}
type Server struct {
	api api.AiportTaxiAPI
}

func NewServer() *Server {
	api := api.NewAiportTaxiAPIImpl()
	return &Server{
		api: api,
	}
}

func NewServerImpl(r *gin.Engine) *gin.Engine {
	server := NewServer()
	base := r.Group("/api")
	base.POST("/signup", server.SignUp)
	base.POST("/login", server.Login)
	base.POST("/admin/login", server.AdminLogin)
	base.POST("/reset-password", middlewares.Auth([]string{"admin", "customer", "guest"}), server.ResetPassword)
	base.POST("/forgot-password", server.ForgotPassword)
	base.POST("/contactUs", server.ContactUs)
	base.POST("/add-car", middlewares.Auth([]string{"admin"}), server.AddCar)
	base.GET("/allcar", server.GetAllCars)
	base.PATCH("/updte-car", middlewares.Auth([]string{"admin"}), server.UpdateCar)
	base.POST("/bookme", server.Bookme)
	base.GET("/car-by-category/:category", middlewares.Auth([]string{"admin"}), server.GetCarByCategory)
	base.GET("/get-place/:place_name", server.GetPlaces)
	base.POST("/save-locations", middlewares.Auth([]string{"admin", "customer", "guest"}), server.SaveLocations)
	base.POST("/save-locations-for-guest", server.SaveLocationsForGuest)
	base.GET("/allbookings", server.GetAllBookings)
	base.GET("/ride-history" , middlewares.Auth([]string{"customer", "guest"}), server.UserRideHistory)
	base.POST("/current-booking" , server.CustomerCurrentBooking)
	base.GET("/view-booking" , middlewares.Auth([]string{"customer", "guest"}), server.ViewBooking)
	base.GET("/get-location/:id", server.GetLocationById)
	base.POST("/save-card", server.SavedCard)
	base.POST("/process-payment", server.ProcessPayment)
	base.DELETE("/delete-card", server.DeleteCard)
	base.POST("/getallcards", server.GetAllCards)
	base.PUT("/edit-location",server.EditLocation)
	base.POST("/create-payment-method", server.CreatePaymentMethod)
	base.POST("/stripe/webhook", server.StripeWebhook)
	base.GET("/get-user-by-id", middlewares.Auth([]string{"admin", "customer", "guest"}), server.GetUserById)
	base.PATCH("/edit-profile", middlewares.Auth([]string{"customer", "guest"}), server.EditProfile)
	base.POST("/get-stripe-token",server.GetStripeToken )
	base.GET("/get/quote", middlewares.Auth([]string{"customer", "guest"}), server.GetQuoteByUserID)
	return r
}

var _ ServerImpl = &Server{}
