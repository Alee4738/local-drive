import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  files: string[] = [];

  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.http.get('/file').subscribe((val: Object) => {
      this.files = val as string[];
    });
  }
}
