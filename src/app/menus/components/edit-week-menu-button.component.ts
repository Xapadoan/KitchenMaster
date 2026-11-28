import { Component, Inject, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";

@Component({
	selector: "app-menus-edit-week-menu-button",
	imports: [MatButtonModule, MatIconModule],
	template: `
	<button matMiniFab="filled" (click)="this.onClick()">
		<mat-icon fontIcon="edit" />
	</button>
	`,
})
export class EditWeekMenuButton {
	@Input({ required: true })
	menuId: string = "";

	constructor(
		@Inject(Router)
		private readonly router: Router,
	) {}

	onClick() {
		this.router.navigate([this.menuId, "edit"]);
	}
}
