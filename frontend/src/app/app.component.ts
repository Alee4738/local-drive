import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayFiles: string[] = [];
  fileApiSegment = '/file';
  filesToUpload: any;
  statusMessage: string = '';

  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.reloadFiles();
  }

  reloadFiles() {
    this.http.get(this.fileApiSegment).subscribe((val: Object) => {
      this.displayFiles = val as string[];
    });
  }

  async uploadFiles(event: Event) {
    const inputElt = event.target as HTMLInputElement;
    const files: FileList | null = inputElt.files;
    if (!files || files.length === 0) {
      console.log('No files to upload');
      return;
    }

    const uploads = [];
    this.statusMessage = 'Uploading...';
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      console.log(file);
      const fileArrayBuffer = await file?.arrayBuffer();
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'text/plain',
      });
      uploads.push(
        this.http.put(`${this.fileApiSegment}/${file?.name}`, fileArrayBuffer, {
          headers: httpHeaders,
        })
      );
    }
    forkJoin(uploads).subscribe(() => {
      this.statusMessage = '';
      this.filesToUpload = undefined;
      this.reloadFiles();
    });
  }

  deleteFile(file: string) {
    this.statusMessage = 'Deleting...';
    this.http.delete(`${this.fileApiSegment}/${file}`).subscribe(() => {
      console.log(`Deleted ${file}`);
      this.statusMessage = '';
      this.reloadFiles();
    });
  }
}
