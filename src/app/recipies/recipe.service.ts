import {Recipe} from './recipe.model';
import { Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipe: Recipe;
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe [];
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    this.recipe = Object.assign({}, this.recipes[id]);
    return this.recipe;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
