pipeline {
    agent any
    stages {
        // Continuous Integration
        stage('Build Backend && Build Frontend') {
            steps {
                script {
                 //   dir('Authentifcation_Verif_Email') {        
                       // sh 'mvn clean install -U'
                 //       sh 'sudo mvn clean package -DskipTests=true'
                //     }
                     dir('frontend-application') {    
                        sh 'export TERM=xterm && npm run build --prod'
                    }
                }       
            }
        }
        
        stage('Test Backend && Test Frontend') {
            steps {
                script {
                 //   dir('Authentifcation_Verif_Email') {
                 //       sh 'mvn test'
                  //  }
                     dir('frontend-application') {   
                        sh 'npm install -g http-server'
                        sh 'http-server -p 8080 -c-1 dist/frontend-application'
                    }
                }
            }
        }

        stage('Docker Build & Push Frontend') {
            steps {
                script {
                    dir('frontend-application') {
                        withDockerRegistry(credentialsId: 'docker', url: "") {
                            sh 'docker build -t souhirkaroui/application_Spring_angular/frontend-application .'
                            sh 'docker tag souhirkaroui/application_Spring_angular/frontend-application souhirks/frontend'
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
                            sh 'docker build -t souhirkaroui/application_Spring_angular/Authentifcation_Verif_Email .'
                            sh 'docker tag souhirkaroui/application_Spring_angular/Authentifcation_Verif_Email souhirks/backend'
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
