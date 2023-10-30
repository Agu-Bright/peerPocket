const CryptoJS = require("crypto-js");

const key = process.env.CRYPTO_KEY;

const iv = CryptoJS.lib.WordArray.random(16);

const encryptData = (data) => {
  const dataString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(dataString, key, {
    iv: iv,
  }).toString();
};

const decryptData = (encryptedData) => {
  const decryptedString = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
  }).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
};

exports.encryptField = (value) => encryptData(value);
exports.decryptField = (value) => decryptData(value);
