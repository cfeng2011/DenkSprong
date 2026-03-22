# Stage 1: Build the frontend
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production runtime (static server only)
FROM node:20-slim

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built frontend from stage 1
COPY --from=build /app/dist ./dist

# Copy server
COPY server.js .

EXPOSE 10000

CMD ["node", "server.js"]
