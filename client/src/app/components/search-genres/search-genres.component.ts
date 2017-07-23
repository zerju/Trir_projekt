import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-genres',
  templateUrl: './search-genres.component.html',
  styleUrls: ['./search-genres.component.scss']
})
export class SearchGenresComponent implements OnInit {

  genres: {name: string, image: string}[] = [
    {name: 'action', image: 'https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAANuAAAAJDExMzgxODg1LWE1NDItNDhhNi05YmRkLWYyYjkxYTEyYjQzMg.jpg'},
    {name: 'strategy', image: 'https://www.pcgamesn.com/sites/default/files/best%20strategy%20games%20StarCraft%20II_0.jpg'},
    {name: 'survival', image: 'https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/r/s/z/rsz-survive-92589.jpg'},
    {name: 'sports', image: 'http://media1.gameinformer.com/imagefeed/featured/bertzblog/SportsGOTY/2012/FIFA%20Franchise.jpg'}
  ];

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onGenreClick(genre: string){
    this._router.navigate(['/search/list'],{queryParams: {genre: genre}});
  }
}
