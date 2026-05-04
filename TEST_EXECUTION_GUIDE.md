# Playwright Test Execution Guide

Dokumentasi lengkap untuk menjalankan Playwright tests dengan berbagai kombinasi.

---

## 📋 Quick Start

```bash
# Run semua tests
npx playwright test

# Run dengan HTML report
npx playwright test --reporter=html

# Run di mode headed (bisa liat browser)
npx playwright test --headed

# Run single file
npx playwright test Login.spec.ts
```

---

## 🏷️ Running Tests by Tags

### Single Tag

```bash
# Run hanya positive tests
npx playwright test --grep "Positive"

# Run hanya negative tests
npx playwright test --grep "Negative"

# Run test case specific
npx playwright test --grep "TC001"
```

### Multiple Tags (OR - salah satu terpenuhi)

```bash
# Run test yang punya @Positive ATAU @TC001
npx playwright test --grep "@Positive|@TC001"

# Run test TC001 ATAU TC002 ATAU TC003
npx playwright test --grep "TC001|TC002|TC003"

# Run semua test case di 100-106 range
npx playwright test --grep "TC10[0-6]"
```

### Exclude Tags (NOT)

```bash
# Run semua EXCEPT negative tests
npx playwright test --grep "^(?!.*Negative)"

# Run semua EXCEPT TC001
npx playwright test --grep "^(?!.*TC001)"
```

---

## 📁 Running Tests by File

```bash
# Run hanya Login tests
npx playwright test Login.spec.ts

# Run hanya Checkout tests
npx playwright test Checkout.spec.ts

# Run multiple files
npx playwright test Login.spec.ts Checkout.spec.ts

# Run dengan pattern
npx playwright test tests/e2e/*.spec.ts

# Run hanya test folder tertentu
npx playwright test tests/e2e/
```

---

## ⚡ Parallel Workers Configuration

### Set Number of Workers

```bash
# Run dengan 1 worker (serial/sequential)
npx playwright test --workers=1

# Run dengan 2 workers (parallel)
npx playwright test --workers=2

# Run dengan 4 workers (parallel)
npx playwright test --workers=4

# Run dengan max workers (semua cores)
npx playwright test --workers=0

# Run dengan specific worker (default: 1 per physical core)
PLAYWRIGHT_WORKERS=2 npx playwright test
```

### Recommended Worker Configurations

```bash
# Development (fast feedback)
npx playwright test --workers=1

# CI Pipeline (balance speed & stability)
npx playwright test --workers=2

# Aggressive parallel (fast execution)
npx playwright test --workers=4

# Max resources (untuk powerful machines)
npx playwright test --workers=0
```

---

## 📊 Reporter Options

### Single Reporter

```bash
# List reporter (default, simple output)
npx playwright test --reporter=list

# HTML reporter (interactive report)
npx playwright test --reporter=html

# JSON reporter (machine readable)
npx playwright test --reporter=json

# JUnit reporter (CI/CD integration)
npx playwright test --reporter=junit

# GitHub reporter (GitHub Actions)
npx playwright test --reporter=github

# Verbose reporter (detailed output)
npx playwright test --reporter=verbose
```

### Multiple Reporters

```bash
# HTML + List
npx playwright test --reporter=html --reporter=list

# HTML + JSON
npx playwright test --reporter=html --reporter=json

# JSON + JUnit (untuk CI)
npx playwright test --reporter=json --reporter=junit
```

### Reporter Output Path

```bash
# Specify HTML report path
npx playwright test --reporter=html=my-report.html

# Specify JSON output
npx playwright test --reporter=json=results.json

# Specify JUnit output
npx playwright test --reporter=junit=results.xml
```

---

## 🎯 Common Combinations

### Development Workflow

