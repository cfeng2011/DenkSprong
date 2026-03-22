# Stage 1: Build the frontend
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production runtime with Ollama
FROM node:20-slim

# Install curl (needed for Ollama install + health checks)
RUN apt-get update && \
    apt-get install -y curl zstd && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Pre-pull the model during build so it's baked into the image
RUN ollama serve & \
    sleep 5 && \
    ollama pull qwen2.5:0.5b && \
    pkill ollama

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built frontend from stage 1
COPY --from=build /app/dist ./dist

# Copy server and startup script
COPY server.js .
COPY start.sh .
RUN chmod +x start.sh

EXPOSE 10000

CMD ["./start.sh"]
