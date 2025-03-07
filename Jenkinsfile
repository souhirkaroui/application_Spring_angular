pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
               git branch: 'main', credentialsId: 'github', url: 'git@github.com:souhirkaroui/ProjetFLSGTC.git'
               sh 'ls -lah'  // Vérifier si le code est bien cloné
             }
        }
        // Continuous Integration
        stage('Build Backend') {
            steps {
                script {
                    dir('Authentifcation_Verif_Email') {
                        
                       // sh 'mvn clean install -U'
                        sh 'mvn clean package -DskipTests=true'
                    }
                }       
            }
        }
        
        stage('Test Backend') {
            steps {
                script {
                    dir('Authentifcation_Verif_Email') {
                        sh 'mvn test'
                    }
                }
            }
        }

        stage('Docker Build & Push Frontend') {
            steps {
                script {
                    dir('frontend-application') {
                        withDockerRegistry(credentialsId: 'docker', url: "") {
                            sh 'docker build -t souhirkaroui/frontend-application .'
                            sh 'docker tag souhirkaroui/frontend-application souhirks/frontend'
                            sh 'docker push souhirks/frontend'
                        }
                    }
                    sh 'docker image prune -f' // Nettoyage des anciennes images
                }
            }
        }

        stage('Docker Build & Push Backend') {
            steps {
                script {
                    dir('Authentifcation_Verif_Email') {
                        withDockerRegistry(credentialsId: 'docker', url: "") {
                            sh 'docker build -t souhirkaroui/authentifcation_verif_email .'
                            sh 'docker tag souhirkaroui/authentifcation_verif_email souhirks/backend'
                            sh 'docker push souhirks/backend'
                        }
                    }
                    sh 'docker image prune -f' // Nettoyage des anciennes images
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) { 
                    script {
                        sh 'kubectl apply -f namespace.yml'
                        sh 'kubectl apply -f backenddeploy.yml'
                        sh 'kubectl apply -f frontdeploy.yml'
                        sh 'kubectl apply -f ingress.yaml'
                        
                        // Vérification du déploiement
                        sh 'kubectl rollout status deployment backend-deployment'
                        sh 'kubectl rollout status deployment frontend-deployment'
                    }
                }
            }
        }
    }
}
