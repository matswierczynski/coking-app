import {
  Component, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

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
  constructor(private shoppingListService: ShoppingListService) { }

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
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.inputForm.resetForm();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
