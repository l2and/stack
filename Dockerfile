# Use Node 18
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and credentials
COPY . .

# If local, then use file system.
RUN mkdir -p src/config

# Build the Next.js application
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Environment variables
ENV NODE_ENV production
ENV PORT 8080

# Create directory for credentials
RUN mkdir -p src/config

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]