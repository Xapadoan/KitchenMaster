import {
	Component,
	Inject,
	Input,
	type OnInit,
	signal,
	type WritableSignal,
} from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Menu } from "./components/menu.component";
import { MenusTable } from "./components/menus-table.component";
import { SelectMenus } from "./components/select-menus.component";
import type { MealMenu, WeekMenu } from "./interfaces/menu.interface";
import { HttpMenuRepository } from "./repositories/http-menu-repository";
import type { IMenuRepository } from "./repositories/menu-repository.interface";

@Component({
	selector: "app-menus-edit-menus-screen",
	standalone: true,
	imports: [MatProgressSpinner, SelectMenus, Menu],
	template: `
	@if (this.loading()) {
    <mat-spinner />
    } @else if (this.error()) {
    <p>Error<p>
    } @else {
    <app-menus-select-menus [menuId]="this.menuId" [WeekMenu]="this.weekMenu()" />
  }`,
	styles: ``,
})
export class EditMenusScreen implements OnInit {
	loading: WritableSignal<boolean> = signal(false);
	error: WritableSignal<string | null> = signal(null);
	weekMenu: WritableSignal<WeekMenu | null> = signal(null);
	@Input({ required: true }) menuId!: string;

	constructor(
		@Inject(HttpMenuRepository)
		private readonly repo: IMenuRepository,
	) {}

	ngOnInit() {
		this.loadMenu();
	}

	private async loadMenu() {
		this.error.set(null);
		this.loading.set(false);
		this.repo
			.findWeeks(this.menuId)
			.then((menu) => {
				if (menu.isErr()) {
					const menuErr = menu.unwrapErr();
					console.error(menuErr);
					this.error.set(`[${menuErr.code}]: ${menuErr.error}`);
				} else {
					const response = menu.unwrap();
					this.weekMenu.set(response);
				}
			})
			.catch(() => {
				this.error.set("[Unknown]: Unknown");
			})
			.finally(() => {
				this.loading.set(false);
			});
	}
}
