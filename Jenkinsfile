pipeline {
    agent {
    node {
    label 'linuxworker1'
        }
    }  

    options {
        timestamps()
        disableConcurrentBuilds()
        ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }  

  stages {     
  
    
       stage('Run Unit Tests'){
    steps {
        sh 'echo "Run Unit Tests"'
        }
    }
    
      stage('Run e2e'){
    steps {
        sh1 'echo "Run e2e"'
        }
    }

      stage('Run lint'){
    steps {
        sh 'echo "Run lint"'
        }
    }
    
          stage('Run Pa11y'){
    steps {
        sh 'echo "Run Pa11y"'
        }
    }


    
          stage('Dev Deploy'){
    steps {
        sh 'echo "Dev Deploy"'
        }
    }

  }
}
