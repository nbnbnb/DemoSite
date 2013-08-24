/// <reference path="augment.js" />
/* Mixin class for the edit-in-place methods. */

var EditInPlaceWithMixinContainer = function () { };
EditInPlaceWithMixinContainer.prototype = {
    createElements: function (id) {
        this.containerElement = document.createElement('div');
        this.containerElement.id = id;
        this.parentElement.appendChild(this.containerElement);

        this.staticElement = document.createElement('span');
        this.containerElement.appendChild(this.staticElement);
        this.staticElement.innerHTML = this.value;

        this.fieldElement = document.createElement('input');
        this.fieldElement.type = 'text';
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
    },
    attachEvents: function () {
        var that = this;
        $(this.staticElement).bind('click', function () { that.convertToEditable(); });
        $(this.saveButton).bind('click', function () { that.save(); });
        $(this.cancelButton).bind('click', function () { that.cancel(); });

    },
    convertToEditable: function () {
        this.staticElement.style.display = 'none';
        this.fieldElement.style.display = 'inline';
        this.saveButton.style.display = 'inline';
        this.cancelButton.style.display = 'inline';

        this.setValue(this.value);
    },
    convertToText: function () {
        this.fieldElement.style.display = 'none';
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';
        this.staticElement.style.display = 'inline';

        this.setValue(this.value);
    },
    save: function () {
        this.value = this.getValue();
        this.convertToText();
    },
    cancel: function () {
        this.convertToText();
    },

    setValue: function (value) {
        this.fieldElement.value = value;
        this.staticElement.innerHTML = value;
    },
    getValue: function () {
        return this.fieldElement.value;
    }
};

function EditInPlaceWithMixin(id, parent, value) {
    this.id = id;
    this.parentElement = parent;
    this.value = value || 'default value';

    this.createElements(this.id);
    this.attachEvents();
}

augment(EditInPlaceWithMixin, EditInPlaceWithMixinContainer);