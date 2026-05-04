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
                rm -rf allure-results allure-report || true
                mkdir -p allure-results
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
                    script {

                        def cmd = ""

                        if (params.TEST_SCOPE == 'all') {
                            cmd = "npx playwright test"
                        }

                        if (params.TEST_SCOPE == 'file') {
                            cmd = "npx playwright test ${params.TEST_VALUE}"
                        }

                        if (params.TEST_SCOPE == 'tag') {
                            cmd = "npx playwright test --grep ${params.TEST_VALUE}"
                        }

                        sh """
                        docker run --rm \
                          -v \$(pwd)/allure-results:/app/allure-results \
                          -e BASE_URL=${BASE_URL} \
                          -e HEADLESS=${params.HEADLESS} \
                          -e USER_SAUCEDEMO=$USER_SAUCEDEMO \
                          -e PASSWORD_SAUCEDEMO=$PASSWORD_SAUCEDEMO \
                          playwright-test ${cmd}
                        """
                    }
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
        }
        success {
            echo 'SUCCESS ✅'
        }
        failure {
            echo 'FAILED ❌'
        }
    }
}