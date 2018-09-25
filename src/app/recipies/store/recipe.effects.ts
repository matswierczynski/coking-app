import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromRecipe from './recipe.reducers';
import {Injectable} from '@angular/core';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .pipe(ofType(RecipeActions.FETCH_RECIPES))
    .pipe(switchMap( (action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://cooking-app-5b5c2.firebaseio.com/recipes.json');
    }), map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
      ));
  @Effect({dispatch: false})
  recipeStore = this.actions$
    .pipe(ofType(RecipeActions.STORE_RECIPES))
    .pipe(withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', 'https://cooking-app-5b5c2.firebaseio.com/recipes.json',
          state.recipes);
        return this.httpClient.request(req);
      }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}
