import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  inEdit = false;
  editingIndex: number;
  editingIngredient: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.beginEditing.
      subscribe(
        (index: number) => {
          this.editingIndex = index;
          this.inEdit = true;
          this.editingIngredient = this.slService.getIngredientIndex(index);
          this.slForm.setValue({
            name: this.editingIngredient.name,
            amount: this.editingIngredient.amount
          })
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.inEdit) {
      this.slService.updateIngredient(this.editingIndex, newIngredient);
    } else {
        this.slService.addIngredient(newIngredient);
    }
    this.inEdit = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.inEdit = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editingIndex);
    this.onClear();
  }
}
