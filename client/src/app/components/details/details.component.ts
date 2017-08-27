import {Component, OnInit} from '@angular/core';
import {GameDetailsService} from "../../services/game-detail.service";
import {Game} from "../../models/game.model";
import {GameDetail} from "../../models/game-detail.model";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  game: Game;
  gameDetail: GameDetail;
  releaseDate: string;
  constructor(private _gameDetailService: GameDetailsService,
              private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.game = JSON.parse(localStorage.getItem('game'));
      this._gameDetailService.getGameDetails(this.game.resource)
          .subscribe((res) => {
            if (res) {
              this.gameDetail = res;
              if (this.gameDetail.releaseDate) {
                const date = this.gameDetail.releaseDate.split('^');
                this.releaseDate = date[0];
              }
            }
          }, (err) => { console.log(err); });
    });
  }
}
