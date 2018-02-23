angular
    .module('quizApp')
    .controller('resultCtrl', resultCtrl);

resultCtrl.$inject = ['$scope', 'dataStorageService'];

function resultCtrl ($scope, dataStorageService) {
    $scope.questions = dataStorageService.getQuestions();
    $scope.score = dataStorageService.getScore();
    $scope.correctRate = dataStorageService.getCorrectRate();
    $scope.options = dataStorageService.getOption();

    $scope.isCorrect = function (question) {
        var result = 'correct';
        question.Options.forEach(function (option, index, array) {
            if (option.Selected != option.IsAnswer) {          //if the user select the correct answer, it should be true -- true, false -- false key value pair
                result = 'wrong';
                return false;
            }
        });
        return result;
    };
}