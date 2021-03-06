import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class FindGenresService {
  constructor(private _http: Http) {
  }

  findGenres() {
    return this._http.get('http://127.0.0.1:8080/findGenres').map((res) => res.json());
  }
}
