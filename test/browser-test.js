var assert = require('assert');

var someMarkup =  '<div id="content">'+
                    '<div id="mydiv">'+
                    '</div>'+
                  '</div>';

describe('markup test', function() {

    it('create new instance', function() {
        document.body.innerHTML = someMarkup;
        var mydiv = document.getElementById('mydiv');
        assert.notEqual(mydiv, undefined);
    });

});