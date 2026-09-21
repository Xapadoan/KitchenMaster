import { Component, inject, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import type { MealMenu } from "../interfaces/menu.interface";
import { MenuDetails } from "./menu-details.component";

@Component({
	selector: "app-menu",
	imports: [MatButtonModule],
	template: `<h5>{{ params().title }}</h5>
    <button matButton="elevated" (click)="openDialog()">Open</button>`,
	styles: ``,
})
export class Menu {
	params = input.required<MealMenu>();
	readonly dialog = inject(MatDialog);

	openDialog() {
		this.dialog.open(MenuDetails, {
			width: "1500px",
			enterAnimationDuration: 500,
			exitAnimationDuration: 500,
			data: {
				title: this.params().title,
				recipeIds: this.params().recipeIds,
			},
		});
	}
}
