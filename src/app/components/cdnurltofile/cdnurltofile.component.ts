import { Component } from '@angular/core';
import { cdndownloadservice } from '../../service/cdndownload.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cdnurltofile',
  templateUrl: './cdnurltofile.component.html',
  styleUrl: './cdnurltofile.component.css',
  providers:[MessageService]
})
export class CdnurltofileComponent {
  customUrl: string = '';
  filename: string = '';

  constructor(private fileDownloadService: cdndownloadservice, private messageService: MessageService) {}

  downloadFile() {
    if (this.customUrl && this.filename) {
      this.fileDownloadService.downloadFile(this.customUrl, this.filename);
      this.messageService.add({ severity: 'success', summary: 'Download', detail: 'File downloaded successfully.'});
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please provide a valid URL and filename.' });
    }
  }
  clear(){
    this.customUrl = "";
    this.filename = "";
  }
}
