const bcrypt = require('bcryptjs');

const password = 'password123';  // The password you want to hash
bcrypt.hash(password, 10, function(err, hashedPassword) {
  if (err) throw err;
  console.log(hashedPassword);  // This will print the hashed password
});
