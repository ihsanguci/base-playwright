FROM mcr.microsoft.com/playwright:v1.57.0

ENV CI=true
ENV NODE_ENV=production

WORKDIR /app

# Install dependencies (cache friendly)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Ensure browsers & deps (safety)
RUN npx playwright install --with-deps

# Prepare directories
RUN mkdir -p /app/allure-results /app/playwright-report /app/test-results && \
    chown -R pwuser:pwuser /app

USER pwuser

# Use entrypoint instead of CMD (important for flexibility)
ENTRYPOINT ["npx", "playwright", "test"]