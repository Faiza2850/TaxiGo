package server

import (
	// "AiportTaxi/models"
	"fmt"
	"log"
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) AddCar(c *gin.Context) {

	var AddCarCredentials models.AddCarRequest
	if err := c.BindJSON(&AddCarCredentials); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}
	fmt.Printf("car %+v\n", AddCarCredentials)
	if AddCarCredentials.CarCategory == nil || AddCarCredentials.MileagePrice == nil || AddCarCredentials.Image == nil || AddCarCredentials.MetaData == nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "All fields must be provided"})
		return
	}
	car, err := s.api.AddCar(c, AddCarCredentials)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}
	if car {
		c.JSON(http.StatusConflict, models.Response{
			Data:    car,
			Message: "Car already exists",
			Status:  http.StatusConflict,
		})
	} else {
		c.JSON(http.StatusOK, models.Response{
			Message: "Car added successfully",
			Status:  http.StatusOK,
		})
	}

}

func (s *Server) GetAllCars(c *gin.Context) {
	allCars, err := s.api.GetAllCarsAPI(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Server is unable to get from api"})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "All Cars From Cars table fetched successfully",
		Data:    allCars,
	})

}

func (s *Server) GetCarByCategory(c *gin.Context) {
	category := c.Param("category")

	if category == "" {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Category is required"})
		return
	}

	log.Print(category)

	car, err := s.api.GetCarByCategoryAPI(category)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Car retrieved successfully",
		Status:  http.StatusOK,
		Data:    car,
	})
}

func (s *Server) UpdateCar(c *gin.Context){
var UpdateCar models.UpdateCarRequest
if err := c.BindJSON(&UpdateCar); err != nil {
	c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
	return
}
 err := s.api.UpdateCarAPI(c, UpdateCar)
if err != nil {
	c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
	return
}
c.JSON(http.StatusOK, models.Response{
	Message: "Mileage price updated successfully",
	Status:  http.StatusOK,
})
}