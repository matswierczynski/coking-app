import {Injectable} from '@angular/core';
import {RecipeService} from '../recipies/recipe.service';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipies/recipe.model';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Params} from '@angular/router';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    return this.httpClient.put(
      'https://cooking-app-5b5c2.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
    // const req = new HttpRequest('PUT', 'https://cooking-app-5b5c2.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //     reportProgress: true,
    //     params: new HttpParams().set('auth', token)});
    // return this.httpClient.request(req); for custom HttpRequest
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
