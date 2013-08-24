/// <reference path="Interface.js" />

var ResultSet = new Interface('Resultset', ['getDate', 'getResults']);

var ResultFormatter = function (resultObject) {

    Interface.ensureImplements(resultObject, ResultSet);

    this.resultObject = resultObject;
};



ResultFormatter.prototype.renderResults = function () {

    var dateOfTest = this.resultObject.getDate();
    var resultArray = this.resultObject.getResults();
    var resultsContainer = document.createElement('div');
    var resultHeader = document.createElement('h3');
    resultHeader.innerHTML = 'Test Result from ' + dateOfTest.toUTCString();
    resultsContainer.appendChild(resultHeader);

    var resultsList = document.createElement("ul");
    resultsContainer.appendChild(resultsList);

    for (var i = 0, len = resultArray.length; i < len; i++) {
        var listItem = document.createElement('li');
        listItem.innerHTML = resultArray[i];
        resultsList.appendChild(listItem);
    }

    return resultsContainer;
};