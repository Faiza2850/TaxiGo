package main

import (
	"log"
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/server"
	"github.com/gin-gonic/gin"
)

func init() {
	err := config.LoadConfig()
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	r := gin.New()
	r.Use(enableCors())
	log.Printf("Server started on port: %v", config.Cfg.ServerPort)
	log.Fatal(http.ListenAndServe(":"+config.Cfg.ServerPort, server.NewServerImpl(r)))
}

func enableCors() gin.HandlerFunc {
	return func(c *gin.Context) {
		allowedOrigins := []string{
			"https://maps.googleapis.com/maps/api/place/autocomplete/json",
			"https://maps.googleapis.com/maps/api/place/details/json",
			"https://api.stripe.com/v1/tokens",
		}
		origin := c.Request.Header.Get("Origin")

		allowOrigin := "*"
		for _, o := range allowedOrigins {
			// if o == origin {
			if o == origin || origin == "http://localhost:3000" { // Allow localhost for development
				allowOrigin = origin
				break
			}
		}

		c.Writer.Header().Set("Access-Control-Allow-Origin", allowOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, PATCH")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization, X-CSRF-Token")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
