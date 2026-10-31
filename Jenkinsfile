pipeline {
    agent any

    parameters {
        choice(
            name: 'TEST_SCOPE',
            choices: ['all', 'file', 'tag'],
            description: 'Pilih jenis eksekusi test'
        )
        string(
            name: 'TEST_VALUE',
            defaultValue: '',
            description: 'Isi nama file atau tag (@smoke)'
        )
        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run browser headless'
        )
    }

    environment {
        BASE_URL = 'https://www.saucedemo.com/'
    }

    triggers {
        // Scheduler (bisa diubah)
        cron('H 1 * * *') // tiap hari jam random sekitar 1 pagi
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Clean Workspace') {
            steps {
                sh '''
                rm -rf allure-results allure-report playwright-report test-results || true
                mkdir -p allure-results playwright-report test-results
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t playwright-test .
                '''
            }
        }

        stage('Run Playwright Test') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'saucedemo-login',
                        usernameVariable: 'USER_SAUCEDEMO',
                        passwordVariable: 'PASSWORD_SAUCEDEMO'
                    )
                ]) {
                    // Pakai ''' (bukan """) supaya Groovy tidak menginterpolasi secret / input user.
                    // Semua nilai dibaca shell dari env var. ENTRYPOINT image sudah "npx playwright test",
                    // jadi di sini cukup kirim argumennya saja.
                    sh '''
                    set -e
                    case "$TEST_SCOPE" in
                      file) set -- "$TEST_VALUE" ;;
                      tag)  set -- --grep "$TEST_VALUE" ;;
                      *)    set -- ;;
                    esac

                    docker run --rm \
                      -v "$(pwd)/allure-results:/app/allure-results" \
                      -v "$(pwd)/playwright-report:/app/playwright-report" \
                      -v "$(pwd)/test-results:/app/test-results" \
                      -e BASE_URL \
                      -e HEADLESS \
                      -e USER_SAUCEDEMO \
                      -e PASSWORD_SAUCEDEMO \
                      playwright-test "$@"
                    '''
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh '''
                allure generate allure-results --clean -o allure-report
                '''
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
            // HTML report + trace/screenshot/video dari test yang gagal
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }
        success {
            echo 'SUCCESS ✅'
        }
        failure {
            echo 'FAILED ❌'
        }
    }
}