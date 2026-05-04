# Stage 1: Build
FROM mcr.microsoft.com/playwright:v1.57.0-focal AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Stage 2: Runtime
FROM mcr.microsoft.com/playwright:v1.57.0-focal

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy source code
COPY . .

# Install Playwright browsers (if not already installed)
RUN npx playwright install --with-deps

# Set environment variables
ENV CI=true
ENV HEADLESS=true
ENV NODE_ENV=production

# Default command to run tests
CMD ["npx", "playwright", "test"]
