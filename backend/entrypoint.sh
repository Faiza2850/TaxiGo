#!/bin/bash
set -e

# Run the PostgreSQL server
# docker-entrypoint.sh postgres &

echo "running migration"

go run db_migrator/main.go -migration up

echo "Migrations applied"

# Keep the container running
wait