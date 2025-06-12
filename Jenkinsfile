pipeline {
    agent any

    tools {
        jdk 'jdk21'
    }

    environment {
        SCANNER_HOME = tool 'Sonar-scanner'
    }

    stages {
        stage('Git checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/nikes303/simple_games.git'
            }
        }

        stage('Sonarqube Analysis') {
            steps {
                bat """
                ${SCANNER_HOME}/bin/Sonar-Scanner ^
                -Dsonar.projectName=games ^
                -Dsonar.host.url=http://localhost:9000 ^
                -Dsonar.login=squ_ce1917f1fc0a7ffc00865816a54adb4bf5d2b476 ^
                -Dsonar.java.binaries=. ^
                -Dsonar.projectKey=gameskey
                """
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '-scan .', odcInstallation: 'DP'
                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }

        stage("Docker Build & Push"){
            steps{
                script{
                    withDockerRegistry(credentialsId: 'docker') {
                        bat "docker build -t simple-games-app ."
                        bat "docker tag restaurant:latest nikes303/simple-games-app:latest"
                        bat "docker push nikes303/simple-games-app:latest"
                    }
                }
            }
        }
        stage('Trivy Docker Scan'){
            steps{
                bat "trivy image nikes303/simple-games-app:latest"
            }
        }
        stage("Docker deploy (on Agent)") {
     steps {
        script {
            withDockerRegistry(credentialsId: 'docker') {
                bat "docker run -d --name simple-games-app -p 4000:4000 nikes303/simple-games-app:latest"

            }
        }
    }
}

    }
    post {
        always {
            echo 'Pipeline finished.'
        }
    }

}
