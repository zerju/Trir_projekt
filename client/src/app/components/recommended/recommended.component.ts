import {Component, NgZone, OnInit, Input} from '@angular/core';
import {Game} from '../../models/game.model';
import {FindSimilarService} from '../../services/find-similar.service';
import {Router} from '@angular/router';

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
  @Input() game: Game;

  recommended: Game[] = [];
  recommendedInput: Game[];

  constructor(private _router: Router, ngZone: NgZone,
              private _findSimilarService: FindSimilarService) {
    this.width = window.innerWidth;
    window.onresize =
        (e) => { ngZone.run(() => { this.width = window.innerWidth; }); };
  }

  ngOnInit() {
    if (this.game) {
      const temp = this.game.genre.split("@");
      this._findSimilarService.findSimilar(temp[0]).subscribe((res) => {
        if (res) {
          this.recommendedInput = res;
          this.numOfGames = Math.floor(this.width / 250);
          let temp = this.recommendedInput.concat([]);
          temp = temp.splice(this.start, this.numOfGames);
          this.recommended = temp;
        }
      }, (err) => { console.log(err); });
    }
  }

  onGameClick(game: Game) {
    console.log('trrt');
    localStorage.setItem('game', JSON.stringify(game));
    this._router.navigate(['/details'], {queryParams: {id: game.name}});
  }
  onPageUp() {
    if ((this.start + this.numOfGames) <= this.recommendedInput.length) {
      ++this.page;
      this.start = (this.page * this.numOfGames) + 1;
      let temp = this.recommendedInput.concat([]);
      temp = temp.splice(this.start, this.numOfGames);
      this.recommended = temp;
    }
  }

  onPageDown() {
    if ((this.page - 1) >= 0) {
      --this.page;
      this.start = (this.page * this.numOfGames) + 1;
      let temp = this.recommendedInput.concat([]);
      temp = temp.splice(this.start, this.numOfGames);
      this.recommended = temp;
    }
  }
}