```bash
# Quick test dengan 1 worker (feedback cepat)
npx playwright test --workers=1

# Run specific tag dengan report
npx playwright test --grep "TC001" --reporter=html --headed

# Run single file dengan headed mode
npx playwright test Login.spec.ts --headed

# Run Positive tests serial
npx playwright test --grep "Positive" --workers=1
```

### Debugging Workflow

```bash
# Run dengan headed mode (lihat browser)
npx playwright test --headed

# Run dengan headed + serial (fokus 1 test)
npx playwright test --headed --workers=1

# Run single test case
npx playwright test -g "TC001" --headed

# Run dengan debug mode (step by step)
npx playwright test --debug

# Run dengan trace (record semua action)
npx playwright test --trace=on
```

### CI/CD Pipeline

```bash
# Full test dengan report
npx playwright test --reporter=html --reporter=junit

# Aggressive parallel
npx playwright test --workers=4

# Multiple reporters + JSON
npx playwright test --reporter=html --reporter=json=results.json

# Specific tag + parallel + report
npx playwright test --grep "Positive" --workers=2 --reporter=html
```

### Tag-based Execution

```bash
# Login tests positive
npx playwright test Login.spec.ts --grep "TC001"

# Checkout tests negative
npx playwright test Checkout.spec.ts --grep "Negative"

# All positive tests parallel
npx playwright test --grep "Positive" --workers=2

# All negative tests serial
npx playwright test --grep "Negative" --workers=1

# Specific range: TC006-TC010 (checkout tests)
npx playwright test --grep "TC00[6-9]|TC010"
```

---

## 🔍 Advanced Options

### Retry Configuration

```bash
# Run dengan retry (default via config)
npx playwright test

# Override retry count
npx playwright test --retries=3

# No retry
npx playwright test --retries=0
```

### Timeout Configuration

```bash
# Global timeout per test (ms)
npx playwright test --timeout=30000

# Global timeout 10 seconds
npx playwright test --timeout=10000
```

### Headed vs Headless

```bash
# Run headless (default)
npx playwright test

# Run headed (browser visible)
npx playwright test --headed

# Run headed untuk specific file
npx playwright test Checkout.spec.ts --headed

# Run headed + serial untuk debugging
npx playwright test --headed --workers=1
```

### Browser Selection

```bash
# Run specific browser
npx playwright test --project=chromium

# Run multiple browsers (dari config)
npx playwright test

# List available projects
npx playwright test --list
```

---

## 📈 Complete Examples

### Example 1: Development - Quick Feedback
```bash
npx playwright test --grep "TC006" --workers=1 --headed --reporter=list
```
**Hasil**: Jalankan TC006 saja, single worker, bisa lihat browser, output simple

---

### Example 2: Full Regression - Positive Tests Only
```bash
npx playwright test --grep "Positive" --workers=2 --reporter=html
```
**Hasil**: Jalankan semua positive tests, 2 workers parallel, HTML report

---

### Example 3: Checkout Feature Complete Test
```bash
npx playwright test Checkout.spec.ts --workers=4 --reporter=html --reporter=json=results.json
```
**Hasil**: Jalankan semua checkout tests, 4 workers, HTML + JSON report

---

### Example 4: CI Pipeline - Full Test
```bash
npx playwright test --reporter=html --reporter=junit --workers=2
```
**Hasil**: Jalankan semua tests, 2 workers, HTML + JUnit report (untuk CI)

---

### Example 5: Debugging Single Test
```bash
npx playwright test --grep "TC002" --headed --workers=1 --timeout=60000
```
**Hasil**: Debug TC002, headed mode, serial, 60 detik timeout

---

### Example 6: Multiple Tags Test
```bash
npx playwright test --grep "TC001|TC002|TC003|TC006|TC007" --workers=2 --reporter=html
```
**Hasil**: Jalankan 5 test case spesifik, 2 workers, HTML report

---

### Example 7: All Tests Except Negative
```bash
npx playwright test --grep "^(?!.*Negative)" --workers=4 --reporter=list
```
**Hasil**: Skip semua negative tests, 4 workers, list output

