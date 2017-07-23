import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {

  width: any;
  numOfGames: number;
  page = 0;
  start = 1;
  end: number;

  recommended: {name: string, image: string, year: number}[] = [];
  recommendedInput: {name: string, image: string, year: number}[] = [
    {name: 'action', image: 'https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAANuAAAAJDExMzgxODg1LWE1NDItNDhhNi05YmRkLWYyYjkxYTEyYjQzMg.jpg', year: 2007},
    {name: 'strategy', image: 'https://www.pcgamesn.com/sites/default/files/best%20strategy%20games%20StarCraft%20II_0.jpg', year: 2010},
    {name: 'survival', image: 'https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/r/s/z/rsz-survive-92589.jpg', year: 2001},
    {name: 'sports', image: 'http://media1.gameinformer.com/imagefeed/featured/bertzblog/SportsGOTY/2012/FIFA%20Franchise.jpg', year: 1994},
    {name: 'sports', image: 'http://media1.gameinformer.com/imagefeed/featured/bertzblog/SportsGOTY/2012/FIFA%20Franchise.jpg', year: 1994},
    {name: 'sports', image: 'http://media1.gameinformer.com/imagefeed/featured/bertzblog/SportsGOTY/2012/FIFA%20Franchise.jpg', year: 1994},
    {name: 'sports', image: 'http://media1.gameinformer.com/imagefeed/featured/bertzblog/SportsGOTY/2012/FIFA%20Franchise.jpg', year: 1994},
    {name: 'sports', image: 'http://media1.gameinformer.com/imagefeed/featured/bertzblog/SportsGOTY/2012/FIFA%20Franchise.jpg', year: 1994},
    {name: 'sports', image: 'http://media1.gameinformer.com/imagefeed/featured/bertzblog/SportsGOTY/2012/FIFA%20Franchise.jpg', year: 1994},
    {name: 'sports', image: 'http://media1.gameinformer.com/imagefeed/featured/bertzblog/SportsGOTY/2012/FIFA%20Franchise.jpg', year: 1994},
    {name: 'sports', image: 'http://media1.gameinformer.com/imagefeed/featured/bertzblog/SportsGOTY/2012/FIFA%20Franchise.jpg', year: 1994},
    {name: 'sports', image: 'http://media1.gameinformer.com/imagefeed/featured/bertzblog/SportsGOTY/2012/FIFA%20Franchise.jpg', year: 1994},
    {name: 'sports', image: 'http://media1.gameinformer.com/imagefeed/featured/bertzblog/SportsGOTY/2012/FIFA%20Franchise.jpg', year: 1994},
  ];

  constructor() {
    this.width = window.screen.width;

  }

  ngOnInit() {
    this.numOfGames = Math.floor(this.width / 250);
    this.end = this.numOfGames;
    let temp = this.recommendedInput.concat([]);
    temp = temp.splice(this.start, this.end);
    this.recommended = temp;
  }

  onPageUp() {
    if (((this.page * this.numOfGames) + 1) < this.numOfGames){
      ++this.page;
      this.start = (this.page * this.numOfGames) + 1;
      this.end = this.start + this.numOfGames - 1 ;
      let temp = this.recommendedInput.concat([]);
      temp = temp.splice(this.start, this.end);
      this.recommended = temp;
    }
  }

  onPageDown() {
    if ((this.page - 1) >= 0) {
      --this.page;
      this.start = (this.page * this.numOfGames) + 1;
      this.end = this.start + this.numOfGames - 1;
      let temp = this.recommendedInput.concat([]);
      temp = temp.splice(this.start, this.end);
      this.recommended = temp;
    }
  }
}
