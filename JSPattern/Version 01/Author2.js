/// <reference path="Person2.js" />
/* Author Prototype Object. */
var Author = clone(Person);
Author.books = [];  // Default value.
Author.getBooks = function () {
    return this.books;
};