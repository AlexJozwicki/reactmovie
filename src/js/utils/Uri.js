/**
 * Constructs a URI.
 * The format string should have {n} that will be replaced by the nth argument.
 *
 * The object uses toString or query to render the final string: make sure you call either of
 * those manually or that the framework calls it automatically.
 */
class Uri {
    constructor( format ) {
        var args = Array.prototype.slice.call(arguments, 1);

        this.url = format.replace(/{(\d+)}/g, function(match, number) {
          return typeof args[number] != 'undefined' ? args[number] : match;
        });
    }

    toString() {
        return this.url;
    }

    query( object ) {
        var args = [];
        for( var key in object ) {
            var val = object[key];
            if( val !== '' )
                args.push( key + '=' + encodeURIComponent( object[key] ) );
        }

        if( args.length === 0 )
            return this.toString();
        else
            return this.url + '?' + args.join( '&' );
    }
}

module.exports = Uri;
