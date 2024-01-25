// morse-code.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class encodedecodeservice {
  private morseCodeMap: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
    '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
    ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
    '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
  };

  private phoneticAlphabetMap: { [key: string]: string } = {
    'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta',
    'E': 'Echo', 'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel',
    'I': 'India', 'J': 'Juliet', 'K': 'Kilo', 'L': 'Lima',
    'M': 'Mike', 'N': 'November', 'O': 'Oscar', 'P': 'Papa',
    'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
    'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray',
    'Y': 'Yankee', 'Z': 'Zulu',
    'a': 'Alpha', 'b': 'Bravo', 'c': 'Charlie', 'd': 'Delta',
    'e': 'Echo', 'f': 'Foxtrot', 'g': 'Golf', 'h': 'Hotel',
    'i': 'India', 'j': 'Juliet', 'k': 'Kilo', 'l': 'Lima',
    'm': 'Mike', 'n': 'November', 'o': 'Oscar', 'p': 'Papa',
    'q': 'Quebec', 'r': 'Romeo', 's': 'Sierra', 't': 'Tango',
    'u': 'Uniform', 'v': 'Victor', 'w': 'Whiskey', 'x': 'X-ray',
    'y': 'Yankee', 'z': 'Zulu',
    '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
    '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine',
    '.': 'Point', ',': 'Comma', '?': 'Question Mark', "'": 'Apostrophe',
    '!': 'Exclamation Mark', '/': 'Slash', '(': 'Open Parenthesis',
    ')': 'Close Parenthesis', '&': 'Ampersand', ':': 'Colon',
    ';': 'Semicolon', '=': 'Equals', '+': 'Plus', '-': 'Hyphen',
    '_': 'Underscore', '"': 'Double Quotation Mark', '$': 'Dollar Sign',
    '@': 'At Sign'
  };

  private pigpenCodeMap: { [key: string]: string } = {
    'A': '▢', 'B': '△', 'C': '▽', 'D': '◯', 'E': '▽', 'F': '△',
    'G': '▢', 'H': '◯', 'I': '△', 'J': '▢▽', 'K': '▽▢', 'L': '▢△',
    'M': '▽◯', 'N': '▽▢', 'O': '▢▽', 'P': '△▢', 'Q': '△▽', 'R': '▢◯',
    'S': '△◯', 'T': '◯▢', 'U': '◯▽', 'V': '▽△', 'W': '▽△', 'X': '△◯',
    'Y': '△▽', 'Z': '▽△',
    'a': '▢', 'b': '△', 'c': '▽', 'd': '◯', 'e': '▽', 'f': '△',
    'g': '▢', 'h': '◯', 'i': '△', 'j': '▢▽', 'k': '▽▢', 'l': '▢△',
    'm': '▽◯', 'n': '▽▢', 'o': '▢▽', 'p': '△▢', 'q': '△▽', 'r': '▢◯',
    's': '△◯', 't': '◯▢', 'u': '◯▽', 'v': '▽△', 'w': '▽△', 'x': '△◯',
    'y': '△▽', 'z': '▽△',
    '0': '▢▢', '1': '▢△', '2': '▢▽', '3': '△▢', '4': '△△', '5': '△▽',
    '6': '▽▢', '7': '▽▽', '8': '▽△', '9': '△◯',
    '.': '▽▽◯', ',': '▢▢▽▽', '?': '▢▢△▢', "'": '▽▽△▢', '!': '△▢▢▽',
    '/': '▢▢▽▽', '(': '▢▽▽▽', ')': '▢▽▽▢', '&': '▽▽▢▢', ':': '△▢▢▢',
    ';': '▢▢△▽', '=': '▢▢△▢', '+': '▽▽▢▽', '-': '▢▽▽▽', '_': '▽▽△▢',
    '"': '▢▽▢▽', '$': '△▽▢▽', '@': '▽▽▢▽'
  };

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


// Morse
  textToMorse(text: string): string {
    return text.toUpperCase().split('').map(char => this.morseCodeMap[char] || char).join(' ');
  }

  morseToText(morse: string): string {
    const morseArray = morse.split(' ');
    const textArray = morseArray.map(code => {
      for (const [key, value] of Object.entries(this.morseCodeMap)) {
        if (value === code) {
          return key;
        }
      }
      return code; // If code is not found, keep it as is
    });
    return textArray.join('');
  }

// PhoeticAlphabet
  textToPhoneticAlphabet(text: string): string {
    return text.split('').map(char => this.phoneticAlphabetMap[char] || char).join(' ');
  }

  phoneticAlphabetToText(phoneticAlphabet: string): string {
    const reverseMap: { [key: string]: string } = {};
    for (const key in this.phoneticAlphabetMap) {
      if (this.phoneticAlphabetMap.hasOwnProperty(key)) {
        reverseMap[this.phoneticAlphabetMap[key]] = key;
      }
    }

    return phoneticAlphabet.split(' ').map(symbol => reverseMap[symbol] || symbol).join('');
  }

// PigPen
  textToPigpen(text: string): string {
    return text.split('').map(char => this.pigpenCodeMap[char] || char).join('');
  }

  pigpenToText(pigpen: string): string {
    const reversedMap: { [key: string]: string } = {};
    
    Object.entries(this.pigpenCodeMap).forEach(([key, value]) => {
      reversedMap[value] = key;
    });

    const textArray = pigpen.split('');
    const text = textArray.map(symbol => reversedMap[symbol] || symbol).join('');
    return text;
  }

// Tapcode
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
