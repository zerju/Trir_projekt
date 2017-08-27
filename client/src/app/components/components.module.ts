import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  MdInputModule, MdCardModule, MdButtonModule, MdIconModule, MdPaginatorModule,
  MdAutocompleteModule, MdProgressSpinnerModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {DetailsComponent} from './details/details.component';
import {HomeComponent} from './home/home.component';
import {NavigationComponent} from './navigation/navigation.component';
import {RecommendedComponent} from './recommended/recommended.component';
import {SearchComponent} from './search/search.component';
import {SearchDetailsComponent} from 'app/components/search-details/search-details.component';
import {SearchGenresComponent} from './search-genres/search-genres.component';
import {RouterModule} from '@angular/router';
import {GamesListComponent} from './games-list/games-list.component';
import {FindGenresService} from '../services/find-genres.service';
import {FindGamesService} from '../services/find-games.service';
import {FindByGenreService} from '../services/find-by-genre.model';
import {GameDetailsService} from '../services/game-detail.service';
import {ReactiveFormsModule} from "@angular/forms";

const COMPONENTS: any[] = [
  SearchComponent, DetailsComponent, RecommendedComponent, NavigationComponent,
  HomeComponent, SearchDetailsComponent, SearchGenresComponent, GamesListComponent
];

@NgModule(
    {imports: [CommonModule, MdInputModule, MdCardModule, FlexLayoutModule, RouterModule,
      MdIconModule, MdButtonModule, MdPaginatorModule, ReactiveFormsModule, MdAutocompleteModule,MdProgressSpinnerModule], declarations: COMPONENTS, exports: COMPONENTS,
    providers:[FindGenresService, FindGamesService, FindByGenreService, GameDetailsService]})
export class ComponentsModule {
}
