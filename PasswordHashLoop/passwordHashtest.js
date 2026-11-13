const crypto = require('crypto');

// Define password and salt
const password = 'password123';
const salt = crypto.randomBytes(16);

// Define iterations, key length, and hash algorithm
const iterations = 100000;
const keyLength = 32;
const digest = 'sha256';

// Generate the PBKDF2 hash and return the derived key
function generateKey(password, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keyLength, digest, (err, derivedKey) => {
            if (err) reject(err);
            else resolve(derivedKey.toString('hex')); // Convert the buffer to a hex string
        });
    });
}

// Example usage
generateKey(password, salt)
    .then((derivedKey) => console.log('Derived Key:', derivedKey))
    .catch((error) => console.error('Error:', error));