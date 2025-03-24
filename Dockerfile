# Use Node 18
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build the Next.js application
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Environment variables
ENV NODE_ENV production
ENV PORT 8080

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]