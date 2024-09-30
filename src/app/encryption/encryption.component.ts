import { Component } from '@angular/core';
import { EncryptionService } from '../service/encryption.service';
import { MessageService } from 'primeng/api';

interface Cryptographic {
  type_algorithms: string;
  code: string;
}
interface SubAlgorithm {
  name: string;
  code: string;
}
interface EncryptionType {
  encryption_type: string;
  code: string;
}

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrl: './encryption.component.css',
  providers: [MessageService]
})
export class EncryptionComponent {
 
  algorithmsList: Cryptographic[] = [];
  selectedAlgorithm: Cryptographic | undefined;
  subAlgorithmList: SubAlgorithm[] = [];
  selectedSubAlgorithm: SubAlgorithm | undefined;
  encType: EncryptionType[] = [];
  selectedEncType: EncryptionType | undefined;
  
  // inputText: string = 'U2FsdGVkX19lTziVtlm/sQpWS8kNeDKjS1jxHnoTD3xvHez9EPvsuEVDHad1Q637GM9BjABw6Iq5Hokbx1FBBc2UPJ954GAICQrlp9Rhy0uVKZtCjl8rvMApZjABf+8e43WjSJ2aGGyg62SBvMyi90WbaBEkZyYXZYTCx5c2NIIeICXSKK4WxULFHtUKrunCpQx/g1/vmf3vzxC4Xov0zG5l5Bla1zpgS/zNs3IUw63PB9ZPHeqTUrYfDQ1+yTHGyFpMzqAXbnHuCf/NUHaDSd/4cmeeFwzESjqg78gpaRb2JKgsQFlBO89iRGrEcutunjK/aEXenIbBWNz6Iutp7NGISWTrcIygjrjIGv5b5dQkyUYNINVdw6tqwKRg8ds6f0H5bKqgDW24iNzJsvBZCEv4lpBBp98xOpLA4n8M2p6rMEQ+jzMLzpPD8SJOR9hed15PjUpCr18cGCawDjAti5EiAYjG4cb4oYDH55EJfQfEM61CBwgsGF6MGfWkkkrTsRfQOe8G1BFDCyojLM9xqVhmN2P+F5CRFX+5IkNSkYHq02VEqndXvH8y2QCYt+0afVz8bE2L/sU59xX4dmybjS5jPAvPZ1qxaccIwJzaJviEjc9fsUcBygVC5J9kNkPHM05Lor2HR1JTmCaFVdhUz1sb+5TcxPY+SiiL06FGF+SxEwrLaBYZGUd+WEkjNH1ZSfJZf02OcInUfxDbpw37g9EMmiZee6sVxjfZWXJ377CFQlsEUGianDKemJzu0J8MX2OthaqE0iOd7ttWowX27AU3NDUUKTYgbho8PB2r0QIMuJyXcEGu2d7bRS6PoWsU2PBf4KleUqgE4Ma9T4LgqW0SV750lCuViBhXYUqRu2UxUUNcPiLERmu75dgbUdezR7Xo4CKewhfv51qO3QNaDBbWuBwVe1BqZjoHCc6BdMIKzQXgXW48aZXhjd1j+L0R0N1fqfZ5YEXPgqKKxOoBP5xaXKS6KirIVJZZLjGR2Iz3g32H5YOdjRzTk13R6CnEdlHoEvN4vFlic0zS2KNmnzeLszHX3EBkn/lkDPw2FPRJDDtTzZ+7mbJj1atVWE/t';

  inputText: string = '';
  outputText: string = '';
  // key: string = '09c9b9ee-9cdc-4118-8af9-585c84c0d981';
  key: string = '';
  // key: string = '09c9b9ee9cdc41188af9585c84c0d981513a4bac95a448638b8b7a0f38c172c5k3QL95NjdP!cA34CsXL';
  errorMessage: string = '';
  loading: boolean = false;
  parsedOutputText: any;
  displayDialog: boolean = false;
  displayJsonDialog: boolean = false; 


  subAlgorithms: { [key: string]: SubAlgorithm[] } = {
    'hash': [
      { name: 'SHA-1', code: 'sha1' },
      { name: 'SHA-256', code: 'sha256' },
      { name: 'SHA-512', code: 'sha512' },
      { name: 'MD5', code: 'md5' },
      { name: 'CRC32', code: 'crc32' }
    ],
    'hmac': [
      { name: 'HMAC-SHA1', code: 'hmacsha1' },
      { name: 'HMAC-SHA256', code: 'hmacsha256' },
      { name: 'HMAC-SHA512', code: 'hmacsha512' },
      { name: 'HMAC-MD5', code: 'hmacmd5' },
      { name: 'HMAC-RIPEMD160', code: 'hmacripemd160' }
    ],
    'pbkdf2': [
      { name: 'PBKDF2-SHA1', code: 'pbkdf2sha1' },
      { name: 'PBKDF2-SHA256', code: 'pbkdf2sha256' },
      { name: 'PBKDF2-SHA512', code: 'pbkdf2sha512' }
    ],
    'ciphers': [
      { name: 'AES', code: 'aes' },
      { name: 'DES', code: 'des' },
      { name: '3-DES', code: '3des' },
      { name: 'Blowfish', code: 'blowfish' },
      { name: 'Twofish', code: 'twofish' }
    ],
    'encoders': [
      { name: 'Base64', code: 'base64' },
      { name: 'Hex', code: 'hex' },
      { name: 'URL Encoding', code: 'urlencoding' },
      { name: 'UTF-8', code: 'utf8' },
      { name: 'ASCII', code: 'ascii' }
    ]
  };
  private triggerTimeout: boolean = false;

