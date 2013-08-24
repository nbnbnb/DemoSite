/// <reference path="Interface.js" />

var Publication = new Interface('Publication', ['getIsbn', 'setIsbn', 'getTitle', 'setTitle', 'getAuthor', 'setAuthor', 'display']);

var Book = (function () {  // implements Publication

    // 此处可以存放私有方法和字段
    // 对于每个实例而言，它们只在内存中保留一个副本
    // 因为此作用域在构造器之外，所以它们不是特权方法，不能访问任何定义在构造器中的私有字段或方法

    // 要判断一个私有方法是否应该设计为静态方法，一条经验法则是看它是否需要访问任何实例数据
    // 如果不需要，设计为静态方法效率更高

    // Private static fields
    // 这个属性用于跟踪构造器的调用次数
    var numOfBooks = 0;

    // Private static methods
    // 这个方法被设计为静态的，因为为每个Book实例生成这个方法毫无道理
    var checkIsbn = function (isbn) {
        if (isbn == undefined || typeof isbn !== 'string') {
            return false;
        }
        isbn = isbn.replace(/-/g, '');
        if (isbn.length != 10 && isbn.length != 13) {
            return false;
        }
        var sum = 0;
        if (isbn.length === 10) {  // Ensure characters 1 through 9 are digits.
            if (!isbn.match(/^\d{9}/)) {
                return false;
            }

            for (var i = 0; i < 9; i++) {
                sum += isbn.charAt(i) * (10 - i);
            }

            var checksum = sum % 11;
            if (checksum === 10) {
                checksum = 'X';
            }
            if (isbn.charAt(9) != checksum) {
                return false;
            }
        } else {  // Ensure characters 1 throuth 12 are digits.
            if (!isbn.match(/^\d{12}/)) {
                return false;
            }

            for (var i = 0; i < 12; i++) {
                sum += isbn.charAt(i) * ((i % 2 === 0) ? 1 : 3);
            }
            var checksum = sum % 10;
            if (isbn.charAt(12) != checksum) {
                return false;
            }
        }
        return true;
    };
    

    // Constants (create as private static field)
    var UPPER_BOUND = 10;

    // Return the constructor
    var ctor = function (isbn, title, author) {

        // Keep track of how many Books have been instantiated
        numOfBooks++;

        if (numOfBooks > 50) {
            throw new Error('Book: Only 50 instance of Book can be created.');
        }

        // Private fields
        var isbn, title, author;

        // Privileged methods.
        // 因为它们是公用方法，却能够访问私有属性和方法
        // 为了在对象外部能够访问这些方法，它们前面都加上了this关键字
        // 因为这些方法定义在 Book 构造器的作用域中，所以它们能够访问私有属性
        // 任何不需要 直接 访问私有属性的方法在Book.prototype中进行申明就可以了
        // 只有那些需要直接访问私有属性的方法，才该定义为特权方法
        // 特权方法太多会占有过多内存，因为每个对象实例都包含了所有特权方法的副本
        this.getIsbn = function () {
            return isbn;
        };

        this.setIsbn = function (newIsbn) {
            if (!checkIsbn(newIsbn)) {
                throw new Error('Book: Invalid ISBN.');
            }
            isbn = newIsbn;
        };

        this.getTitle = function () {
            return title;
        };

        this.setTitle = function (newTitle) {
            title = newTitle || 'No Title specifled';
        };

        this.getAuthor = function () {
            return author;
        };

        this.setAuthor = function (newAuthor) {
            author = newAuthor;
        };

        // Constructor Code
        this.setIsbn(isbn);
        this.setTitle(title);
        this.setAuthor(author);

    };

    // Privileged static method
    // 为什么此处称为 特权 静态方法呢
    // 此处的特权为通过此处公开方法，可以访问闭包中的私有静态属性(注意，此处不是访问的实例属性)
    // 静态的意思为此函数为构造函数的一个属性,可通过 Book.getUPPER_BOND() 进行访问
    ctor.getUPPER_BOUND = function () {
        return UPPER_BOUND;
    };

    return ctor;
})();

// Public static method.
// 这些方法用于与类的整体相关的业务，而不是与类的任一特定实例相关的任务
// 它们并不依赖与对象实例中包含的任何数据
Book.convertToTitleCase = function (inputString) {

};

// Public, non-privileged methods.
// 所有对象共享，可以读取类实例对象中的数据
Book.prototype = {
    display: function () {
        // ...
    }
};