var validateFunction = function (token, callback) {

    // Use a real strategy here to check if the token is valid
    if (token === 'abc456789') {
        //callback(null, true, userCredentials);
        var userCredentials =  {credentials: { user: 'admin' }};
        callback(null, true, userCredentials);
    }
    else {
        callback(null, false, null);
    }
};


module.exports = {
	validateFunction: validateFunction
};
