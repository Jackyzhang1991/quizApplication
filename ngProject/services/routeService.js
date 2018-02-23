(function () {
    'use strict';

    angular
        .module('quizApp')
        .service('routeService', routeService);

    routeService.$inject = ['$state'];

    function routeService ($state) {

        this.route = function (state) {
            $state.go(state);
        };
    }

})();