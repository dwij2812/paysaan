import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }
  encryptPasswordWithAES(plainPassword: string) {
    const key = CryptoJS.enc.Utf8.parse('aesEncryptionKey');
    const intVec = CryptoJS.enc.Utf8.parse('encryptionIntVec');
    const encrypted = CryptoJS.AES.encrypt(plainPassword, key, {
      keySize: 128,
      iv: intVec,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
  decryptPasswordWithAES(plainPassword: string) {
    const key = CryptoJS.enc.Utf8.parse('aesEncryptionKey');
    const intVec = CryptoJS.enc.Utf8.parse('encryptionIntVec');
    const decrypted = CryptoJS.AES.decrypt(plainPassword, key, {
      keySize: 128,
      iv: intVec,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
