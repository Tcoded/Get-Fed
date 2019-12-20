import { Recipe } from './../recipe.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("Paleo Bowl", "Make a delicious low-carb bowl in under 20 minutes with this fool-proof recipe!", "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"),
    new Recipe("Banana Berry Toast", "Treat yourself this morning with a sweet and healthy combo of freshly-made toast layered with crisp blueberries and tangy bananas!", "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80")
  ];

  constructor() { }

  @Output() theRecipe = new EventEmitter<Recipe>()

  ngOnInit() {
  }

  onRecipeSelect(recipe: Recipe) {
    this.theRecipe.emit(recipe);
  }

}
