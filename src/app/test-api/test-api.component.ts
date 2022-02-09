import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.scss']
})
export class TestApiComponent implements OnInit {

  tests: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTestData();
  }

// méthode qui appelle l'api depuis le backend de notre application
  getTestData = async () => {
    const url = 'http://localhost:9090/api/v1/tests';
    this.http.get(url).subscribe((data) => {
      this.tests = data;
    });
  }

}