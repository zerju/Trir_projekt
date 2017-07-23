import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onGenresClick(){
    this._router.navigateByUrl('/search/genres');
  }
  onNamesClick(){
    this._router.navigate(['/search/list'],{queryParams : {all: true}});
  }

}
