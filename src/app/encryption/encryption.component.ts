import { Component } from '@angular/core';
import { EncryptionService } from '../service/encryption.service';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrl: './encryption.component.css'
})
export class EncryptionComponent {
  selectedMethod: string = 'AES';
  selectedOperation: string = 'encode';
  key:string = '';
  inputText: string = '';
  outputText: string = '';
  errorMessage: string = '';

  constructor(
    private encryptservice:EncryptionService
    ){}

  EncryptionAlgorithms() {
    this.errorMessage = '';

    try {
      switch(this.selectedMethod) {
        case 'AES':
          if(this.selectedOperation === 'Encryption'){
            this.outputText = this.encryptservice.aesEncrypt(this.inputText,this.key)
          } else if (this.selectedOperation === 'Decryption'){
            this.outputText = this.encryptservice.aesDecrypt(this.inputText,this.key)
          }
          break;
        case 'DES':
          if(this.selectedOperation === 'Encryption'){
            this.outputText = this.encryptservice.desEncrypt(this.inputText,this.key)
          } else if (this.selectedOperation === 'Decryption'){
            this.outputText = this.encryptservice.desDecrypt(this.inputText,this.key)
          }
          break;
        case 'TripleDES':
          if(this.selectedOperation === 'Encryption'){
            this.outputText = this.encryptservice.tridesEncrypt(this.inputText,this.key)
          } else if (this.selectedOperation === 'Decryption'){
            this.outputText = this.encryptservice.tridesDecrypt(this.inputText,this.key)
          }
          break;
      }
    } catch(error){
      this.errorMessage = 'Error processing input. Please check your input and try again.'
    }
  }

  copyToClipboard() {
    const textArea = document.createElement('textarea');
    textArea.value = this.outputText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  clearFields() {
    this.inputText = '';
    this.outputText = '';
    this.errorMessage = '';
  }

}
