# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy remaining application code
COPY . .

# Build Next.js application
RUN npm run build

# Stage 2: Create optimized production image
FROM node:18-alpine AS runner

WORKDIR /app

# Environment variables for Next.js
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy build output from Stage 1
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expose correct port 3000 for Next.js
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
