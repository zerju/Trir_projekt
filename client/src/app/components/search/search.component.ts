import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private _router: Router) {}
  searchCtrl = new FormControl();
  form: FormGroup;
  ngOnInit() {}

  onGenresClick() { this._router.navigateByUrl('/search/genres'); }
  onNamesClick() {
    this._router.navigate(['/search/list'], {queryParams: {all: true}});
  }

  submit() {
    console.log(this.searchCtrl.value);
    localStorage.setItem('search', JSON.stringify(this.searchCtrl.value));
    this._router.navigate(['/search/s'],
                          {queryParams: {search: this.searchCtrl.value}});
  }
}
