// 职能类
function EditInPlaceMixinArea(id, parent, value) {
    this.id = id;
    this.value = value || 'default value';
    this.parentElement = parent;

    this.createElement(this.id);
    this.attactEvent();
}

EditInPlaceMixinArea.prototype.createElement = function (id) {
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

EditInPlaceMixinArea.prototype.convertToEditable = function () {
    this.staticElement.css('display', 'none');
    this.fieldElement.css('display', 'block');
    this.saveButton.css('display', 'inline');
    this.cancelButton.css('display', 'inline');

    this.setValue(this.value);
};

EditInPlaceMixinArea.prototype.convertToText = function () {
    this.staticElement.css('display', 'block');
    this.fieldElement.css('display', 'none');
    this.saveButton.css('display', 'none');
    this.cancelButton.css('display', 'none');

    this.setValue(this.value);
};
