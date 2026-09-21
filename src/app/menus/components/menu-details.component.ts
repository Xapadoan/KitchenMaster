import {
	Component,
	Inject,
	inject,
	type OnInit,
	signal,
	type WritableSignal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from "@angular/material/dialog";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { RecipeTab } from "../../recipes/components/recipe-tab.component";
import type { Recipe } from "../../recipes/interfaces/recipe.interface";
import { HttpRecipeRepository } from "../../recipes/repositories/http-recipe-repository";
import type { IRecipeRepository } from "../../recipes/repositories/recipes-repository.interface";
import type { MealMenu } from "../interfaces/menu.interface";

@Component({
	selector: "app-menu-details",
	imports: [
		MatButtonModule,
		MatDialogActions,
		MatDialogClose,
		MatDialogContent,
		MatDialogTitle,
		MatTab,
		MatTabGroup,
		RecipeTab,
	],
	styles: ``,
	template: `<h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      @if (this.recipes() && this.recipes().length > 0) {
      <mat-tab-group>
        @for (recipe of this.recipes(); track $index) {
        <mat-tab label="{{ recipe.name }}">
          <app-recipe-tab [recipe]="recipe"></app-recipe-tab>
        </mat-tab>
        }
      </mat-tab-group>
      } @else {
      <p>No recipes</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions
      ><button matButton="elevated" mat-dialog-close>
        Close
      </button></mat-dialog-actions
    >`,
})
export class MenuDetails implements OnInit {
	readonly dialogRef = inject(MatDialogRef<MenuDetails>);
	readonly data = inject<MealMenu>(MAT_DIALOG_DATA);
	recipes: WritableSignal<Recipe[]> = signal([]);

	constructor(
		@Inject(HttpRecipeRepository)
		private readonly repository: IRecipeRepository,
	) {}

	private async loadRecipes() {
		if (!this.data.recipeIds || this.data.recipeIds.length < 1) {
			return;
		}
		const results = await Promise.all(
			this.data.recipeIds.map((id) => this.repository.get(id)),
		);

		const okRecipes: Recipe[] = [];
		results.forEach((recipeResult) => {
			if (recipeResult.isOk()) {
				okRecipes.push(recipeResult.unwrap());
			} else {
				console.error(recipeResult.unwrapErr());
			}
		});
		this.recipes.set(okRecipes);
	}

	ngOnInit(): void {
		this.loadRecipes();
	}
}
