import { Component, OnInit } from '@angular/core';
import {FindGenresService} from '../../services/find-genres.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _findGenres: FindGenresService) { }

  ngOnInit() {
    this._findGenres.findGenres();
  }

}
