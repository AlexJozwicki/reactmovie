class Rtti {
    constructor() {
    }

    /** RTTI */
    get class() { return this.constructor.class || this.constructor.name; }
}

module.exports = Rtti;