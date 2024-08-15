# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy remaining application code
COPY . .

# Set environment variables at build time
ARG NEXT_PUBLIC_PARSE_APPLICATION_ID
ARG NEXT_PUBLIC_PARSE_MASTER_KEY
ARG NEXT_PUBLIC_PARSE_CLIENT_KEY

# Build Next.js application
RUN NEXT_PUBLIC_PARSE_APPLICATION_ID=$NEXT_PUBLIC_PARSE_APPLICATION_ID \
    NEXT_PUBLIC_PARSE_MASTER_KEY=$NEXT_PUBLIC_PARSE_MASTER_KEY \
    NEXT_PUBLIC_PARSE_CLIENT_KEY=$NEXT_PUBLIC_PARSE_CLIENT_KEY \
    npm run build

# Stage 2: Create optimized production image
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment variables at runtime
ENV NEXT_PUBLIC_PARSE_APPLICATION_ID=$NEXT_PUBLIC_PARSE_APPLICATION_ID
ENV NEXT_PUBLIC_PARSE_MASTER_KEY=$NEXT_PUBLIC_PARSE_MASTER_KEY
ENV NEXT_PUBLIC_PARSE_CLIENT_KEY=$NEXT_PUBLIC_PARSE_CLIENT_KEY
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
