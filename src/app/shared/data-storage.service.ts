import {Injectable} from '@angular/core';
import {RecipeService} from '../recipies/recipe.service';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipies/recipe.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    return this.httpClient.put(
      'https://cooking-app-5b5c2.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
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
        this.recipeService.setRecipes(recipes);
      });
  }
}
