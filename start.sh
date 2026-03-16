#!/bin/bash

# Start Ollama in the background
ollama serve &

# Wait for Ollama to be ready
echo "Waiting for Ollama to start..."
for i in $(seq 1 30); do
  if curl -s http://127.0.0.1:11434/api/tags > /dev/null 2>&1; then
    echo "Ollama is ready."
    break
  fi
  sleep 1
done

# Ensure the model is available (already pulled during build, this is a safety check)
ollama pull qwen2.5:0.5b

# Start the Express server
exec node server.js
