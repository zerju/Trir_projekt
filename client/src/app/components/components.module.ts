import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search/search.component';
import {DetailsComponent} from './details/details.component';
import {RecommendedComponent} from './recommended/recommended.component';
import {NavigationComponent} from './navigation/navigation.component';
import {HomeComponent} from './home/home.component';

const COMPONENTS: any[] = [
  SearchComponent,
  DetailsComponent,
  RecommendedComponent,
  NavigationComponent,
  HomeComponent
];

@NgModule(
    {imports: [CommonModule], declarations: COMPONENTS, exports: COMPONENTS})
export class ComponentsModule {
}
