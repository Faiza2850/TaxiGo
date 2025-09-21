package server

import (
	"fmt"
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/api"
	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) ResetPassword(c *gin.Context) {

	var request models.ResetPasswordRequest
	fmt.Println("passowrd-----------", request.Password)
	// tokenStr := c.GetHeader("Authorization")
	// claims, err := middlewares.ValidateAccessToken(tokenStr)
	// if err != nil {
	// 	c.JSON(http.StatusUnauthorized, models.ErrorResponse{Error: "Invalid or expired token."})
	// 	return
	// }

	fmt.Println("passowrd-----------", request.Password)

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if err := api.ValidateRequest(c, request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	fmt.Println("passowrd-----------", request.Password)

	userId, _ := c.Get("Id")
	fmt.Println("userId-----------",userId)

	userIDUint, ok := userId.(uint)
	if !ok {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Invalid user ID type"})
		return
	}
	userIDInt64 := int64(userIDUint)

	_, err := s.api.ResetPasswordAPI(c, request, userIDInt64)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Error changing password."})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Password changed successfully",
		Status:  http.StatusOK,
		Data:    nil,
	})
}

func (s *Server) ForgotPassword(c *gin.Context) {

	request := &models.ForgotPasswordRequest{}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if err := api.ValidateRequest(c, request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	resetToken, err := s.api.ForgotPasswordAPI(c, *request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "User with this email is not registered."})
		return
	}

	resetLink := fmt.Sprintf("%s/reset-password?token=%s", config.Cfg.FRONTEND_URL, *resetToken)

	err = ResetPasswordNotification(*request.Email, resetLink)
	fmt.Println(err)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to send password reset email."})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Password reset link sent to email.",
		Status:  http.StatusOK,
	})

}
