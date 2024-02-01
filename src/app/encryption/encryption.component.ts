import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { EncryptionService } from '../service/encryption.service';
import * as ace from "ace-builds";

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrl: './encryption.component.css'
})
export class EncryptionComponent implements AfterViewInit {
  @ViewChild('drawerToggle') drawerToggle!: ElementRef<HTMLInputElement>;
  @ViewChild("editor") private editor !: ElementRef<HTMLElement>;

  
  selectedMethod: string = 'AES';
  selectedOperation: string = 'encode';
  key: string = '';
  inputText: string = '';
  outputText: string = '';
  errorMessage: string = '';

  constructor(
    private encryptservice: EncryptionService
  ) { }


  ngAfterViewInit(): void {
    ace.config.set("fontSize", "20px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");
    aceEditor.setTheme("ace/theme/textmate");
    aceEditor.session.setMode("ace/mode/yaml");
    aceEditor.on("change", () => {
      console.log(aceEditor.getValue());
    });
  }


  closeDrawer() {
    if (this.drawerToggle.nativeElement.checked) {
      this.drawerToggle.nativeElement.checked = false;
    }
  }

  EncryptionAlgorithms() {
    this.errorMessage = '';

    try {
      switch (this.selectedMethod) {
        case 'AES':
          if (this.selectedOperation === 'Encryption') {
            this.outputText = this.encryptservice.aesEncrypt(this.inputText, this.key)
          } else if (this.selectedOperation === 'Decryption') {
            this.outputText = this.encryptservice.aesDecrypt(this.inputText, this.key)
          }
          break;
        case 'DES':
          if (this.selectedOperation === 'Encryption') {
            this.outputText = this.encryptservice.desEncrypt(this.inputText, this.key)
          } else if (this.selectedOperation === 'Decryption') {
            this.outputText = this.encryptservice.desDecrypt(this.inputText, this.key)
          }
          break;
        case 'TripleDES':
          if (this.selectedOperation === 'Encryption') {
            this.outputText = this.encryptservice.tridesEncrypt(this.inputText, this.key)
          } else if (this.selectedOperation === 'Decryption') {
            this.outputText = this.encryptservice.tridesDecrypt(this.inputText, this.key)
          }
          break;
      }
    } catch (error) {
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
