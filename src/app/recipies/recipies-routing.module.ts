import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipiesComponent} from './recipies.component';
import {RecipeDetailBlankComponent} from './recipe-detail-blank/recipe-detail-blank.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeDetailResolverService} from './recipe-detail/recipe-detail-resolver.service';

const recipesRoutes: Routes = [
  { path: 'recipes',
    component: RecipiesComponent,
    children: [
      {path: '', component: RecipeDetailBlankComponent},
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService]},
      {path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeDetailResolverService}},
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] },
    ]},
]
@NgModule({
  imports:
    [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
  })
export class RecipesRoutingModule {
}
