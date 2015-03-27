/* SimpleXhrFactory singleton */

var SimpleXhrFactory = (function () {

    var ctor = function () {

        // Private methods.
        var standard = function () {
            return {};
        };

        var activeNew = function () {
            return {};
        };

        var activeOld = function () {
            return {};
        };


        var testObject;
        try {
            testObject = standard();
        } catch (e) {
            try {
                testObject = activeNew();
            } catch (e) {
                try {
                    testObject = activeOld();
                } catch (e) {
                    throw new Error('No Xhr object found in this environment.');
                }
            }
        }

        return testObject;
    };

    // Private field for lazy object
    var uniqueObject;

    return {
        getInstance: function () {
            if (!uniqueObject) {

                uniqueObject = ctor();
            }

            return uniqueObject;
        }
    };


})();