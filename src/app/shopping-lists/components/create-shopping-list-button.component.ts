import { Component, Input, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import type { WeekMenu } from "../../menus/interfaces/menu.interface";
import type { CreateShoppingListParams } from "../interface/create-shopping-list.interface";
import { ShoppingListDialog } from "./shopping-list-dialog.component";

@Component({
	selector: "app-create-shopping-list-button",
	imports: [MatButtonModule, MatIconModule],
	template: `
    <button matMiniFab="filled" disabled="{{!this.weekMenu}}" (click)="openDialog()">
    <mat-icon fontIcon="shopping_cart" />
    </button>
    `,
	styles: ``,
})
export class CreateShoppingListButton {
	@Input({ required: true }) weekMenu!: WeekMenu | null;

	readonly dialog = inject(MatDialog);

	openDialog() {
		this.dialog.open(ShoppingListDialog, {
			width: "1500px",
			enterAnimationDuration: 500,
			exitAnimationDuration: 500,
			data: this.computeParams(),
		});
	}

	computeParams() {
		if (!this.weekMenu) {
			return [];
		}

		const uniqueRecipes = Object.values(this.weekMenu).reduce(
			(accum, day) => {
				const dayRecipeIds = [
					...(day.breakfast.recipeIds || []),
					...(day.lunch.recipeIds || []),
					...(day.dinner.recipeIds || []),
				];
				dayRecipeIds.forEach((recipeId) => {
					accum[recipeId] = (accum[recipeId] || 0) + 2;
				});
				return accum;
			},
			{} as { [id: string]: number },
		);

		return Object.entries(uniqueRecipes).reduce((acc, [key, value]) => {
			acc.push({ recipeIds: [key], numberOfPeopleEating: value });
			return acc;
		}, [] as CreateShoppingListParams);
	}
}
