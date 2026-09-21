import {
	Component,
	Inject,
	Input,
	type OnInit,
	signal,
	type WritableSignal,
} from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { CreateShoppingListButton } from "../shopping-lists/components/create-shopping-list-button.component";
import { MenusTable } from "./components/menus-table.component";
import type { WeekMenu } from "./interfaces/menu.interface";
import { HttpMenuRepository } from "./repositories/http-menu-repository";
import type { IMenuRepository } from "./repositories/menu-repository.interface";

@Component({
	selector: "app-menus-screen",
	imports: [MenusTable, CreateShoppingListButton, MatProgressSpinner],
	template: `
  <header>
    <app-create-shopping-list-button [weekMenu]="this.weekMenu()" />
    </header>
  @if (this.loading()) {
    <mat-spinner />
    } @else if (this.error()) {
    <p>Error<p>
    } @else {
    <app-menus-table [WeekMenu]="this.weekMenu()" />
    }`,
	styles: ``,
})
export class MenusScreen implements OnInit {
	loading: WritableSignal<boolean> = signal(false);
	error: WritableSignal<string | null> = signal(null);
	weekMenu: WritableSignal<WeekMenu | null> = signal(null);
	@Input({ required: true }) menuId!: string;

	constructor(
		@Inject(HttpMenuRepository)
		private readonly repository: IMenuRepository,
	) {}

	ngOnInit() {
		this.error.set(null);
		this.loading.set(true);
		this.repository
			.findWeeks(this.menuId)
			.then((menu) => {
				if (menu.isErr()) {
					console.error(menu.unwrapErr());
					const repoError = menu.unwrapErr();
					this.error.set(`[${repoError.code}]: ${repoError.error}`);
				} else {
					this.weekMenu.set(menu.unwrap());
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
