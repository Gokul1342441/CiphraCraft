import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { EncryptionService } from '../service/encryption.service';
import { MessageService } from 'primeng/api';
import JSONFormatter from 'json-formatter-js';
import * as ace from "ace-builds";

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrl: './encryption.component.css',
  providers: [MessageService]
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
  sidebarVisible: boolean = false;
  formattedOutputText: string = '';
  jsonFormatter: any;


  constructor(
    private encryptservice: EncryptionService,
    private messageService: MessageService
  ) { }


  ngAfterViewInit(): void {

  }


  json() {
    if (this.outputText && this.outputText.trim() !== '') {
      try {
        const parsedJson = JSON.parse(this.outputText);
        this.formattedOutputText = JSON.stringify(parsedJson, null, 2);
        this.jsonFormatter = new JSONFormatter(parsedJson);
        this.sidebarVisible = true;
      } catch (error) {
        console.error('Error parsing JSON:', error);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Invalid JSON', detail: 'Output is not valid JSON' });
      }
    } else {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Empty', detail: 'Output is Empty' });
    }
  }
  


  closeDrawer() {
    // if (this.drawerToggle.nativeElement.checked) {
      this.drawerToggle.nativeElement.checked = false;
    // }
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
    this.key = "";
  }

}
