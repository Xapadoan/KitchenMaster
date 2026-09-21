import { Component, input } from "@angular/core";
import {
	formatIngredient,
	type Ingredient,
	type Recipe,
} from "../interfaces/recipe.interface";

@Component({
	selector: "app-recipe-tab",
	imports: [],
	styles: `
  .ingredients-box {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .ingredient {
    margin: 5px;
  }`,
	template: `<article>
    <section>
      <h3>Ingredients</h3>
      <div class="ingredients-box">
        @for (ingredient of this.recipe().ingredients; track $index) {
        <p class="ingredient">{{ this.writeIngredient(ingredient) }}</p>
        }
      </div>
      <h3>Steps</h3>
      @for (step of this.recipe().steps; track $index) {
      <p>{{ step }}</p>
      }
    </section>
  </article> `,
})
export class RecipeTab {
	recipe = input.required<Recipe>();

	writeIngredient(i: Ingredient) {
		return formatIngredient(i);
	}
}
