package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *Server) CheckHealth(c *gin.Context) {
	c.JSON(http.StatusOK, "OK")
}