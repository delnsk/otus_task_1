$ErrorActionPreference = "Stop"

Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host "Installing dependencies..."
npm install

Write-Host "Starting backend and frontend..."
npm run dev
