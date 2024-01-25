import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {

    constructor() { }

    // AES Encryption
    aesEncrypt(data: string, key: string): string {
        return CryptoJS.AES.encrypt(data, key).toString();
    }

    // AES Decryption
    aesDecrypt(ciphertext: string, key: string): string {
        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    // DES Encryption
    desEncrypt(data: string, key: string): string {
        return CryptoJS.DES.encrypt(data, key).toString();
    }

    // DES Decryption
    desDecrypt(ciphertext: string, key: string): string {
        const bytes = CryptoJS.DES.decrypt(ciphertext, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    // TripleDES Encryption
    tridesEncrypt(data: string, key: string): string {
        return CryptoJS.TripleDES.encrypt(data, key).toString();
    }

    // TripleDES Decryption
    tridesDecrypt(ciphertext: string, key: string): string {
        const bytes = CryptoJS.TripleDES.decrypt(ciphertext, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }



}
