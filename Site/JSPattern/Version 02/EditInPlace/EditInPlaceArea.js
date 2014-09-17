/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="EditInPlaceField.js" />
/// <reference path="lib/ZLib.js" />

function EditInPlaceArea(id, parent, value) {
    // 调用基类的构造函数
    EditInPlaceArea.superclass.constructor.call(this, id, parent, value);
}

// 类式继承
ZLib.extend(EditInPlaceArea, EditInPlaceField);

// 重写部分方法

EditInPlaceArea.prototype.createElement = function () {
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

EditInPlaceArea.prototype.convertToText = function () {
    this.staticElement.css('display', 'block');
    this.fieldElement.css('display', 'none');
    this.saveButton.css('display', 'none');
    this.cancelButton.css('display', 'none');

    this.setValue(this.value);
};

EditInPlaceArea.prototype.convertToEditable = function () {
    this.staticElement.css('display', 'none');
    this.fieldElement.css('display', 'block');
    this.saveButton.css('display', 'inline');
    this.cancelButton.css('display', 'inline');

    this.setValue(this.value);
};