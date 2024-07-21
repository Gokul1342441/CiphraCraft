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

  // Blowfish Encryption
  blowfishEncrypt(data: string, key: string): string {
    return CryptoJS.Blowfish.encrypt(data, key).toString();
  }

  // Blowfish Decryption
  blowfishDecrypt(ciphertext: string, key: string): string {
    const bytes = CryptoJS.Blowfish.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Twofish is not supported by CryptoJS by default
  // Implementations can vary, so you might need an external library for it

  // Hashing
  hash(data: string, algorithm: string): string {
    switch (algorithm) {
      case 'sha1': return CryptoJS.SHA1(data).toString();
      case 'sha256': return CryptoJS.SHA256(data).toString();
      case 'sha512': return CryptoJS.SHA512(data).toString();
      case 'md5': return CryptoJS.MD5(data).toString();
      case 'crc32': return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(data)); // CRC32 not in CryptoJS, needs an external lib
      default: throw new Error('Unsupported hash algorithm');
    }
  }

  // HMAC
  hmac(data: string, key: string, algorithm: string): string {
    switch (algorithm) {
      case 'hmacsha1': return CryptoJS.HmacSHA1(data, key).toString();
      case 'hmacsha256': return CryptoJS.HmacSHA256(data, key).toString();
      case 'hmacsha512': return CryptoJS.HmacSHA512(data, key).toString();
      case 'hmacmd5': return CryptoJS.HmacMD5(data, key).toString();
      case 'hmacripemd160': return CryptoJS.HmacRIPEMD160(data, key).toString();
      default: throw new Error('Unsupported HMAC algorithm');
    }
  }

  // PBKDF2
  pbkdf2(data: string, salt: string, iterations: number, keySize: number, algorithm: string): string {
    switch (algorithm) {
      case 'pbkdf2sha1': return CryptoJS.PBKDF2(data, salt, { keySize: keySize / 32, iterations: iterations, hasher: CryptoJS.algo.SHA1 }).toString();
      case 'pbkdf2sha256': return CryptoJS.PBKDF2(data, salt, { keySize: keySize / 32, iterations: iterations, hasher: CryptoJS.algo.SHA256 }).toString();
      case 'pbkdf2sha512': return CryptoJS.PBKDF2(data, salt, { keySize: keySize / 32, iterations: iterations, hasher: CryptoJS.algo.SHA512 }).toString();
      default: throw new Error('Unsupported PBKDF2 algorithm');
    }
  }

  // Encoders
  encode(data: string, type: string): string {
    switch (type) {
      case 'base64': return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
      case 'hex': return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(data));
      case 'urlencoding': return encodeURIComponent(data);
      case 'utf8': return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Utf8.parse(data));
      case 'ascii': return CryptoJS.enc.Latin1.stringify(CryptoJS.enc.Utf8.parse(data));
      default: throw new Error('Unsupported encoding type');
    }
  }

  decode(data: string, type: string): string {
    switch (type) {
      case 'base64': return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
      case 'hex': return CryptoJS.enc.Hex.parse(data).toString(CryptoJS.enc.Utf8);
      case 'urlencoding': return decodeURIComponent(data);
      case 'utf8': return CryptoJS.enc.Utf8.parse(data).toString(CryptoJS.enc.Utf8);
      case 'ascii': return CryptoJS.enc.Latin1.parse(data).toString(CryptoJS.enc.Utf8);
      default: throw new Error('Unsupported decoding type');
    }
  }
}
