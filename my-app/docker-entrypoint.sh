#!/bin/sh
set -e
echo "Running database migrations..."
npx sequelize-cli db:migrate
echo "Starting app..."
exec node server.js