---

### Example 8: Performance Testing
```bash
npx playwright test --workers=0 --reporter=html
```
**Hasil**: Max parallelism untuk test speed benchmark

---

## 🛠️ Useful Commands

```bash
# List all tests (dry run)
npx playwright test --list

# List tests dari file specific
npx playwright test Login.spec.ts --list

# Show available projects
npx playwright test --list --project=chromium

# Run with env variable
ENV=staging npx playwright test

# Kill hanging tests
pkill -f "playwright"
```

---

## 📝 Tag Reference

**Login Tests:**
- `@TC001` - Login with valid credentials (Positive)
- `@TC002` - Login fails with wrong username (Negative)
- `@TC003` - Login fails with wrong password (Negative)
- `@TC004` - Login fails without username (Negative)
- `@TC005` - Login fails without password (Negative)

**Checkout Tests:**
- `@TC006` - Complete checkout with valid info (Positive)
- `@TC007` - Checkout with product in cart (Positive)
- `@TC008` - Checkout fails without first name (Negative)
- `@TC009` - Checkout fails without last name (Negative)
- `@TC010` - Checkout fails without postal code (Negative)

**Products Tests:**
- `@TC011` - Display products list (Positive)
- `@TC012` - Display 6 products by default (Positive)
- `@TC013` - Add product to cart (Positive)
- `@TC014` - Add multiple products to cart (Positive)
- `@TC015` - Sort products by name A to Z (Positive)
- `@TC016` - Sort products by name Z to A (Positive)
- `@TC017` - Sort products by price low to high (Positive)
- `@TC018` - Sort products by price high to low (Positive)
- `@TC019` - Remove product from cart (Positive)
- `@TC020` - Add and remove multiple products (Positive)

**Product Detail Tests:**
- `@TC021` - Open product detail page (Positive)
- `@TC022` - Display product information (Positive)
- `@TC023` - Add product to cart from detail page (Positive)
- `@TC024` - Back to products from detail page (Positive)
- `@TC025` - Open multiple product details (Positive)
- `@TC026` - Add multiple products from detail pages (Positive)

---

## 📊 Workers vs Speed

| Workers | Speed | Stability | Use Case |
|---------|-------|-----------|----------|
| 1 | Slow | Very Stable | Debugging, Development |
| 2 | Fast | Stable | Standard CI/CD |
| 4 | Very Fast | Good | Powerful CI Servers |
| 0 | Fastest | Risk | Performance Testing |

---

## 🎓 Best Practices

1. **Development**: Gunakan `--workers=1 --headed` untuk debugging
2. **CI Pipeline**: Gunakan `--workers=2` untuk balance speed & stability
3. **Reporting**: Selalu gunakan `--reporter=html` untuk detailed analysis
4. **Multiple Reporters**: HTML untuk human, JSON untuk automation
5. **Tag Filtering**: Gunakan untuk faster feedback loop
6. **Timeout**: Increase untuk API-heavy tests, decrease untuk simple UI tests

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process menggunakan port
npx playwright test --workers=1
```

### Memory Issues
```bash
# Reduce workers jika RAM terbatas
npx playwright test --workers=1
```

### Tests Hanging
```bash
# Increase timeout
npx playwright test --timeout=60000

# Kill all playwright processes
pkill -f "playwright"
```

### Debugging Test Failures
```bash
# Run dengan headed mode
npx playwright test --headed

# Run dengan debug mode (interactive)
npx playwright test --debug

# Run specific test dengan trace
npx playwright test TC001 --trace=on --headed
```

---

## 📚 References

- [Playwright Test Docs](https://playwright.dev/docs/intro)
- [Command Line Usage](https://playwright.dev/docs/test-cli)
- [Test Configuration](https://playwright.dev/docs/test-configuration)

---

**Last Updated**: 2024
**Playwright Version**: 1.57.0
