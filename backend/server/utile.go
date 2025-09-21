package server

import (
	
	"crypto/tls"
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/CapregSoft/project-airport-taxi/config"

	gomail "gopkg.in/mail.v2"
)

func ResetPasswordNotification(email string, resetLink string) error {

	smtpHost := config.Cfg.MAIL_HOST
	smtpPort := config.Cfg.MAIL_PORT
	senderUserName := config.Cfg.MAIL_USERNAME
	senderPassword := config.Cfg.MAIL_PASSWORD
	recieverEmail := email

	smtpPortstr := strconv.Itoa(smtpPort)

	if smtpHost == "" || smtpPortstr == "" || senderUserName == "" || senderPassword == "" {
		return fmt.Errorf("SMTP configuration must be set in the environment variables")
	}

	htmlBytes, err := os.ReadFile("emailtemplates/forgot_password_temp.html")
	if err != nil {
		return fmt.Errorf("failed to read HTML template file: %v", err)
	}

	htmlTemplate := string(htmlBytes)

	htmlBody := strings.ReplaceAll(htmlTemplate, "{{.Email}}", email)
	htmlBody = strings.ReplaceAll(htmlBody, "{{.ResetLink}}", resetLink)

	m := gomail.NewMessage()
	m.SetHeader("From", senderUserName)
	m.SetHeader("To", recieverEmail)
	m.SetHeader("Subject", "Password Reset Request")
	m.SetBody("text/html", htmlBody)

	port, err := strconv.Atoi(smtpPortstr)
	if err != nil {
		return fmt.Errorf("invalid SMTP port: %v", err)
	}

	d := gomail.NewDialer(smtpHost, port, senderUserName, senderPassword)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("failed to send email: %v", err)
	}

	return nil
}

func SendFeedbackNotification(feedback string, userEmail string, name string) error {
	
	smtpHost := config.Cfg.MAIL_HOST
	smtpPort := config.Cfg.MAIL_PORT
	senderUserName := config.Cfg.MAIL_USERNAME
	senderPassword := config.Cfg.MAIL_PASSWORD
	recieverEmail := config.Cfg.RECIEVER_EMAIL

	smtpPortstr := strconv.Itoa(smtpPort)

	if smtpHost == "" || smtpPortstr == "" || senderUserName == "" || senderPassword == "" {
		return fmt.Errorf("SMTP configuration must be set in the environment variables")
	}


	htmlBytes, err := os.ReadFile("emailtemplates/contact_us_temp.html")
	if err != nil {
		return fmt.Errorf("failed to read HTML template file: %v", err)
	}

	htmlTemplate := string(htmlBytes)

	htmlBody := strings.ReplaceAll(htmlTemplate, "{{.UserEmail}}", userEmail)
	htmlBody = strings.ReplaceAll(htmlBody, "{{.FeedbackMessage}}", feedback)
	htmlBody = strings.ReplaceAll(htmlBody, "{{.Name}}", name)

	m := gomail.NewMessage()
	m.SetHeader("From", senderUserName)
	m.SetHeader("To", recieverEmail)
	m.SetHeader("Subject", "Customer Reached You")
	m.SetBody("text/html", htmlBody)

	port, err := strconv.Atoi(smtpPortstr)
	if err != nil {
		return fmt.Errorf("invalid SMTP port: %v", err)
	}

	d := gomail.NewDialer(smtpHost, port, senderUserName, senderPassword)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("failed to send email: %v", err)
	}

	return nil
}
func welcomeNotification(name string, email string)error{


	smtpHost := config.Cfg.MAIL_HOST
	smtpPort := config.Cfg.MAIL_PORT
	senderUserName := config.Cfg.MAIL_USERNAME
	senderPassword := config.Cfg.MAIL_PASSWORD
	recieverEmail := email

	smtpPortstr := strconv.Itoa(smtpPort)

	if smtpHost == "" || smtpPortstr == "" || senderUserName == "" || senderPassword == "" {
		return fmt.Errorf("SMTP configuration must be set in the environment variables")
	}
subject:="Welcome to <b>Bookmee!</b> Your account has been created."
	htmlBytes, err := os.ReadFile("emailtemplates/general_email.html")
	if err != nil {
		return fmt.Errorf("failed to read HTML template file: %v", err)
	}

	htmlTemplate := string(htmlBytes)

	htmlBody := strings.ReplaceAll(htmlTemplate, "{{.Name}}", name)
	htmlBody = strings.ReplaceAll(htmlBody, "{{.Subject}}", subject)

	m := gomail.NewMessage()
	m.SetHeader("From", senderUserName)
	m.SetHeader("To", recieverEmail)
	m.SetHeader("Subject", "Welcome to Bookme!")
	m.SetBody("text/html", htmlBody)

	port, err := strconv.Atoi(smtpPortstr)
	if err != nil {
		return fmt.Errorf("invalid SMTP port: %v", err)
	}

	d := gomail.NewDialer(smtpHost, port, senderUserName, senderPassword)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("failed to send email: %v", err)
	}

	return nil
}


