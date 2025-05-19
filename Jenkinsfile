pipeline {
    agent any

    environment {
        APP_NAME = 'api-gateway'
        REPO_URL = 'https://github.com/FernandoEmilianoFloresDeLaRiva/api-gateway'
        SSH_CRED_ID = 'ssh-key-ec2'
        EC2_USER = 'ubuntu'
        REMOTE_PATH = '/home/ubuntu/api-gateway'
    }

    stages {
        stage('Setup Environment') {
            steps {
                script {
                    def branch = env.GIT_BRANCH
                    if (!branch) {
                        env.DEPLOY_ENV = 'none'
                        echo "No se detectó rama, no se desplegará."
                        return
                    }
                    branch = branch.replaceAll('origin/', '')
                    echo "Rama detectada: ${branch}"

                    switch(branch) {
                        case 'master':
                            env.DEPLOY_ENV = 'production'
                            env.EC2_IP = '52.200.251.120'
                            env.NODE_ENV = 'production'
                            env.AUTH_HOST = '3.230.217.180'
                            env.AUTH_PORT = '3000'
                            env.NOTE_HOST = '107.22.77.233'
                            env.NOTE_PORT = '3000'
                            break
                        case 'dev':
                            env.DEPLOY_ENV = 'development'
                            env.EC2_IP = '3.222.136.111'
                            env.NODE_ENV = 'development'
                            env.AUTH_HOST = '44.205.201.108'
                            env.AUTH_PORT = '3000'
                            env.NOTE_HOST = '44.210.28.87'
                            env.NOTE_PORT = '3000'
                            break
                        case 'qa':
                            env.DEPLOY_ENV = 'qa'
                            env.EC2_IP = '34.194.76.73'
                            env.NODE_ENV = 'qa'
                            env.AUTH_HOST = '3.227.65.63'
                            env.AUTH_PORT = '3000'
                            env.NOTE_HOST = '52.45.170.88'
                            env.NOTE_PORT = '3000'
                            break
                        default:
                            env.DEPLOY_ENV = 'none'
                            echo "No hay despliegue configurado para esta rama: ${branch}"
                    }
                }
            }
        }

        // stage('Checkout') {
        //     when {
        //         expression { env.DEPLOY_ENV != 'none' }
        //     }
        //     steps {
        //         git branch: env.GIT_BRANCH.replaceAll('origin/', ''), url: "${REPO_URL}"
        //     }
        // }

        // stage('Build') {
        //     when {
        //         expression { env.DEPLOY_ENV != 'none' }
        //     }
        //     steps {
        //         sh 'rm -rf node_modules'
        //         sh 'npm ci'
        //         sh 'npm run build'
        //     }
        // }

        stage('Deploy') {
            when {
                expression { env.DEPLOY_ENV != 'none' }
            }
            steps {
                script {
                    withCredentials([
                        sshUserPrivateKey(credentialsId: SSH_CRED_ID, keyFileVariable: 'SSH_KEY'),
                    ]) {
                        sh 'chmod +x ./deploy.sh'    
                        def branchName = env.GIT_BRANCH.replaceAll('origin/', '')
                        sh """
                        SSH_KEY=\$SSH_KEY \
                        EC2_USER=\$EC2_USER \
                        EC2_IP=\$EC2_IP \
                        REMOTE_PATH=\$REMOTE_PATH \
                        REPO_URL=\$REPO_URL \
                        APP_NAME=\$APP_NAME \
                        NODE_ENV=\$NODE_ENV \
                        GIT_BRANCH=${branchName} \
                        AUTH_HOST=\$AUTH_HOST \
                        AUTH_PORT=\$AUTH_PORT \
                        NOTES_HOST=\$NOTE_HOST \
                        NOTES_PORT=\$NOTE_PORT \
                        ./deploy.sh
                        """
                    }
                    
                }
            }
        }
    }

    post {
        success {
            echo "Despliegue exitoso en ${env.DEPLOY_ENV}"
        }
        failure {
            echo "El despliegue en ${env.DEPLOY_ENV} ha fallado"
        }
    }
}
