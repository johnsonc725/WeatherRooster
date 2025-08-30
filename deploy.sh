#!/bin/bash

echo "🚀 Deploying Weather Rooster to GitHub Pages..."

# Build the app
echo "📦 Building the app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to GitHub Pages
    echo "🌐 Deploying to GitHub Pages..."
    npm run deploy
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "🌍 Your app should be live at: https://johnsonc725.github.io/WeatherRooster"
        echo "⏰ It may take a few minutes for changes to appear."
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
