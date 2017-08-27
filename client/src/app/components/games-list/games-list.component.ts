import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FindGamesService} from "../../services/find-games.service";
import {Game} from "../../models/game.model";

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit, OnDestroy {

  games: Game[];
  allGames: Game[];

  sub: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router, private _findGamesService: FindGamesService) {}

  ngOnInit() {
    this.sub = this._findGamesService.findGames().subscribe((res) => {
      if(res){
        this.allGames = res;
        this.games = this.allGames.concat([]).slice(0, 10);
      }
    },(err) => {console.log(err);});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onGameClick(game: Game){
    localStorage.setItem('game', JSON.stringify(game));
    this._router.navigate(['/details'], {queryParams:{id: game.name}});
  }

  pageChange(event: any) {
    const size = event.pageSize;
    const index = event.pageIndex;
    const start = index * 10;
    this.games = this.allGames.concat([]).slice(start, start + size);
  }


}
