// 使用注释法描述接口
/*
    interface Composite{
        function add(child);
        function remove(child);
        function getChild(index);
    }

    interface FormItem{
        function save();
    };
*/

var CompositeForm = function (id, method, action) {  // implements Composite,FormItem
    this.implementsInterfaces = ['Composite', 'FormItem'];
};

function addForm(formInstance) {
    if (!implements(formInstance, 'Composite', 'FormItem')) {
        throw new Error('Object does not implement a required interface.');
    }
}

function implements(object) {
    for (var i = 1; i < arguments.length; i++) {
        var interfaceName = arguments[i];
        var interfaceFound = false;
        for (var j = 0; j < object.implementsInterfaces.length; j++) {
            if (interfaceName === object.implementsInterfaces[j]) {
                interfaceFound = true;
                break;
            }
        }
        if (!interfaceFound) {
            return false;
        }
    }
    return true;
}

// implement the Composite interface.
CompositeForm.prototype.add = function () {

};

CompositeForm.prototype.remove = function () {

};

CompositeForm.prototype.getChild = function (index) {

};

// implement the FormItem interface
CompositeForm.prototype.save = function () {

};

function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
}

function Author(name,books) {
    Person.call(this, name);  // Call the superclass's constructor in the socpe of this 
    this.books = books;
}

Author.prototype = new Person(); // Set up the prototype chain
Author.prototype.constructor = Author; // Set the constructor attribute to Author
Author.prototype.getBooks = function () {
    return this.books;
};

var authors = [];
authors[0] = new Author('Dustin Dian', ['Javascript Design Patterns']);
authors[1] = new Author('Ross Harms', ['Javascript Desgin Patterns']);

window.API = window.API || function () {
    var name = 'Hello world';

    // Privleged mutator method.
    this.setName = function (newName) {
        name = newName;
        return this;
    };

    // Privileged accessor method.
    this.getName = function () {
        return name;
    };
};

// Implement code.
var o = new API();

window.API2 = window.API2 || function () {
    var name = 'Hello world';

    // Privileged mutator method.
    this.setName = function (newName) {
        name = newName;
        return this;
    };

    this.getName = function (callback) {
        callback.call(this, name);
        return this;
    };
};