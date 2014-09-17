/// <reference path="../../Scripts/jquery-1.9.1.js" />

function EditInPlaceField(id, parent, value) {
    this.id = id;
    this.value = value || 'default value';
    this.parentElement = parent;
    this.createElement(this.id);
    this.attactEvent();
}

EditInPlaceField.prototype = {
    createElement: function (id) {
        this.containerElement = $("<div/>");

        $(this.parentElement).append(this.containerElement);

        this.staticElement = $("<span/>");
        this.containerElement.append(this.staticElement);
        this.staticElement.html(this.value);

        this.fieldElement = $("<input type='text'/>");
        this.fieldElement.val(this.value);
        this.containerElement.append(this.fieldElement);

        this.saveButton = $("<input type='button' value='save'/>");
        this.containerElement.append(this.saveButton);

        this.cancelButton = $("<input type='button' value='cancel'/>");
        this.containerElement.append(this.cancelButton);

        this.convertToText();
    },

    attactEvent: function () {
        var self = this;
        this.staticElement.bind('click', function () {
            self.convertToEditable();
        });

        this.saveButton.bind('click', function () {
            self.save();
        });

        this.cancelButton.bind('click', function () {
            self.cancel();
        });
    },
    convertToEditable: function () {
        this.staticElement.css('display', 'none');
        this.fieldElement.css('display', 'inline');
        this.saveButton.css('display', 'inline');
        this.cancelButton.css('display', 'inline');
        this.setValue(this.value);
    },
    save: function () {
        this.value = this.getValue();
        this.convertToText();
    },
    cancel: function () {
        this.convertToText();
    },
    convertToText: function () {
        this.staticElement.css('display', 'inline');
        this.fieldElement.css('display', 'none');
        this.saveButton.css('display', 'none');
        this.cancelButton.css('display', 'none');
        this.setValue(this.value);
    },
    setValue: function (val) {
        this.fieldElement.val(val);
        this.staticElement.html(val);
    },
    getValue: function () {
        return this.fieldElement.val();
    }
};


