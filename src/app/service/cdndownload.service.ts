import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class cdndownloadservice {

    constructor(private http: HttpClient) { }

    downloadFile(url: string, filename: string) {
      this.http.get(url, { responseType: 'text' }).subscribe(data => {
        this.saveFile(data, filename);
      });
    }
  
    private saveFile(data: any, filename: string) {
      const blob = new Blob([data], { type: 'text/javascript' });
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
}

