import {NgModule} from '@angular/core';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeDetailBlankComponent} from './recipe-detail-blank/recipe-detail-blank.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipiesComponent} from './recipies.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RecipesRoutingModule} from './recipies-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {recipeReducers} from './store/recipe.reducers';

@NgModule({
  declarations: [
    RecipiesComponent,
    RecipeItemComponent,
    RecipeDetailBlankComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducers)
  ]
})
export class RecipesModule {

}
