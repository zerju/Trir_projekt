import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class FindGamesService {
  constructor(private _http: Http) {
  }

  findGames() {
    return this._http.get('http://127.0.0.1:8080/findAll').map((res) => res.json());
  }
}
