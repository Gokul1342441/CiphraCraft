import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PigpenCodeService {
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
}
