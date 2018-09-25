import {Injectable} from '@angular/core';
import {map, take, tap} from 'rxjs/operators';
import {Recipe} from '../recipies/recipe.model';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromRecipe from '../recipies/store/recipe.reducers';
import * as RecipeActions from '../recipies/store/recipe.actions';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}

  storeRecipes() {
    return this.store.select('recipes')
      .pipe(take(1))
      .subscribe( (recipeState: fromRecipe.State) => {
      const recipes = recipeState.recipes;
      return this.httpClient.put(
        'https://cooking-app-5b5c2.firebaseio.com/recipes.json',
        recipes).subscribe();
    });
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>('https://cooking-app-5b5c2.firebaseio.com/recipes.json')
      .pipe(map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe((recipes: Recipe[]) => {
        this.store.dispatch(new RecipeActions.SetRecipes(recipes));
      });
  }
}
