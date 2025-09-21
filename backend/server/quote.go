package server

import (
	"fmt"
	"net/http"
	// "github.com/CapregSoft/project-airport-taxi/config"
	// middlewares "github.com/CapregSoft/project-airport-taxi/middleware"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
	// "fmt"
)

func (s *Server) GetQuoteByUserID(c *gin.Context) {
	// var UserID *uint
	// token := c.GetHeader("Authorization")
	// fmt.Println(token,"token")
	// claims, err := middlewares.DecodeToken(token, config.Cfg.JwtSecret)
	// 	if err != nil {
	// 		c.JSON(http.StatusUnauthorized, models.ErrorResponse{Error: "Invalid token"})
	// 		return
	// 	}
	// 		UserID = &claims.Id
	// 		fmt.Println(UserID,"id")

	userId, _ := c.Get("Id")
	userIDUint, ok := userId.(uint)
	if !ok {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "invalid user ID type"})
		return
	}
	userID := uint(userIDUint)
	data, err := s.api.GetQuoteAPI(c, &userID)
	if err != nil {
		if err.Error() == "quote with this ID not found" {
			c.JSON(http.StatusNotFound, models.ErrorResponse{Error: err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		}
		return
	}

	fmt.Println("data EndPoint,",data[0].EndPoint)
	fmt.Println("data StartPoint,",data[0].StartPoint)
	fmt.Println("data LocationID,",data[0].LocationID)
	c.JSON(http.StatusOK, models.Response{
		Message: "Quotes retrieved successfully",
		Status:  http.StatusOK,
		Data:    data,
	})

}

func (s *Server) getQuoteStartAndEndPoints(c *gin.Context, quote models.QuoteResponse) (*models.PointsWithName, *models.PointsWithName, error) {
   quoteLocationId:= int64(*quote.LocationID)
	location, err := s.api.GetLocationByID(c, quoteLocationId)
    if err != nil {
        return nil, nil, err
    }

    startPoint, err := s.getQuotePointWithName(c, location.StartPoint.P.X, location.StartPoint.P.Y)
    if err != nil {
        return nil, nil, err
    }

    endPoint, err := s.getQuotePointWithName(c, location.EndPoint.P.X, location.EndPoint.P.Y)
    if err != nil {
        return nil, nil, err
    }

    return startPoint, endPoint, nil
}

func (s *Server) getQuotePointWithName(c *gin.Context, lat, long float64) (*models.PointsWithName, error) {
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