import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit, OnDestroy {

  games: {name: string, genre: string}[] = [
    {name: 'Call of Duty', genre: 'FPS'},
    {name: 'FIFA 17', genre: 'Sports'},
    {name: 'Civ 5', genre: 'Strategy'},
    {name: 'Skyrim', genre: 'Fantasy'},
    {name: 'Grand Theft Auto V', genre: 'Action'},
    {name: 'Minecraft', genre: 'Survival'}
];

  sub: any;
  inputGenre: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
    this.sub = this._route
      .queryParams
      .subscribe(params => {
        if(params.genre){
          console.log(params.genre);
          this.inputGenre = this.capitalizeFirstLetter(params.genre);
        }else if(params.all){
          this.inputGenre = undefined;
          this.games = _.orderBy(this.games, ['name'], ['asc']);
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  onGameClick(game: any){
    this._router.navigate(['/details'], {queryParams:{id: game.name}});
  }


}
