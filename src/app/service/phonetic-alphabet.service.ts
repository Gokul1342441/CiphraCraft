import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneticAlphabetService {
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
}
