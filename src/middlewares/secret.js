const crypto = require('crypto');

let secretKeyPrevious='0';
let secretKeyNow='0';

function regenerateSecret(){
    secretKeyPrevious=secretKeyNow;
    secretKeyNow=crypto.randomBytes(16).toString('base64');
    console.log("---------------------");
    console.log("secretKeyPrevious "+secretKeyPrevious);
    console.log("secretKeyNow      "+secretKeyNow);
}

module.exports = {regenerateSecret, getSecretKeyPrevious: () => secretKeyPrevious, getSecretKeyNow: () => secretKeyNow,};
