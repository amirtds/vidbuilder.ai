#!/bin/bash

echo "🎬 AI Video Generator - Starting..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p uploads output temp
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo ""
fi

# Start the server
echo "🚀 Starting server..."
echo ""
echo "Server will be available at: http://localhost:3000"
echo "Test client available at: file://$(pwd)/client.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
