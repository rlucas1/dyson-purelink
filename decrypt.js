var crypto = require('crypto');

// Ported from https://github.com/CharlesBlonde/libpurecoollink/blob/master/libpurecoollink/dyson.py

function decryptCredentials(encrypted_password) { 
    let iv =  new Buffer.from([0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0]);
    let key = new Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20])
    
    let b64dec = function(data) {
     return Buffer.from(data, 'base64').toString('binary')
    };

    let data = b64dec(encrypted_password)
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decoded  = decipher.update(data, 'binary', 'utf8');
    decoded += decipher.final('utf8');

    return decoded;
} 

module.exports = decryptCredentials