func bookingConfirmation(name string)error{


	smtpHost := config.Cfg.MAIL_HOST
	smtpPort := config.Cfg.MAIL_PORT
	senderUserName := config.Cfg.MAIL_USERNAME
	senderPassword := config.Cfg.MAIL_PASSWORD
	recieverEmail := config.Cfg.RECIEVER_EMAIL

	smtpPortstr := strconv.Itoa(smtpPort)

	if smtpHost == "" || smtpPortstr == "" || senderUserName == "" || senderPassword == "" {
		return fmt.Errorf("SMTP configuration must be set in the environment variables")
	}
subject:="Your ride booking on Bookmee has been confirmed!"
	htmlBytes, err := os.ReadFile("emailtemplates/general_email.html")
	if err != nil {
		return fmt.Errorf("failed to read HTML template file: %v", err)
	}

	htmlTemplate := string(htmlBytes)

	htmlBody := strings.ReplaceAll(htmlTemplate, "{{.Name}}", name)
	htmlBody = strings.ReplaceAll(htmlBody, "{{.Subject}}", subject)

	m := gomail.NewMessage()
	m.SetHeader("From", senderUserName)
	m.SetHeader("To", recieverEmail)
	m.SetHeader("Subject", "Ride Booking Confirmation!")
	m.SetBody("text/html", htmlBody)

	port, err := strconv.Atoi(smtpPortstr)
	if err != nil {
		return fmt.Errorf("invalid SMTP port: %v", err)
	}

	d := gomail.NewDialer(smtpHost, port, senderUserName, senderPassword)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("failed to send email: %v", err)
	}

	return nil
}



func RideBillNotification(name string, price float64 )error{


	smtpHost := config.Cfg.MAIL_HOST
	smtpPort := config.Cfg.MAIL_PORT
	senderUserName := config.Cfg.MAIL_USERNAME
	senderPassword := config.Cfg.MAIL_PASSWORD
	recieverEmail := config.Cfg.RECIEVER_EMAIL

	smtpPortstr := strconv.Itoa(smtpPort)

	if smtpHost == "" || smtpPortstr == "" || senderUserName == "" || senderPassword == "" {
		return fmt.Errorf("SMTP configuration must be set in the environment variables")
	}

	htmlBytes, err := os.ReadFile("emailtemplates/verification_email_bill.html")
	if err != nil {
		return fmt.Errorf("failed to read HTML template file: %v", err)
	}

	htmlTemplate := string(htmlBytes)
	htmlBody := strings.ReplaceAll(htmlTemplate, "{{.Name}}", name)
	priceStr := strconv.FormatFloat(price, 'f', 2, 64)
	htmlBody = strings.ReplaceAll(htmlBody, "{{.Price}}", priceStr)

	m := gomail.NewMessage()
	m.SetHeader("From", senderUserName)
	m.SetHeader("To", recieverEmail)
	m.SetHeader("Subject", "Ride Booking Bill Notification!")
	m.SetBody("text/html", htmlBody)

	port, err := strconv.Atoi(smtpPortstr)
	if err != nil {
		return fmt.Errorf("invalid SMTP port: %v", err)
	}

	d := gomail.NewDialer(smtpHost, port, senderUserName, senderPassword)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("failed to send email: %v", err)
	}

	return nil
}

func guestwelcomeNotification(name string, email string, password string) error {
	// SMTP configuration from environment variables
	fmt.Println(password)
	smtpHost := config.Cfg.MAIL_HOST
	smtpPort := config.Cfg.MAIL_PORT
	senderUserName := config.Cfg.MAIL_USERNAME
	senderPassword := config.Cfg.MAIL_PASSWORD
	receiverEmail := email

	smtpPortStr := strconv.Itoa(smtpPort)

	if smtpHost == "" || smtpPortStr == "" || senderUserName == "" || senderPassword == "" {
		return fmt.Errorf("SMTP configuration must be set in the environment variables")
	}

	// Email subject
	subject := "Welcome to <b>Bookmee!</b> Your guest account has been created."

	// Read HTML email template
	htmlBytes, err := os.ReadFile("emailtemplates/guest_creds_email.html")
	if err != nil {
		return fmt.Errorf("failed to read HTML template file: %v", err)
	}

	// Convert the template to a string
	htmlTemplate := string(htmlBytes)

	// Replace placeholders with actual values
	htmlBody := strings.ReplaceAll(htmlTemplate, "{{.Name}}", name)
	htmlBody = strings.ReplaceAll(htmlBody, "{{.Subject}}", subject)
	htmlBody = strings.ReplaceAll(htmlBody, "{{.Email}}", email)
	htmlBody = strings.ReplaceAll(htmlBody, "{{.Password}}", password)

	// Create a new email message
	m := gomail.NewMessage()
	m.SetHeader("From", senderUserName)
	m.SetHeader("To", receiverEmail)
	m.SetHeader("Subject", "Welcome to Bookmee!")
	m.SetBody("text/html", htmlBody)

	// Convert SMTP port string to integer
	port, err := strconv.Atoi(smtpPortStr)
	if err != nil {
		return fmt.Errorf("invalid SMTP port: %v", err)
	}

	// Set up the SMTP dialer
	d := gomail.NewDialer(smtpHost, port, senderUserName, senderPassword)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	// Send the email
	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("failed to send email: %v", err)
	}

	return nil
}
