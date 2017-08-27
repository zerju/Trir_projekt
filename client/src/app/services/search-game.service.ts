import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class SearchGameService {
  constructor(private _http: Http) {}

  searchGame(search: string) {
    return this._http.get('http://127.0.0.1:8080/search?search=' + search)
        .map((res) => res.json());
  }
}
