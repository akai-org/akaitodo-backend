const crypto = require('crypto');

let secretKeyPrevious=null;
let secretKeyNow=null;

function regenerateSecret(){
    secretKeyPrevious=secretKeyNow;
    secretKeyNow=crypto.randomBytes(256).toString('base64');
}

function setSecretKeyPreviousToNull() {
    secretKeyPrevious = null;
}
module.exports = {regenerateSecret,setSecretKeyPreviousToNull, getSecretKeyPrevious: () => secretKeyPrevious, getSecretKeyNow: () => secretKeyNow,};
