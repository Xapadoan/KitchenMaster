import { Component, Inject, signal, type WritableSignal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { HttpMenuRepository } from "../repositories/http-menu-repository";
import type { IMenuRepository } from "../repositories/menu-repository.interface";

@Component({
	selector: "app-menus-create-week-menu-button",
	imports: [MatButtonModule, MatIconModule],
	template: `
	<button matMiniFab="filled" disabled={{this.loading()}} (click)="onClick()">
	<mat-icon fontIcon="add_notes" />
	</button>
	`,
	styles: ``,
})
export class CreateMenuWeekMenuButton {
	loading: WritableSignal<boolean> = signal(false);
	error: WritableSignal<string> = signal("");

	constructor(
		@Inject(HttpMenuRepository)
		private readonly repo: IMenuRepository,

		@Inject(Router)
		private readonly router: Router,
	) {}

	onClick() {
		this.loading.set(true);
		this.repo.createWeekMenu().then((res) => {
			this.loading.set(false);
			if (res.isOk()) {
				this.router.navigate([res.unwrap().id, "edit"]);
				return;
			}
			console.error("Failed to create menu:\n", res.unwrapErr());
		});
	}
}
