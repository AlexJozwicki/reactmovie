var _ = require( "lodash" );
var Rtti = require( "./Rtti");

class Contact extends Rtti {
    constructor(firstName, lastName, email, language, age, gender, password, favoriteMovies) {
        this.firstName = firstName || "";
        this.lastName = lastName || "";
        this.email = email || "";
        this.language = language || "";
        this.age = age || "";
        this.gender = gender || "";
        this.password = password || "";
        this.favoriteMovies = favoriteMovies || [];
    }

    static fromObject( object ) {
        return _.merge( new Contact(), _.cloneDeep( object ) );
    }
}

Contact.class = "Contact";

module.exports = Contact;
