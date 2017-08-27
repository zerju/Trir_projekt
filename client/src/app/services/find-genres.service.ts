import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class FindGenresService {
  constructor(private _http: Http) {
  }

  findGenres() {
    this._http.get('http://127.0.0.1:8080/findGenres').subscribe((res)=>{
      console.log(res);
    });
  }
}
