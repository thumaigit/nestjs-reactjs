#!/bin/bash

# Start the backend
echo "Starting backend..."
cd backend
npm run start:dev &
BACKEND_PID=$!

# Start the frontend
echo "Starting frontend..."
cd ../frontend
npm start &
FRONTEND_PID=$!

# Start the database viewer
echo "Starting database viewer..."
cd ../backend
npm run database:view &
DATABASE_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID $DATABASE_PID