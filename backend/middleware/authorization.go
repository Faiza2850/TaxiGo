package middlewares

import (
	"errors"
	"fmt"
	"time"

	// "AiportTaxi/config"
	// "AiportTaxi/models"

	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/dgrijalva/jwt-go"
)

const (
	TokenHeaderKey          = "Authorization"
	AuthorizationTypeBearer = "BEARER"
)

func GenerateToken(user *models.User) (string, error) {
	claims := models.UserClaims{
		Id:        uint(*user.UserID),
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Role:      user.Role,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenStr, err := token.SignedString([]byte(config.Cfg.JwtSecret))
	if err != nil {
		return "", fmt.Errorf("error signing token: %w", err)
	}

	return tokenStr, nil
}

func GenerateResetToken(user *models.User) (string, error) {
	claims := models.UserClaims{
		Id:        uint(*user.UserID),
		Email:     user.Email,
		Role:      user.Role,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(5 * time.Hour).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenStr, err := token.SignedString([]byte(config.Cfg.JwtSecret))
	if err != nil {
		return "", fmt.Errorf("error signing reset token: %w", err)
	}

	return tokenStr, nil
}
func DecodeToken(tokenString string, secretKey string) (*models.UserClaims, error) {
	// Parse the token
	token, err := jwt.ParseWithClaims(tokenString, &models.UserClaims{}, func(token *jwt.Token) (interface{}, error) {
		// Validate the algorithm
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(secretKey), nil
	})

	if err != nil {
		return nil, err // Return the error if token parsing fails
	}

	// Check if the token is valid and extract claims
	if claims, ok := token.Claims.(*models.UserClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, errors.New("invalid token")
}
