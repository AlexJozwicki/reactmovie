/*eslint-disable no-unused-vars*/
class Rtti {
    constructor() {
    }

    /** RTTI */
    get class() { return this.constructor.class || this.constructor.name; }
}
/*eslint-enable no-unused-vars*/

module.exports = Rtti;
