import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipe.reducers';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {DeleteRecipe} from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeState = this.store.select('recipes');
        });
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(
          recipeState.recipes[this.id].ingredients));
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteClicked() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['..'], {relativeTo: this.route});
  }

}
