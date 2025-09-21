package server

import (
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/config"
	middlewares "github.com/CapregSoft/project-airport-taxi/middleware"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) Bookme(c *gin.Context) {
	var request models.AddBookingRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}
	token := c.GetHeader("Authorization")
	var UserID *uint
	var role string
	// role := "customer"

	if token == "" {
		role = "guest"
		UserID = nil

	} else {
		claims, err := middlewares.DecodeToken(token, config.Cfg.JwtSecret)
		if err != nil {
			c.JSON(http.StatusUnauthorized, models.ErrorResponse{Error: "Invalid token"})
			return
		}
		UserID = &claims.Id
		role = *claims.Role
	}
	booking, password, err := s.api.CreateBooking(request, role, UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	var newToken string
	if role == "guest" && token == "" {
		guestUser := &models.User{
			UserID:    booking.UserID,
			Email:     request.Email,
			FirstName: request.FirstName,
			LastName:  request.LastName,
			Role:      &role,
		}
		newToken, err = middlewares.GenerateToken(guestUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to generate token"})
			return
		}
	}
	if password != nil {
		// Send the welcome email notification
		err = guestwelcomeNotification(*request.FirstName, *request.Email, *password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to send welcome email"})
			return 
		}
	}
	response := models.Response{
		Message: "Booking created successfully",
		Data:    booking,
		Status:  http.StatusOK,
	}

	if newToken != "" {
		response.GuestToken = newToken
	}

	c.JSON(http.StatusOK, response)
}


func (s *Server) GetAllBookings(c *gin.Context) {
	allBookings, err := s.api.GetAllBookingsAPI(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Server is unable to get from api"})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Booking detail",
		Data:    allBookings,
	})

}

func (s *Server) UserRideHistory(c *gin.Context) {
	userId, _ := c.Get("Id")
	userIDUint, ok := userId.(uint)
	if !ok {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Invalid user ID type"})
		return
	}
	userID := int64(userIDUint)

	booking, err := s.api.UserRideHistory(userID)
	if err != nil {
		if err.Error() == "booking with this ID not found" {
			c.JSON(http.StatusNotFound, models.ErrorResponse{Error: err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		}
		return
	}

	for i := range booking {
		startPoint, endPoint, err := s.getStartAndEndPoints(c, booking[i])
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to get location"})
			return
		}
		booking[i].StartPoint = startPoint
		booking[i].EndPoint = endPoint
	}

c.JSON(http.StatusOK, models.Response{
	Message: "Booking retrieved successfully",
	Status:  http.StatusOK,
	Data:    booking,
})
}
func (s *Server) CustomerCurrentBooking(c *gin.Context) {

	var customerCurrentBookingReq models.GetCurrentBooking
	if err := c.ShouldBindJSON(&customerCurrentBookingReq); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Invalid request payload"})
		return
	}

	bookingID := customerCurrentBookingReq.ID
	userID := customerCurrentBookingReq.UserID

	booking, err := s.api.UserAllBooking(userID, *bookingID)
	if err != nil {
		if err.Error() == "booking with this ID not found" {
			c.JSON(http.StatusNotFound, models.ErrorResponse{Error: err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		}
		return
	}

	startPoint, endPoint, err := s.getStartAndEndPoints(c, booking[0])
    if err != nil {
        c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to get location"})
        return
    }

    booking[0].StartPoint = startPoint
    booking[0].EndPoint = endPoint
	c.JSON(http.StatusOK, models.Response{
		Message: "Future Bookings retrieved successfully",
		Status:  http.StatusOK,
		Data:    booking,
	})
}

func (s *Server) ViewBooking(c *gin.Context) {
	userId, _ := c.Get("Id")
	userIDUint, ok := userId.(uint)
	if !ok {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "invalid user ID type"})
		return
	}
	userID := int64(userIDUint)

	booking, err := s.api.ViewBooking(userID)
	if err != nil {
		if err.Error() == "booking with this ID not found" {
			c.JSON(http.StatusNotFound, models.ErrorResponse{Error: err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		}
		return
	}
		for i := range booking {
			startPoint, endPoint, err := s.getStartAndEndPoints(c, booking[i])
			if err != nil {
				c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to get location"})
				return
			}
			booking[i].StartPoint = startPoint
			booking[i].EndPoint = endPoint
		}
	
	c.JSON(http.StatusOK, models.Response{
		Message: "Future Bookings retrieved successfully",
		Status:  http.StatusOK,
		Data:    booking,
	})
}
func (s *Server) getStartAndEndPoints(c *gin.Context, booking models.BookingResponse) (*models.PointsWithName, *models.PointsWithName, error) {
    location, err := s.api.GetLocationByID(c, booking.LocationID)
    if err != nil {
        return nil, nil, err
    }

    startPoint, err := s.getPointWithName(c, location.StartPoint.P.X, location.StartPoint.P.Y)
    if err != nil {
        return nil, nil, err
    }

    endPoint, err := s.getPointWithName(c, location.EndPoint.P.X, location.EndPoint.P.Y)
    if err != nil {
        return nil, nil, err
    }

    return startPoint, endPoint, nil
}

func (s *Server) getPointWithName(c *gin.Context, lat, long float64) (*models.PointsWithName, error) {
    name, err := s.api.GetLocationName(lat, long)
    if err != nil {
        return nil, err
    }
    return &models.PointsWithName{
        Name: &name,
        Point: &models.Point{
            Latitude:  lat,
            Longitude: long,
        },
    }, nil
}
