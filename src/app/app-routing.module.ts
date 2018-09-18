import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipiesComponent} from './recipies/recipies.component';
import {RecipeDetailComponent} from './recipies/recipe-detail/recipe-detail.component';
import {RecipeDetailBlankComponent} from './recipies/recipe-detail-blank/recipe-detail-blank.component';
import {RecipeDetailResolverService} from './recipies/recipe-detail/recipe-detail-resolver.service';
import {RecipeEditComponent} from './recipies/recipe-edit/recipe-edit.component';
import {SignupComponent} from './auth/signup/signup.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes',
    component: RecipiesComponent,
    children: [
      {path: '', component: RecipeDetailBlankComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeDetailResolverService}},
      {path: ':id/edit', component: RecipeEditComponent},
    ]},
  { path: 'shopping-list', component: ShoppingListComponent},
  { path: 'signup', component: SignupComponent},
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