  constructor(
    private encryptService: EncryptionService
  ) { }

  ngOnInit() {
    this.algorithmsList = [
      { type_algorithms: 'Hashing', code: 'hash' },
      { type_algorithms: 'HMAC', code: 'hmac' },
      { type_algorithms: 'PBKDF2', code: 'pbkdf2' },
      { type_algorithms: 'Ciphers', code: 'ciphers' },
      { type_algorithms: 'Encoders', code: 'encoders' }
    ];

    this.encType = [
      { encryption_type: 'Encryption', code: 'encode' },
      { encryption_type: 'Decryption', code: 'decode' }
    ];
  }
  
  onAlgorithmChange() {
    if (this.selectedAlgorithm) {
      this.subAlgorithmList = this.subAlgorithms[this.selectedAlgorithm.code];
      this.selectedSubAlgorithm = undefined;
    }
  }

  resetForm() {
    this.selectedAlgorithm = undefined;
    this.selectedSubAlgorithm = undefined;
    this.selectedEncType = undefined;
    this.inputText = '';
    this.outputText = '';
    this.key = '';
    this.errorMessage = '';
    this.parsedOutputText = null;
    this.displayDialog = false;
  }

  process() {
        this.loading = true;
        if (!this.selectedAlgorithm || !this.selectedSubAlgorithm || !this.selectedEncType) {
          this.errorMessage = 'Please select all options';
          this.loading = false;
          return;
        }
      
        try {
          this.errorMessage = '';
      switch (this.selectedAlgorithm.code) {
        case 'hash':
          this.outputText = this.encryptService.hash(this.inputText, this.selectedSubAlgorithm.code);
          break;
        case 'hmac':
          if (!this.key) {
            this.errorMessage = 'Please provide a key for HMAC';
            this.loading = false;
            return;
          }
          this.outputText = this.encryptService.hmac(this.inputText, this.key, this.selectedSubAlgorithm.code);
          break;
        case 'pbkdf2':
          const salt = 'some_salt'; 
          const iterations = 1000; 
          const keySize = 256; 
          this.outputText = this.encryptService.pbkdf2(this.inputText, salt, iterations, keySize, this.selectedSubAlgorithm.code);
          break;
        case 'ciphers':
          if (this.selectedEncType.code === 'encode') {
            this.outputText = this.encryptService.aesEncrypt(this.inputText, this.key);
          } else {
            this.outputText = this.encryptService.aesDecrypt(this.inputText, this.key);
          }
          break;
        case 'encoders':
          if (this.selectedEncType.code === 'encode') {
            this.outputText = this.encryptService.encode(this.inputText, this.selectedSubAlgorithm.code);
          } else {
            this.outputText = this.encryptService.decode(this.inputText, this.selectedSubAlgorithm.code);
          }
          break;
      }
      try {
        this.parsedOutputText = JSON.parse(this.outputText);
        if(this.parsedOutputText) {
          this.displayJsonDialog = true;
        }
        console.log("🚀 ~ EncryptionComponent ~ process ~ this.parsedOutputText:", this.parsedOutputText);
        // this.displayDialog = true;
      } catch (error) {
        // this.errorMessage = 'Invalid JSON format';
        this.parsedOutputText = null;
      }      
    } catch (error:any) {
      this.errorMessage = error.message;
      this.loading = false;
    } finally {
      this.loading = false;
    }
  }


  showJsonCrack() {
    if (!this.triggerTimeout) { // Check if timeout was triggered before
      this.displayDialog = true;
      if (this.parsedOutputText) {
        this.triggerTimeout = true; // Mark as triggered
        setTimeout(() => {
          const jsonCrackEmbed = document.getElementById('jsoncrackEmbed') as HTMLIFrameElement;
          if (jsonCrackEmbed) {
            console.log("🚀 ~ EncryptionComponent ~ setTimeout ~ jsonCrackEmbed:", jsonCrackEmbed);
            jsonCrackEmbed.contentWindow?.postMessage({
              json: JSON.stringify(this.parsedOutputText),
              // options: {
              //   theme: "light",
              // }
            }, '*');
          }
          this.triggerTimeout = false;
        }, 500); 
      }
    }
  }
  
}