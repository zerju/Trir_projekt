import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SearchGenresComponent} from './components/search-genres/search-genres.component';
import {SearchComponent} from "./components/search/search.component";
import {GamesListComponent} from "./components/games-list/games-list.component";
import {DetailsComponent} from "./components/details/details.component";

export const routes: Routes =
    [{path: '', children: [{path: '', component: HomeComponent},
      {path: 'search', children: [{path: '', component: SearchComponent},
        {path: 'genres', component: SearchGenresComponent},
        {path: 'list', component: GamesListComponent}] },
      {path: 'details', component: DetailsComponent}]}];
