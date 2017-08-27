import {Component, OnInit} from '@angular/core';
import {Game} from '../../models/game.model';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FindGamesService} from '../../services/find-games.service';
import {SearchGameService} from '../../services/search-game.service';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {
  games: Game[];
  allGames: Game[];

  sub: any;

  constructor(private _route: ActivatedRoute, private _router: Router,
              private _searchGameService: SearchGameService) {}

  ngOnInit() {
    this._route.queryParams.subscribe((params: Params) => {
      if (params['search']) {
        const search = params['search'];
        this.sub =
            this._searchGameService.searchGame(search).subscribe((res) => {
              if (res) {
                this.allGames = res;
                this.games = this.allGames.concat([]).slice(0, 10);
              }
            }, (err) => { console.log(err); });
      }
    });
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  onGameClick(game: Game) {
    localStorage.setItem('game', JSON.stringify(game));
    this._router.navigate(['/details'], {queryParams: {id: game.name}});
  }

  pageChange(event: any) {
    const size = event.pageSize;
    const index = event.pageIndex;
    const start = index * 10;
    this.games = this.allGames.concat([]).slice(start, start + size);
  }
}
