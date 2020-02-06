import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class BookService  {
  private apiKey = 'AIzaSyBgmJ1ORrx7WXlsNPJmBFuFwIBIXhVfTCk';
  private apiEndPoint = `https://www.googleapis.com/books/v1/volumes?key=${this.apiKey}`;

  constructor(private http: Http) {}

  getData(apiURL) {
    return this.http.get(apiURL).map((response: Response) => response.json());
  }

  getBooks(maxResults: number = 40, inauthor: string) {
    const author = encodeURI(inauthor);
    const apiURL = `${this.apiEndPoint}&q=inauthor:${author}&maxResults=${maxResults}`;
    return this.getData(apiURL);
  }

  getBook(id) {
    const apiURL = `${this.apiEndPoint}&q=id:${id}`;
    return this.getData(apiURL);
  }
}
