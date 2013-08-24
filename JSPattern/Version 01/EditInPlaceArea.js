/// <reference path="extend.js" />
/// <reference path="EditInPlaceField.js" />

/* EditInPlaceArea class. */

function EditInPlaceArea(id, parent, value) {
    EditInPlaceArea.superclass.constructor.call(this, id, parent, value);
}

// 继承父类
extend(EditInPlaceArea, EditInPlaceField);

// Override certain methods.

EditInPlaceArea.prototype.createElements = function (id) {
    this.containerElement = document.createElement('div');
    this.parentElement.appendChild(this.containerElement);
    this.containerElement.id = id;

    this.staticElement = document.createElement('p');
    this.containerElement.appendChild(this.staticElement);
    this.staticElement.innerHTML = this.value;

    this.fieldElement = document.createElement('textarea');
    this.fieldElement.value = this.value;
    this.containerElement.appendChild(this.fieldElement);


    this.saveButton = document.createElement('input');
    this.saveButton.type = 'button';
    this.saveButton.value = 'save';
    this.containerElement.appendChild(this.saveButton);

    this.cancelButton = document.createElement('input');
    this.cancelButton.type = 'button';
    this.cancelButton.value = 'Cancel';
    this.containerElement.appendChild(this.cancelButton);

    this.convertToText();
};

EditInPlaceArea.prototype.convertToEditable = function () {
    this.staticElement.style.display = 'none';
    this.fieldElement.style.display = 'block';
    this.saveButton.style.display = 'inline';
    this.cancelButton.style.display = 'inline';

    this.setValue(this.value);
};

EditInPlaceArea.prototype.convertToText = function () {
    this.staticElement.style.display = 'block';
    this.fieldElement.style.display = 'none';
    this.saveButton.style.display = 'none';
    this.cancelButton.style.display = 'none';

    this.setValue(this.value);
};

