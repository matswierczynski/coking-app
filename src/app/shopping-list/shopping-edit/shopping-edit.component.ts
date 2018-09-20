import {
  Component, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form') inputForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.
    subscribe(
    (id: number) => {
      this.editedItemIndex = id;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(id);
      this.inputForm.setValue({
        productName: this.editedItem.name,
        productAmount: this.editedItem.amount
      });
    });
  }
  onAddItem() {
    const productName = this.inputForm.value.productName;
    const productAmount = this.inputForm.value.productAmount;
    const newIngredient = new Ingredient(productName, productAmount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex,
      ingredient: newIngredient}));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.inputForm.resetForm();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
