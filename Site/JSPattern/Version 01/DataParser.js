/* DataParse singleton, converts character delimited strings into array.  */
/* Now using true private methods. */

var GiantGorp = GiantGorp || {};

GiantGorp.DataParse = (function () {

    var uniqueInstance; // Private field that holds the single instance.

    function ctor() {  //  All the normal singleton code goes here.
        // Private fields.
        var whitespaceRegex = /\s+/g;

        // Private methods.
        function stripWhitespace(str) {
            return str.replace(whitespaceRegex, '');
        }

        function stringSplit(str, delimiter) {
            return str.split(delimiter);
        }

        // Everything returned in the object literal is public, but can access the
        // members in the closure created above.

        return {   // Public methods.            
            stringToArray: function (str, delimiter, stripWS) {
                if (stripWS) {
                    str = stripWhitespace(str);
                }
                var outputArray = stringSplit(str, delimiter);
                return outputArray;
            }
        };
    }

    return {
        getInstance: function () {
            if (!uniqueInstance) {
                uniqueInstance = ctor();
            }
            return uniqueInstance;
        }
    };

})(); // Invoke the function and assgin the returned object literal to GiantCorp.DataParse