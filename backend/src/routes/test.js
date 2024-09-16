const bcrypt = require('bcryptjs');

// Define the password you want to hash (e.g., 'ziad030303')
const plainTextPassword = 'ziadnadir123';

bcrypt.hash(plainTextPassword, 12, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing the password:', err);
        return;
    }

    console.log('Hashed Password:', hashedPassword);
});
