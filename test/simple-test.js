var assert = require('assert');

describe('simple test', function() {
    it('must be able to add 1+1', function() {
        var two = 1 + 1;
        assert.equal(two, 2);
        assert.notEqual(two, 3);
    });
});
