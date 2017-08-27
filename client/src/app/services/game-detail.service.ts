import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class GameDetailsService {
  constructor(private _http: Http) {
  }

  getGameDetails(resource: string) {
    return this._http.get('http://127.0.0.1:8080/details?resource=' + resource).map((res) => res.json());
  }
}
