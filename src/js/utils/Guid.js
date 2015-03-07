var Guid = {
    /**
     * @return {String} A Unique Identifier
     */
    generate: function() {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "" + p.substr(0,4) + "" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    },


    /**
     * Adds a hidden __id property to the object that should not be serialized or cloned.
     * This property IS NOT enumerable (defineProperty defaults enumerable to false).
     *
     * @param  {Object} obj JS object to which the id property will be added
     */
    idify: function( obj ) {
        if( obj.hasOwnProperty( '__id' ) )
            return obj.__id;

        var guid = Guid.generate();
        Object.defineProperty( obj, '__id', {
            get: function() {
                return guid;
            }
        });
        return guid;
    }
};

module.exports = Guid;
