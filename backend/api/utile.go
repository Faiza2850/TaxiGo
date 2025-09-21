package api

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return "", fmt.Errorf("error in Hashing password")
	}
	return string(bytes), nil

}

func checkPassword(password string, hash string) (bool, error) {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		return false, err
	}
	return true, nil
}

func ValidateRequest(c *gin.Context, request interface{}) error {
	validate := validator.New()
	if err := validate.Struct(request); err != nil {
		validationErrors := err.(validator.ValidationErrors)
		var errorMsgs []string
		for _, fieldError := range validationErrors {
			fieldName := fieldError.Field()
			tag := fieldError.Tag()
			errorMsg := fmt.Sprintf("%s is invalid. Error: %s", fieldName, tag)
			errorMsgs = append(errorMsgs, errorMsg)
		}
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Validation failed: " + strings.Join(errorMsgs, ", ")})
		return err
	}
	return nil
}
