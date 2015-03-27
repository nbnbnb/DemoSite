/// <reference path="Person.js" />
/// <reference path="extend.js" />

/* Class Author */

function Author(name,books) {
    Author.superclass.constructor.call(this, name);
    this.books = books;
}

extend(Author, Person);

Author.prototype.getBooks = function () {
    return this.books;
};

// 可以重写超类中的方法
Author.prototype.getName = function () {
    var name = Author.superclass.getName.call(this);
    return name + ', Author of ' + this.getBooks().join(', ');
};