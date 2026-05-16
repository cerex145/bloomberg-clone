#!/bin/bash

# Bloomberg Clone - Setup Script
# Instala y levanta toda la plataforma

set -e

echo "🚀 Bloomberg Clone - Setup"
echo "=========================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker no está corriendo. Inicia Docker Desktop o el demonio de Docker."
    exit 1
fi

# Install dependencies
echo "📦 Instalando dependencias del cliente..."
cd client
npm install
cd ..

echo "📦 Instalando dependencias del servidor..."
cd server
npm install
cd ..

# Start Docker services
echo ""
echo "🐘 Levantando PostgreSQL y Redis..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Esperando que PostgreSQL esté listo..."
sleep 5

echo ""
echo "✅ Setup completado!"
echo ""
echo "📝 Para ejecutar la aplicación:"
echo "   Terminal 1: cd server && npm run dev"
echo "   Terminal 2: cd client && npm run dev"
echo ""
echo "🌐 Accede a http://localhost:5173"
echo ""
echo "ℹ️  Para detener los servicios: docker-compose down"
