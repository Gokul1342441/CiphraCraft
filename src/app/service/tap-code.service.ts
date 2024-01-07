import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TapCodeService {
  private tapCodeMap: { [key: string]: string } = {
    'A': '. .', 'B': '. ..', 'C': '. ...', 'K': '. ...', 'D': '. ....',
    'E': '.. .', 'F': '.. ..', 'G': '.. ...', 'H': '.. ....', 'I': '... .',
    'J': '... ..', 'L': '... ...', 'M': '... ....', 'N': '.... .', 'O': '.... ..',
    'P': '.... ...', 'Q': '.... ....', 'R': '. .. .', 'S': '. .. ..', 'T': '. .. ...',
    'U': '. .. ....', 'V': '. ... .', 'W': '. ... ..', 'X': '. ... ...', 'Y': '. ... ....',
    'Z': '. .... .', '0': '. .... ..', '1': '. .... ...', '2': '. .... ....', '3': '.. . .',
    '4': '.. . ..', '5': '.. . ...', '6': '.. . ....', '7': '.. .. .', '8': '.. .. ..',
    '9': '.. .. ...', '.': '.. .. ....', ',': '.. ... .', '?': '.. ... ..', "'": '.. ... ...',
    '!': '.. ... ....', '/': '.. .... .', '(': '.. .... ..', ')': '.. .... ...', '&': '... . .',
    ':': '... . ..', ';': '... . ...', '=': '... .... ..', '+': '... .... ...', '-': '... .... ....',
    '_': '.... . .', '"': '.... . ..', '$': '.... . ...', '@': '.... . ....', ' ': ' '
  };

  textToTapCode(text: string): string {
    return text.split('').map(char => this.tapCodeMap[char.toUpperCase()] || char).join(' / ');
  }

  tapCodeToText(tapCode: string): string {
    const words = tapCode.split('/');
    return words
      .map(word => word.split(' ').map(code => this.reverseTapCodeMap[code] || code).join(''))
      .join(' ');
  }

  private get reverseTapCodeMap(): { [key: string]: string } {
    const reverseMap: { [key: string]: string } = {};
    for (const key in this.tapCodeMap) {
      if (this.tapCodeMap.hasOwnProperty(key)) {
        const tapCode = this.tapCodeMap[key];
        reverseMap[tapCode] = key;
        reverseMap[tapCode.replace(/\./g, '')] = key;
      }
    }
    return reverseMap;
  }
}
