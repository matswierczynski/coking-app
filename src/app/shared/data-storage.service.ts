import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipies/recipe.service';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Recipe} from '../recipies/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put(
      'https://cooking-app-5b5c2.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get('https://cooking-app-5b5c2.firebaseio.com/recipes.json')
      .pipe(map(
        (response: Response ) => {
          const recipes: Recipe[] =  response.json();
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
        this.recipeService.setRecipes(recipes);
      });
  }
}
