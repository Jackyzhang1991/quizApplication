angular
    .module('quizApp')
    .controller('quizCtrl', quizCtrl);

quizCtrl.$inject = ['$scope', '$http', 'dataStorageService', 'routeService'];

function quizCtrl ($scope, $http, dataStorageService, routeService) {
    $scope.buttons = dataStorageService.getButtons();
    $scope.quizName = $scope.buttons[0];           //default value
    $scope.correctNum = 0;

    $scope.loadQuiz = function (name) {
        var input = "data/" + name + ".json";
        dataStorageService.resetData();
        $http.get(input)
            .then(function (res) {
                $scope.quiz = res.data.quiz;
                $scope.questions = res.data.questions;
                $scope.totalItems = $scope.questions.length;
                $scope.currentPage = 1;
                $scope.mode = 'quiz';
                $scope.$watch('currentPage', function () {
                    var begin = ($scope.currentPage - 1),
                        end = begin + 1;
                    $scope.filteredQuestions = $scope.questions.slice(begin, end);
                });
            });
    };
    $scope.loadQuiz($scope.quizName);

    $scope.route = function (state) {
        routeService.route(state);
    };

    $scope.choosePrevImg = function (index) {
        if (index != 1) {
            return 'img/prev.jpg';
        } else {
            var myEl = angular.element(document.querySelector('.prevButton'));
            myEl.css('cursor','default');
            return 'img/prevDisable.jpg';
        }
    };

    $scope.chooseNextImg = function (index) {
        if (index != $scope.questions.length) {
            return 'img/next.jpg';
        } else {
            var myEl = angular.element(document.querySelector('.nextButton'));
            myEl.css('cursor','default');
            return 'img/nextDisable.jpg';
        }
    };

    $scope.goTo = function (index) {
        if (index > 0 && index <= $scope.totalItems) {
            $scope.currentPage = index;
            $scope.mode = 'quiz';
        }
    };

    $scope.checkIfExists = function (id) {
        var selected = dataStorageService.getOption();
        if (selected[Math.floor((id - 1) / 4 + 1)] != undefined) {
            if (selected[Math.floor((id - 1) / 4 + 1)].Id === id) {
                var optionSelect = angular.element(document.getElementById(id));
                optionSelect.css('background-color','lightblue');
                optionSelect.css('cursor','default');
            }
        }
    };

    $scope.onSelect = function (question, option) {
        angular.element(document.getElementsByClassName("choice-box")).removeAttr('style');
        dataStorageService.addOption(option);
        if (question.QuestionTypeId == 1) {
            question.Options.forEach(function (element, index, array) {
                if (element.Id != option.Id) {
                    element.Selected = false;
                } else {
                    element.Selected = true;
                }
            });
        }
    };

    function countTrue(answers) {
        return answers.filter(Boolean).length;
    }

    $scope.onSubmit = function () {
        $scope.options = dataStorageService.getOption();
        dataStorageService.addQuestions($scope.questions);
        var answers = [];
        for (var ii = 1; ii < 4; ii++) {
            if ($scope.options[ii] === undefined) {
                answers.push(false);
            } else if ($scope.options[ii].IsAnswer === true) {
                answers.push(true);
            } else {
                answers.push(false);
            }
        }
        $scope.score = countTrue(answers);
        $scope.correctRate = Math.round($scope.score/$scope.questions.length * 100) + '%';
        dataStorageService.addScore(countTrue(answers));
        dataStorageService.addCorrectRate(Math.round($scope.score/$scope.questions.length * 100) + '%');
    };

    $scope.isAnswered = function (index) {
        var answered = 'Not Answered';
        $scope.questions[index].Options.forEach(function (element, index, array) {
            if (element.Selected == true) {
                answered = 'Answered';
                return false;
            }
        });
        return answered;
    };
}

