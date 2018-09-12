import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipiesComponent} from './recipies/recipies.component';
import {RecipeDetailComponent} from './recipies/recipe-detail/recipe-detail.component';
import {RecipeDetailBlankComponent} from './recipies/recipe-detail-blank/recipe-detail-blank.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes',
    component: RecipiesComponent,
    children: [
      {path: '', component: RecipeDetailBlankComponent},
      {path: ':id', component: RecipeDetailComponent}
    ]},
  { path: 'shopping-list', component: ShoppingListComponent},
  ];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
