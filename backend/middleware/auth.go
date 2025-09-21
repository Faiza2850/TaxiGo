package middlewares

import (
	"errors"
	"fmt"

	// "AiportTaxi/config"
	"net/http"
	"strings"

	// "AiportTaxi/models"

	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

const (
	AdminTokenHeaderKey          = "Authorization"
	AdminAuthorizationTypeBearer = "BEARER"
)

func Auth(allowedRoles []string) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Request.Header.Get(AdminTokenHeaderKey)
		if len(token) == 0 {
			c.AbortWithStatusJSON(http.StatusUnauthorized, models.ErrorResponse{Error: "Token not found in header"})
			return
		}

		tokenStr := strings.Split(token, " ")
		if len(tokenStr) != 2 || strings.ToUpper(tokenStr[0]) != AdminAuthorizationTypeBearer {
			c.AbortWithStatusJSON(http.StatusUnauthorized, models.ErrorResponse{Error: "Invalid authorization format"})
			return
		}

		claims, err := ValidateAccessToken(tokenStr[1])
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, models.ErrorResponse{Error: err.Error()})
			return
		}
		if !AllowedRoles(claims.Role, allowedRoles) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, models.ErrorResponse{Error: "Unauthorized access"})
			return
		}

		setClaims(c, *claims)
		c.Next()
	}
}

func AllowedRoles(role *string, allowedRoles []string) bool {
	for _, r := range allowedRoles {

		if role != nil && r == *role {
			return true
		}
	}
	return false
}

func ValidateAccessToken(tokenString string) (*models.CustomClaims, error) {
	keyFunc := func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method in auth token")
		}
		return []byte(config.Cfg.JwtSecret), nil
	}

	token, err := jwt.ParseWithClaims(tokenString, &models.CustomClaims{}, keyFunc)
	if err != nil {
		return nil, fmt.Errorf("error parsing token claims: %w", err)
	}

	claims, ok := token.Claims.(*models.CustomClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}

func setClaims(c *gin.Context, claims models.CustomClaims) {
	c.Set("Id", claims.Id)
	c.Set("email", claims.Email)
	c.Set("firstname", claims.FirstName)
	c.Set("lastname", claims.LastName)
	c.Set("is_admin", claims.Role)
}
