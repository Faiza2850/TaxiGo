package config

import (
	"os"

	"github.com/spf13/viper"
)

type Config struct {
	PG_HOST               string `mapstructure:"PG_HOST"`
	PG_PORT               int    `mapstructure:"PG_PORT"`
	PG_DB                 string `mapstructure:"PG_DB"`
	PG_USER               string `mapstructure:"PG_USER"`
	PG_PASSWORD           string `mapstructure:"PG_PASSWORD"`
	ServerPort            string `mapstructure:"SERVER_PORT"`
	JwtSecret             string `mapstructure:"JWT_SECRET"`
	RefreshJwtSecret      string `mapstructure:"REFRESH_JWT_SECRET"`
	SSL_MODE              string `mapstructure:"SSL_MODE"`
	MapApiKey             string `mapstructure:"MAP_API_KEY"`
	PGDump                string
	Schemas               []string
	NoHeader              bool
	Writer                *os.File
	NoClean               bool
	MAIL_HOST             string `mapstructure:"MAIL_HOST"`
	MAIL_PORT             int    `mapstructure:"MAIL_PORT"`
	MAIL_USERNAME         string `mapstructure:"MAIL_USERNAME"`
	MAIL_PASSWORD         string `mapstructure:"MAIL_PASSWORD"`
	RECIEVER_EMAIL        string `mapstructure:"RECIEVER_EMAIL"`
	STRIPE_KEY            string `mapstructure:"STRIPE_KEY"`
	STRIPE_WEBHOOK_SECRET string `mapstructure:"STRIPE_WEBHOOK_SECRET"`
	STRIPE_TOKEN_KEY      string `mapstructure:"STRIPE_TOKEN_KEY"`
	FRONTEND_URL          string `mapstructure:"FRONTEND_URL"`
}

var Cfg Config

func LoadConfig() error {
	viper.AddConfigPath("./")
	// export ENV=production // To load the production env
	if os.Getenv("ENV") == "prod" {
		viper.SetConfigName(".env.prod")
	} else if os.Getenv("ENV") == "staging" {
		viper.SetConfigName(".env.staging")
	} else {
		viper.SetConfigName(".env.dev")
	}
	viper.SetConfigType("env")
	err := viper.ReadInConfig()
	viper.AutomaticEnv()
	if err != nil {
		return err
	}
	err = viper.Unmarshal(&Cfg)
	return err
}
