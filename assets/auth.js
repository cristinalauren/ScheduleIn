var UserProvider = require('./UserProvider').UserProvider;
exports.authenticate = function(name, pass, callback) {
	console.log('authenticating %s:%s', name, pass);

var userProvider= new UserProvider('localhost', 27017);
	
 // Fetch from databasae
  var user = userProvider.find(name, pass, function(err, response) {
	  console.log(typeof response);
	  console.log(response); });
  
  // query the db for the given username
  if ( !user ) {
	  console.log("Cannot find user");
	  return callback(new Error('cannot find user'));
  }
};

// Adds a user to the system
exports.addUser = function(name, pass, callback) {
	var user = userProvider.find(name, pass, function(err, response) {
		// A user was found with the same email
		if (response) {
			return callback("An account with this email already exists");
		}
		else {
			// Sign up the user if the email wasn't found
			userProvider.signUpUser(name, pass, function(err, response) {
				if (err) {
					callback(err, response);
				}
			});
		}
	});
	
};