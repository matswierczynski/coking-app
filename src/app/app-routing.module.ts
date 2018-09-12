import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipiesComponent} from './recipies/recipies.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes' },
  { path: 'recipes', component: RecipiesComponent },
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