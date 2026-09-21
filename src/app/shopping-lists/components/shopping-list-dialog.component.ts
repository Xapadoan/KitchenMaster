import {
	Component,
	Inject,
	Input,
	inject,
	type OnInit,
	signal,
	type WritableSignal,
} from "@angular/core";
import {
	MAT_DIALOG_DATA,
	MatDialogContent,
	type MatDialogRef,
	MatDialogTitle,
} from "@angular/material/dialog";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { formatIngredient } from "../../recipes/interfaces/recipe.interface";
import type { CreateShoppingListParams } from "../interface/create-shopping-list.interface";
import { HttpShoppingListRepository } from "../repository/http-shopping-list-repository";
import type { ShoppingListRepository } from "../repository/shopping-list-repository.interface";

@Component({
	selector: "app-shopping-list-dialog",
	imports: [MatDialogContent, MatDialogTitle, MatProgressSpinner],
	template: `
    <h2 mat-dialog-title>Shopping List</h2>
    <mat-dialog-content>
        @if (this.loading()) {
            <mat-spinner />
        } @else if (this.error()) {
            <p>Error</p>
        } @else {
            <ul>
                @for (item of this.shoppingList(); track item) {
                <li>[] {{item}}</li>
                }
            </ul>
        }
    </mat-dialog-content>
    `,
	styles: ``,
})
export class ShoppingListDialog implements OnInit {
	readonly dialogRef = inject<MatDialogRef<ShoppingListDialog>>;
	readonly data = inject<CreateShoppingListParams>(MAT_DIALOG_DATA);
	@Input({ required: true }) params!: CreateShoppingListParams;

	constructor(
		@Inject(HttpShoppingListRepository)
		private readonly repo: ShoppingListRepository,
	) {}

	loading: WritableSignal<boolean> = signal(false);
	error: WritableSignal<string> = signal("");
	shoppingList: WritableSignal<string[] | null> = signal(null);

	ngOnInit(): void {
		this.loading.set(true);
		this.repo
			.create(this.data)
			.then((result) => {
				if (result.isErr()) {
					const err = result.unwrapErr();
					this.error.set(`[${err.code}]: ${err.error}`);
				} else {
					const asStrings = Object.entries(result.unwrap()).reduce(
						(acc, [_, units]) => {
							units.forEach((unit) => {
								acc.push(formatIngredient(unit));
							});
							return acc;
						},
						[] as string[],
					);
					this.shoppingList.set(asStrings);
				}
			})
			.catch(() => {
				this.error.set("[Unknown]: Unknown error");
			})
			.finally(() => {
				this.loading.set(false);
			});
	}
}
