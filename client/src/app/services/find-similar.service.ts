import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class FindSimilarService {
  constructor(private _http: Http) {}

  findSimilar(similar: string) {
    return this._http.get('http://127.0.0.1:8080/findSimilar?similar=' +
                          similar)
        .map((res) => res.json());
  }
}
