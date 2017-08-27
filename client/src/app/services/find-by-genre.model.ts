import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class FindByGenreService {
  constructor(private _http: Http) {
  }

  findByGenre(genre: string) {
    return this._http.get('http://127.0.0.1:8080/findByGenre?genre=' + genre).map((res) => res.json());
  }
}
