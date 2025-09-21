package server

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) GetPlaces(c *gin.Context) {
	placeName := c.Param("place_name")
	if placeName == "" {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "place_name query parameter is required"})
		return
	}
		// Replace spaces with + in the placeName
		encodedPlaceName := strings.ReplaceAll(placeName, " ", "+")
		
	places, err := s.api.GetRecommendedPlaces(encodedPlaceName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Recommended places retrieved successfully",
		Status:  http.StatusOK,
		Data:    places,
	})
}
func (s *Server) SaveLocations(c *gin.Context) {
	var req models.SaveLocationRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Invalid request payload"})
		return
	}

	if req.StartPoint == (models.Prediction{}) || req.EndPoint == (models.Prediction{}) {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "StartPoint and EndPoint must be provided"})
		return
	}
	userId, _ := c.Get("Id")
	userIDUint, ok := userId.(uint)
	if !ok {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "invalid user ID type"})
		return
	}
	userID := int64(userIDUint)

	location, err := s.api.FindLocations(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	location.LocationName = &req.StartPoint.Description

	UserId := userID
	location.UserID = &UserId
	location.City = &req.StartPoint.City
	location.Country = &req.StartPoint.Country

	fmt.Println("location start ", *location.StartPoint)
	fmt.Println("location end ", *location.EndPoint)
	fmt.Println("location way ", location.Waypoints)

	// Assuming there's a method in the API to save locations
	location, err = s.api.SaveLocation(location)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Location saved successfully",
		Status:  http.StatusOK,
		Data:    location,
	})
}

func (s *Server) SaveLocationsForGuest(c *gin.Context) {
	var req models.SaveLocationRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Invalid request payload"})
		return
	}

	if req.StartPoint == (models.Prediction{}) || req.EndPoint == (models.Prediction{}) {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "StartPoint and EndPoint must be provided"})
		return
	}

	location, err := s.api.FindLocations(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	location.LocationName = &req.StartPoint.Description

	location.City = &req.StartPoint.City
	location.Country = &req.StartPoint.Country

	fmt.Println("location start ", *location.StartPoint)
	fmt.Println("location end ", *location.EndPoint)
	fmt.Println("location way ", location.Waypoints)

	// Assuming there's a method in the API to save locations
	location, err = s.api.SaveLocationsForGuest(location)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Location saved successfully",
		Status:  http.StatusOK,
		Data:    location,
	})
}
func (s *Server) GetLocationById(c *gin.Context) {
	locationIDParam := c.Param("id")
	locationID, err := strconv.ParseInt(locationIDParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Invalid location ID"})
		return
	}
	// userId, _ := c.Get("Id")
	// userIDUint, ok := userId.(uint)
	// if !ok {
	// 	c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "invalid user ID type"})
	// 	return
	// }
	// userID := int64(userIDUint)
	location, err := s.api.GetLocationByID(c, locationID)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, models.ErrorResponse{Error: "Location not found"})
		} else {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		}
		return
	}

	startPointName, err := s.api.GetLocationName(location.StartPoint.P.X, location.StartPoint.P.Y)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	startPoint := &models.PointsWithName{
		Name: &startPointName,
		Point: &models.Point{
			Latitude:  location.StartPoint.P.X,
			Longitude: location.StartPoint.P.Y,
		},
	}
	endPointName, err := s.api.GetLocationName(location.EndPoint.P.X, location.EndPoint.P.Y)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	endPoint := &models.PointsWithName{
		Name: &endPointName,
		Point: &models.Point{
			Latitude:  location.EndPoint.P.X,
			Longitude: location.EndPoint.P.Y,
		},
	}

	var waypoints []models.PointsWithName
	for _, waypoint := range location.Waypoints {

		waypointName, err := s.api.GetLocationName(waypoint.P.X, waypoint.P.Y)
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
			return
		}
		waypoints = append(waypoints, models.PointsWithName{
			Name: &waypointName,
			Point: &models.Point{
				Latitude:  waypoint.P.X,
				Longitude: waypoint.P.Y,
			},
		})
	}

	locationResponse := &models.LocationResponse{
		ID:            location.ID,
		UserID:        location.UserID,
		StartPoint:    startPoint,
		EndPoint:      endPoint,
		Waypoints:     waypoints,
		TotalDistance: location.TotalDistance,
		CreatedAt:     location.CreatedAt,
	}

	c.JSON(http.StatusOK, models.GetLocationResponse{
		Message:  "Location saved successfully",
		Status:   http.StatusOK,
		Location: locationResponse,
	})
}


func (s *Server) EditLocation(c *gin.Context) {
	var req models.EditLocationRequest
	
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Invalid request payload"})
		return
	}
	if req.ID == nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "ID must be provided"})
		return
	}
	if req.StartPoint == nil || req.EndPoint == nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "StartPoint and EndPoint must be provided"})
		return
	}
	var find models.SaveLocationRequest
	find.StartPoint = *req.StartPoint
	find.EndPoint = *req.EndPoint
	find.Waypoints = req.Waypoints
	location, err := s.api.FindLocations(find)
	fmt.Println("location start ", *location.StartPoint)
	fmt.Println("location end ", *location.EndPoint)
	fmt.Println("location way ", location.Waypoints)
	location.ID = req.ID
	
	err = s.api.EditLocation(location)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}
	
	
	c.JSON(http.StatusOK, models.Response{
		Message: "Location Updated successfully",
		Status:  http.StatusOK,
	})
}