FROM mcr.microsoft.com/playwright:v1.57.0

# Jangan set NODE_ENV=production di sini: npm ci akan melewati devDependencies
# (termasuk @playwright/test). Browser sudah tersedia di base image ini.
ENV CI=true

WORKDIR /app

# Install dependencies (cache friendly)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Prepare directories
RUN mkdir -p /app/allure-results /app/playwright-report /app/test-results /app/playwright/.auth && \
    chown -R pwuser:pwuser /app

USER pwuser

# Use entrypoint instead of CMD (important for flexibility)
ENTRYPOINT ["npx", "playwright", "test"]
