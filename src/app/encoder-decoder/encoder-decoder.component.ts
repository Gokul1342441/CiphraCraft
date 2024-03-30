import { Component } from '@angular/core';
import { encodedecodeservice } from '../service/encoder-decoder.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-encoder-decoder',
  templateUrl: './encoder-decoder.component.html',
  styleUrls: ['./encoder-decoder.component.css'],
  providers:[MessageService]
})
export class EncoderDecoderComponent {
  selectedMethod: string = 'morse';
  selectedOperation: string = 'encode';
  inputText: string = '';
  outputText: string = '';
  errorMessage: string = '';

  constructor(
    private encodedecode:encodedecodeservice,
    private messageService: MessageService
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
    if(this.outputText && this.outputText.length){
    const textArea = document.createElement('textarea');
    textArea.value = this.outputText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: 'Copied', detail: 'Output text copied to clipboard' });
    } else {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Not Copied', detail: 'May Be Empty Data! not Copied' });
    }
  }

  clearFields() {
    this.inputText = '';
    this.outputText = '';
    this.errorMessage = '';
  }
  
}
