'use strict';

app.service('dataStorageService', dataStorageService);

dataStorageService.$inject = ['$sessionStorage'];

function dataStorageService($sessionStorage) {

    $sessionStorage.buttons = ["HTML", "CSS"];
    $sessionStorage.selectOptions = {};
    $sessionStorage.selectOptionsId = {};
    $sessionStorage.questions = {};
    $sessionStorage.score = "";
    $sessionStorage.correctRate = "";

    this.getButtons = function () {
        return $sessionStorage.buttons;
    };

    this.addOption = function(option) {
        $sessionStorage.selectOptions[Math.floor((option.Id - 1) / 4 + 1)] = option;
    };

    this.getOption = function() {
        return $sessionStorage.selectOptions;
    };

    this.addQuestions = function(questions) {
        $sessionStorage.questions = questions;
    };

    this.getQuestions = function() {
        return $sessionStorage.questions;
    };

    this.addScore = function(score) {
        $sessionStorage.score = score;
    };

    this.getScore = function() {
        return $sessionStorage.score;
    };

    this.addCorrectRate = function(correctRate) {
        $sessionStorage.correctRate = correctRate;
    };

    this.getCorrectRate = function() {
        return $sessionStorage.correctRate;
    };

    this.resetData = function () {
        $sessionStorage.selectOptions = {};
    };
}
