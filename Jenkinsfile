pipeline {
    agent {
    node {
    label 'linuxworker1'
        }
    }  
    
    environment {        
        CURRENTBUILD_DISPLAYNAME = "fs-open-forest-platform Build #$BUILD_NUMBER"
        CURRENT_BUILDDESCRIPTION = "fs-open-forest-platform Build #$BUILD_NUMBER"
  //      GITHUB_URL = credentials('GITHUB_URL')
	//GITHUB_API_URL=credentials('GITHUB_API_URL')
        //GITHUB_CREDENTIAL = credentials('GITHUB_CREDENTIAL')
  //      BRANCH_NAME = $GIT_BRANCH
        //SONAR_LOGIN = credentials('SONAR_LOGIN')
        SONAR_HOST = credentials('SONAR_HOST')
	SONAR_TOKEN = credentials('SONAR_TOKEN_FSOPENFOREST')    
        // SONAR_SCANNER_PATH = 
        SONAR_PROJECT_NAME = "fs-openforest-platform"
        MAILING_LIST = "ikumarasamy@techtrend.us, mahfuzur.rahman@usda.gov"
	CHECKOUT_STATUS = 'Pending'
        INSTALL_DEPENDENCIES_STATUS= 'Pending'
	RUN_LINT_STATUS = 'Pending'
	RUN_UNIT_TESTS_STATUS = 'Pending'
	RUN_E2E_STATUS = 'Pending'
	RUN_PA11Y_STATUS = 'Pending'	    
	DEPLOY_STATUS = 'Pending'	       	
	RUN_SONARQUBE_STATUS = 'Pending'	    
	
	REPO_NAME="fs-open-forest-platform"
	REPO_OWNER_NAME="USDAForestService"
        JOB_NAME="fs-open-forest-platform-dev"
        JENKINS_URL="https://jenkins.fedgovcloud.us"
   	BASIC_AUTH_PASS=credentials('BASIC_AUTH_PASS')
	BASIC_AUTH_USER=credentials('BASIC_AUTH_USER')
	CF_USERNAME = credentials('CF_USERNAME')
        CF_PASSWORD = credentials('CF_PASSWORD')  
	
        
    }
    
    options {
        timestamps()
        disableConcurrentBuilds()
        ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }  

 stages { 
	  
    stage('Checkout Code'){
       steps {              
                script {
                  currentBuild.displayName = "${env.CURRENTBUILD_DISPLAYNAME}"
                  currentBuild.description = "${env.CURRENT_BUILDDESCRIPTION}"	     
  		  CHECKOUT_STATUS= 'Success'
                }      	     
	} 
	 post {
                failure {
			script {
        		CHECKOUT_STATUS= 'Failed'
        	   	sh 'echo "FAILED in stage checkout code"'
                }
            }	
    }
    }

    stage('install-dependencies'){
    steps {
	    script {
        		
        		sh 'echo "Install dependencies"'	
		    INSTALL_DEPENDENCIES_STATUS= 'Success'
    		}
        }
		post {
                failure {
			script {
        		INSTALL_DEPENDENCIES_STATUS= 'Failed'
        	   	sh 'echo "FAILED in stage install dependencies"'
    		}                 
                }
            }	
    }	  

stage('run tests')
	  {
      parallel{	  
	      
stage('run-unit-tests'){
    steps {
        script {
        sh 'echo "run-unit-tests"'
        RUN_UNIT_TESTS_STATUS= 'Success'
    }

        }
		post {
                failure {
                    script {
        		RUN_UNIT_TESTS_STATUS= 'Failed'
			      	sh 'echo "FAILED in stage unit tests"'
    		}
                }
            }	
    }
     

     stage('run-lint'){
    steps {	    
        script
        {
	        sh 'echo "run lint"'
	        RUN_LINT_STATUS= 'Success'
        }
	}
	post {
                failure {
                     script {
        		RUN_LINT_STATUS= 'Failed'
         	   	sh 'echo "FAILED in stage lint"'
    		}
                }
            }	
    }	


stage('run-sonarqube'){
        steps {
            script{
	            sh 'echo "run-sonarqube"'
		        RUN_SONARQUBE_STATUS= 'Success'
            }
    }
	post {
                failure {
                       script {
        		RUN_SONARQUBE_STATUS= 'Failed'
        	   	sh 'echo "FAILED in stage SonarQube"'
    		}
                }
            }	
   }  


stage('run-e2e'){
        steps {
            script {
	            sh 'echo "run-e2e"'
		        RUN_E2E_STATUS= 'Success'
            }
    }
	post {
                failure {
                       script {
        		RUN_E2E_STATUS= 'Failed'
        	   	sh 'echo "FAILED in stage e2e"'
    		}
                }
            }	
   }  

stage('run pa11y'){
    steps {
        script {
            sh 'echo "run pa11y"'
	        RUN_PA11Y_STATUS= 'Success'
        }
        } 
	post {
                failure {
			 script {
        		RUN_PA11Y_STATUS= 'Failed'
        	      sh 'echo "FAILED in stage pa11y"'
    		}                 
                }
            }	

	  }	      

     
      }
      }


 stage('dev-deploy'){
    steps {
        script {
            sh 'echo "dev-deploy"'	   
	        DEPLOY_STATUS= 'Success'
        }
        }
		post {
                failure {
                     script {
        		DEPLOY_STATUS= 'Failed'
        	      sh 'echo "FAILED in stage deploy"'
    		}          
                }
            }	
    }



 } 

 
post{
    success {
	    echo "Checkout Status ${CHECKOUT_STATUS}"  
	    echo "INSTALL_DEPENDENCIES_STATUS  ${INSTALL_DEPENDENCIES_STATUS}"  
	    echo "RUN_LINT_STATUS  ${RUN_LINT_STATUS}"  
	    echo "RUN_UNIT_TESTS_STATUS  ${RUN_UNIT_TESTS_STATUS}"  
	    echo "RUN_E2E_STATUS  ${RUN_E2E_STATUS}"  
	    echo "RUN_PA11Y_STATUS  ${RUN_PA11Y_STATUS}"  
	    echo "DEPLOY_STATUS  ${DEPLOY_STATUS}"  
	    echo "RUN_SONARQUBE_STATUS  ${RUN_SONARQUBE_STATUS}"  
	    script{
		    sh "echo ${BRANCH_NAME}"  
		    sh "echo ${CHANGE_AUTHOR}"  
		    sh "echo ${PROJECT_NAME}"  
		    
		    
		    
	    }

	    echo "Job Success"
	    emailext attachLog: true, attachmentsPattern: '', body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: Checkout-code ${CHECKOUT_STATUS} Check console output at $BUILD_URL to view the results.', replyTo: 'notifications@usda.gov', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'ikumarasamy@techtrend.us'
        }	
   	
    failure {
	    echo "Checkout Status ${CHECKOUT_STATUS}"  
	    echo "INSTALL_DEPENDENCIES_STATUS  ${INSTALL_DEPENDENCIES_STATUS}"  
	    echo "RUN_LINT_STATUS  ${RUN_LINT_STATUS}"  
	    echo "RUN_UNIT_TESTS_STATUS  ${RUN_UNIT_TESTS_STATUS}"  
	    echo "RUN_E2E_STATUS  ${RUN_E2E_STATUS}"  
	    echo "RUN_PA11Y_STATUS  ${RUN_PA11Y_STATUS}"  
	    echo "DEPLOY_STATUS  ${DEPLOY_STATUS}"  
	    echo "RUN_SONARQUBE_STATUS  ${RUN_SONARQUBE_STATUS}"  
	    echo "Job Failed"  	    
	    emailext attachLog: true, attachmentsPattern: '', body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: Checkout-code ${CHECKOUT_STATUS} Check console output at $BUILD_URL to view the results.', replyTo: 'notifications@usda.gov', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'ikumarasamy@techtrend.us'
        }	
    } 
 }
