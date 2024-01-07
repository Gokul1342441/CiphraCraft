import { Component } from '@angular/core';
import { MorseCodeService } from '../service/morse-code.service';
import { PigpenCodeService } from '../service/pigpen-code.service';
import { PhoneticAlphabetService } from '../service/phonetic-alphabet.service';
import { TapCodeService } from '../service/tap-code.service';


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
    private morseCodeService: MorseCodeService,
    private pigpenCodeService: PigpenCodeService,
    private phoneticAlphabetservice: PhoneticAlphabetService,
    private tapcodeservice: TapCodeService
  ) { }

  encodeDecode() {
    this.errorMessage = '';

    try {
      switch (this.selectedMethod) {
        case 'morse':
          if (this.selectedOperation === 'encode') {
            this.outputText = this.morseCodeService.textToMorse(this.inputText);
          } else if (this.selectedOperation === 'decode') {
            this.outputText = this.morseCodeService.morseToText(this.inputText);
          }
          break;
        case 'pigpen':
          if (this.selectedOperation === 'encode') {
            this.outputText = this.pigpenCodeService.textToPigpen(this.inputText);
          } else if (this.selectedOperation === 'decode') {
            this.outputText = this.pigpenCodeService.pigpenToText(this.inputText);
          }
          break;
        case 'phoneticalphabet':
          if (this.selectedOperation === 'encode') {
            this.outputText = this.phoneticAlphabetservice.textToPhoneticAlphabet(this.inputText);
          } else if (this.selectedOperation === 'decode') {
            this.outputText = this.phoneticAlphabetservice.phoneticAlphabetToText(this.inputText);
          }
          break;
        case 'tapcodeservice':
          if(this.selectedOperation === 'encode'){
            this.outputText= this.tapcodeservice.textToTapCode(this.inputText);
          } else if (this.selectedOperation === 'decode'){
            this.outputText= this.tapcodeservice.tapCodeToText(this.inputText);
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
}
