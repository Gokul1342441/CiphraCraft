import { Component } from '@angular/core';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrl: './encryption.component.css'
})
export class EncryptionComponent {
  selectedMethod: string = 'morse';
  selectedOperation: string = 'encode';
  inputText: string = '';
  outputText: string = '';
  errorMessage: string = '';

  encodeDecode() {}

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
