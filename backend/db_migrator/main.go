package main

import (
	// "AiportTaxi/config"
	// "AiportTaxi/db_migrator/migrator"
	"flag"
	"fmt"
	"log"
	"os"
	"strconv"

	// migrator "fusioniqx/db_migrator/migrator"

	"github.com/CapregSoft/project-airport-taxi/config"
	"github.com/CapregSoft/project-airport-taxi/db_migrator/migrator"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func main() {
	err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Could not load config: %s", err)
	}
	file, err := os.OpenFile("schema.sql", os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		log.Fatal(err)
	}
	config.Cfg.Writer = file
	psqlInfo := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s", config.Cfg.PG_USER, config.Cfg.PG_PASSWORD, config.Cfg.PG_HOST, strconv.Itoa(config.Cfg.PG_PORT), config.Cfg.PG_DB, config.Cfg.SSL_MODE)
	log.Println(psqlInfo)
	conn, err := sqlx.Connect("postgres", psqlInfo)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	err = conn.Ping()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	} else {
		log.Println("Connected")
	}
	defer conn.Close()
	migrations(conn)

	// dumpErr := migrator.Dump()
	// if dumpErr != nil {
	// 	log.Fatal(dumpErr)
	// }
}

func migrations(conn *sqlx.DB) {
	migration := flag.String("migration", "", "up - For doing up migration, down - For doing down migration")
	count := flag.Int("count", 0, "Number of migrations to run")
	flag.Parse()
	if *count <= 0 {
		*count++
	}
	migrator := migrator.ProvideMigrator(conn.DB, *migration, *count)
	_, err := migrator.RunMigrations()
	if err != nil {
		log.Fatal(err)
	}
}
