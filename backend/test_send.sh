#!/bin/bash
# Simple test script to POST a contact to local server
# Usage: ./test_send.sh

URL="http://localhost:5001/contact"

curl -s -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"recipient@example.com","phone":"1234567890","message":"Hello from test script"}' \
  -w "\nHTTP STATUS: %{http_code}\n" \
  | tee response.json

echo "Response saved to response.json"