var Reflux      = require( 'reflux' );
var AuthApi     = require( './AuthApi' );


var AuthActions = {
    /**
     * Login action
     *
     * @async
     * @param  {String} username
     * @param  {String} password
     */
    login         : Reflux.createAction( { asyncResult: true } ),

    /**
     * Logout
     * @async
     */
    logout        : Reflux.createAction( { asyncResult: true } ),

    /**
     * Returns the user to the login screen
     * @async
     */
    requiresLogin : Reflux.createAction()
};


module.exports = AuthActions;
