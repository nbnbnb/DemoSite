/// <reference path="../../Scripts/jquery-1.9.1.js" />

var EditInPlaceAreaPrototype = ZLib.clone(EditInPlaceFieldPrototype);

EditInPlaceAreaPrototype.createElement=function (id) {
    this.containerElement = $("<div/>");

    $(this.parentElement).append(this.containerElement);

    this.staticElement = $("<p/>");
    this.containerElement.append(this.staticElement);
    this.staticElement.html(this.value);

    this.fieldElement = $("<textarea/>");
    this.fieldElement.val(this.value);
    this.containerElement.append(this.fieldElement);

    this.saveButton = $("<input type='button' value='save'/>");
    this.containerElement.append(this.saveButton);

    this.cancelButton = $("<input type='button' value='cancel'/>");
    this.containerElement.append(this.cancelButton);

    this.convertToText();
};

EditInPlaceAreaPrototype.convertToEditable=function () {
    this.staticElement.css('display', 'none');
    this.fieldElement.css('display', 'block');
    this.saveButton.css('display', 'inline');
    this.cancelButton.css('display', 'inline');

    this.setValue(this.value);
};

EditInPlaceAreaPrototype.convertToText = function () {
    this.staticElement.css('display', 'block');
    this.fieldElement.css('display', 'none');
    this.saveButton.css('display', 'none');
    this.cancelButton.css('display', 'none');

    this.setValue(this.value);
};

