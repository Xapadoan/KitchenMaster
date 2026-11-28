import { CommonModule } from "@angular/common";
import { Component, model, signal } from "@angular/core";
import { FormField, type FormValueControl, form } from "@angular/forms/signals";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import {
	MatFormField,
	MatInput,
	MatLabel,
	MatSuffix,
} from "@angular/material/input";

@Component({
	selector: "app-menus-recipe-ids-input",
	imports: [
		CommonModule,
		MatIconModule,
		FormField,
		MatInput,
		MatFormField,
		MatChipsModule,
		MatButtonModule,
		MatIconModule,
		MatSuffix,
		MatLabel,
	],
	standalone: true,
	templateUrl: "./recipe-ids-input.html",
	styleUrl: "./recipe-ids-input.scss",
})
export class RecipeIdsInput implements FormValueControl<string[]> {
	readonly recipeIdToAddModel = signal("");
	readonly recipeIdToAdd = form(this.recipeIdToAddModel);
	readonly value = model<string[]>([]);

	addRecipeId() {
		const recipeId = this.recipeIdToAddModel();
		this.value.update((currentValues) => {
			if (!recipeId || currentValues.includes(recipeId)) {
				return currentValues;
			}
			return [...currentValues, recipeId];
		});
		this.recipeIdToAddModel.set("");
	}

	removeRecipeId(recipeIdToRemove: string) {
		this.value.update((model) => model.filter((r) => r !== recipeIdToRemove));
	}
}
