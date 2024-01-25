import { Component } from '@angular/core';
import { encodedecodeservice } from '../service/encoder-decoder.service';


@Component({
  selector: 'app-encoder-decoder',
  templateUrl: './encoder-decoder.component.html',
  styleUrls: ['./encoder-decoder.component.css'],
})
export class EncoderDecoderComponent {
  selectedMethod: string = 'morse';
  selectedOperation: string = 'encode';
  inputText: string = '';
  outputText: string = '';
  errorMessage: string = '';

  constructor(
    private encodedecode:encodedecodeservice
  ) { }

  encodeDecode() {
    this.errorMessage = '';

    try {
      switch (this.selectedMethod) {
        case 'morse':
          if (this.selectedOperation === 'encode') {
            this.outputText = this.encodedecode.textToMorse(this.inputText);
          } else if (this.selectedOperation === 'decode') {
            this.outputText = this.encodedecode.morseToText(this.inputText);
          }
          break;
        case 'pigpen':
          if (this.selectedOperation === 'encode') {
            this.outputText = this.encodedecode.textToPigpen(this.inputText);
          } else if (this.selectedOperation === 'decode') {
            this.outputText = this.encodedecode.pigpenToText(this.inputText);
          }
          break;
        case 'phoneticalphabet':
          if (this.selectedOperation === 'encode') {
            this.outputText = this.encodedecode.textToPhoneticAlphabet(this.inputText);
          } else if (this.selectedOperation === 'decode') {
            this.outputText = this.encodedecode.phoneticAlphabetToText(this.inputText);
          }
          break;
        case 'tapcodeservice':
          if(this.selectedOperation === 'encode'){
            this.outputText= this.encodedecode.textToTapCode(this.inputText);
          } else if (this.selectedOperation === 'decode'){
            this.outputText= this.encodedecode.tapCodeToText(this.inputText);
          }
          break;
        default:
          this.errorMessage = 'Invalid method selected.';
          break;
      }
    } catch (error) {
      this.errorMessage = 'Error processing input. Please check your input and try again.';
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
