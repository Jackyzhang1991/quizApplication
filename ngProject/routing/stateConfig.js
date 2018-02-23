angular.module('quizApp')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            // For any unmatched url, redirect to /home
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'templates/quiz.html',
                    controller: 'quizCtrl'
                })
                .state('result',{
                    url: '/result',
                    templateUrl: 'templates/result.html',
                    controller: 'resultCtrl'
                });
        }]);