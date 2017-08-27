import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Genre} from "../../models/genre.model";
import {FindGenresService} from "../../services/find-genres.service";
import {FindByGenreService} from "../../services/find-by-genre.model";
import 'rxjs/add/operator/startWith';

import {Observable} from 'rxjs/Observable';
import {Game} from "../../models/game.model";

@Component({
  selector: 'app-search-genres',
  templateUrl: './search-genres.component.html',
  styleUrls: ['./search-genres.component.scss']
})
export class SearchGenresComponent implements OnInit {

  genres: Genre[];
  filteredGenres: Observable<Genre[]>;
  games: Game[];
  allGames: Game[];

  genreCtrl = new FormControl();
  constructor(private _router: Router, private _findGenresService: FindGenresService,
  private _findByGenreService: FindByGenreService) {

  }

  ngOnInit() {
    this._findGenresService.findGenres().subscribe((res) => {
      if(res){
        this.genres = res;
        this.filteredGenres =
          this.genreCtrl.valueChanges.startWith(null)
            .map(
              genre => genre && typeof genre === 'object' ?
                genre.name :
                genre)
            .map(name => name ? this.filter(name) : this.genres.slice());
      }
    },(err) => {console.log(err); });
  }

  filter(val: string): Genre[] {
    return this.genres.filter(
      option => new RegExp(`^${val}`, 'gi').test(option.name));
  }

  findGames(){
    const name = this.genreCtrl.value.split('@');

    this._findByGenreService.findByGenre(name[0]).subscribe((res) => {
      if(res){
        this.allGames = res;
        this.games = this.allGames.concat([]).slice(0, 10);
      }
    },(err) => {console.log(err);});
  }
  pageChange(event: any) {
    const size = event.pageSize;
    const index = event.pageIndex;
    const start = index * 10;
    this.games = this.allGames.concat([]).slice(start, start + size);
  }
  onGameClick(game: Game){
    localStorage.setItem('game', JSON.stringify(game));
    this._router.navigate(['/details'], {queryParams:{id: game.name}});
  }

}
