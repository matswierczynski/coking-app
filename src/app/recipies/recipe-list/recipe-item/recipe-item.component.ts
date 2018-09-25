import { Component, OnInit, Input } from '@angular/core';

import * as fromRecipe from '../../store/recipe.reducers';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  @Input() index: number;

  constructor(private store: Store<fromRecipe.FeatureState>) {}
  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }
}
