/// <reference path="../lib/ZLib.js" />
/// <reference path="../../src/Interface.js" />

var Composite = new ZLib.Interface('Composite', ['add', 'remove', 'getChild']);
var FormItem = new ZLib.Interface('FormItem', ['save','restore']);

var CompositeForm = function (id, method, action) {  // implements Composite, FormItem
    this.formComponents = [];
    this.element = document.createElement('form');
    this.element.id = id;
    this.element.method = method || 'POST';
    this.element.action = action || '#';
};

CompositeForm.prototype.add = function (child) {
    ZLib.Interface.ensureImplements(child, Composite, FormItem);
    this.formComponents.push(child);
    this.element.appendChild(child.getElement());
};

CompositeForm.prototype.remove = function (child) {
    for (var i = 0, len = this.formComponents.length; i < len; i++) {
        if (this.formComponents[i] === child) {
            this.formComponents.splice(i, 1);
            break;
        }
    }
};

CompositeForm.prototype.getChild = function (i) {
    return this.formComponents[i];
};

CompositeForm.prototype.save = function () {
    for (var i = 0, len = this.formComponents.length; i < len; i++) {
        this.formComponents[i].save();
    }
};

CompositeForm.prototype.getElement = function () {
    return this.element;
};

CompositeForm.prototype.restore = function () {
    for (var i = 0, len = this.formComponents.length; i < len; i++) {
        this.formComponents[i].restore();
    }
};

var Field = function (id) {  // Implements Composite, FormItem
    this.id = id;
    this.element = null;
};

Field.prototype.add = function () { };
Field.prototype.remove = function () { };
Field.prototype.getChild = function () { };

Field.prototype.save = function () {
    setCookie(this.id, this.getValue());
};

Field.prototype.getElement = function () {
    return this.element;
};

Field.prototype.getValue = function () {
    throw new Error('Unsupported operation on the class Field.');
};

Field.prototype.restore = function () {
    this.element.value = getCookie(this.id);
};

var InputField = function (id, label) {  // Implements Composite, FormItem
    Field.call(this.id);

    this.input = document.createElement('input');
    this.input.id = id;

    this.label = document.createElement('label');
    var labelTextNode = document.createTextNode(label);
    this.label.appendChild(labelTextNode);

    this.element = document.createElement('div');
    this.element.className = 'input-field';
    this.element.appendChild(this.label);
    this.element.appendChild(this.input);
};

ZLib.extend(InputField, Field);  // Inherit from Field.

InputField.prototype.getValue = function () {
    return this.input.value;
};

var TextareaField = function (id, label) {  // Implements Composite, FormItem
    Field.call(this, id);

    this.textarea = document.createElement('textarea');
    this.textarea.id = id;

};

var SelectField = function (id, label) {
    Field.call(this, id);

    this.select = document.createElement('select');
    this.select.id = id;
};

var GalleryItem = new ZLib.Interface('GalleryItem', ['hide', 'show']);

var DynamicGallery = function (id) {
    this.children = [];

    this.element = document.createElement('div');
    this.element.id = id;
    this.element.className = 'dynamic-gallary';
};

DynamicGallery.prototype = {
    add: function (child) {
        ZLib.Interface.ensureImplements(child, Composite, GalleryItem);
        this.children.push(child);
        this.element.appendChild(child.getElement());
    },
    remove: function (child) {
        for (var node, i = 0; nodt = this.getChild(i) ; i++) {
            if (node == child) {
                this.children.splice(i, 1);
                break;
            }
        }
        this.element.removeChild(child.getElement());
    },
    getChild: function (i) {
        return this.children[i];
    },
    hide: function () {
        for (var node, i = 0; node = this.getChild(i) ; i++) {
            node.hide();
        }
        this.element.style.display = 'none';
    },
    show: function () {
        for (var node, i = 0; node = this.getChild(i) ; i++) {
            node.show();
        }
        this.element.style.display = 'block';
    },
    getElement: function () {
        return this.element;
    }

};

var GalleryImage = function (src) {
    this.element = document.createElement('img');
    this.element.className = 'gallery-image';
    this.element.src = src;
};

GalleryImage.prototype = {
    add: function () { },
    remove: function () { },
    getChild: function () { },

    hide: function () {
        this.element.style.display = 'none';
    },
    show: function () {
        this.element.style.display = '';
    },
    getElement: function () {
        return this.element;
    }
};
