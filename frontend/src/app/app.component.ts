import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayFiles: string[] = [];
  // TODO: what type is returned? Not sure
  @ViewChild('fileUploadInput')
  fileUploadInput!: { nativeElement: HTMLInputElement };

  fileApiSegment = '/file';

  constructor(public http: HttpClient) {
    // @ts-ignore
    this.modernizr = (window as unknown).Modernizr;
  }

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.http.get(this.fileApiSegment).subscribe((val: Object) => {
      this.displayFiles = val as string[];
    });
  }

  async uploadFiles() {
    const files: FileList | null = this.fileUploadInput.nativeElement.files;
    if (!files || files.length === 0) {
      console.log('No files to upload');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      console.log(file);
      const fileArrayBuffer = await file?.arrayBuffer();
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'text/plain',
      });
      this.http
        .put(`${this.fileApiSegment}/${file?.name}`, fileArrayBuffer, {
          headers: httpHeaders,
        })
        .subscribe(() => {
          this.loadFiles();
        });
    }
  }
}
