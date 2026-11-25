import { CommonModule } from "@angular/common";
import {
	Component,
	Inject,
	Input,
	input,
	type OnChanges,
	signal,
	type WritableSignal,
} from "@angular/core";
import { FormField, form } from "@angular/forms/signals";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import {
	type DayMenu,
	isKeyOfDayMenu,
	isKeyOfWeekMenu,
	type WeekMenu,
} from "../interfaces/menu.interface";
import { HttpMenuRepository } from "../repositories/http-menu-repository";
import type { IMenuRepository } from "../repositories/menu-repository.interface";

type DayTimeMealSelection = Record<keyof DayMenu, boolean>;

type EditMenuModel = {
	title: string;
	recipeIds: string[];
	recipeId: string;
	selectedMeals: Record<keyof WeekMenu, DayTimeMealSelection>;
};

@Component({
	selector: "app-menus-select-menus",
	imports: [CommonModule, FormField, MatProgressSpinner, MatIconModule],
	template: `
	<div>
	<header>
		<input type="text" [formField]="editMenuForm.title" />
		<div>
			<p *ngFor="let item of this.editMenuModel().recipeIds">
				{{item}}<button (click)="this.removeRecipeId(item)">x</button>
			</p>
			<input type="text" [formField]="editMenuForm.recipeId" />
			<button (click)="this.addRecipeId()">
				<mat-icon fontIcon="add" />
			</button>
		</div>
		<button (click)="this.onEditRecipes()">Edit</button>
		<button (click)="this.onSaveEdits()">Save</button>
	</header>
	<table>
		<thead><tr>
			<th>Lundi</th>
			<th>Mardi</th>
			<th>Mercredi</th>
			<th>Jeudi</th>
			<th>Vendredi</th>
			<th>Samedi</th>
			<th>Dimanche</th>
		</tr></thead>
		<tbody>
		@if (!this.tmpMenu()) {
			<mat-spinner />
		} @else {
			<tr>
				<td>
					<input type="checkbox" id="mealMonBreakfast" [formField]="editMenuForm.selectedMeals.mon.breakfast">
					<p>{{tmpMenu()!.mon.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealTueBreakfast" [formField]="editMenuForm.selectedMeals.tue.breakfast">
					<p>{{tmpMenu()!.tue.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealWedBreakfast" [formField]="editMenuForm.selectedMeals.wed.breakfast">
					<p>{{tmpMenu()!.wed.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealThuBreakfast" [formField]="editMenuForm.selectedMeals.thu.breakfast">
					<p>{{tmpMenu()!.thu.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealFriBreakfast" [formField]="editMenuForm.selectedMeals.fri.breakfast">
					<p>{{tmpMenu()!.fri.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSatBreakfast" [formField]="editMenuForm.selectedMeals.sat.breakfast">
					<p>{{tmpMenu()!.sat.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSunBreakfast" [formField]="editMenuForm.selectedMeals.sun.breakfast">
					<p>{{tmpMenu()!.sun.breakfast.title}}</p>
				</td>
			</tr>
			<tr>
				<td>
					<input type="checkbox" id="mealMonLunch" [formField]="editMenuForm.selectedMeals.mon.lunch">
					<p>{{tmpMenu()!.mon.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealTueLunch" [formField]="editMenuForm.selectedMeals.tue.lunch">
					<p>{{tmpMenu()!.tue.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealWedLunch" [formField]="editMenuForm.selectedMeals.wed.lunch">
					<p>{{tmpMenu()!.wed.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealThuLunch" [formField]="editMenuForm.selectedMeals.thu.lunch">
					<p>{{tmpMenu()!.thu.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealFriLunch" [formField]="editMenuForm.selectedMeals.fri.lunch">
					<p>{{tmpMenu()!.fri.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSatLunch" [formField]="editMenuForm.selectedMeals.sat.lunch">
					<p>{{tmpMenu()!.sat.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSunLunch" [formField]="editMenuForm.selectedMeals.sun.lunch">
					<p>{{tmpMenu()!.sun.lunch.title}}</p>
				</td>
			</tr>
			<tr>
				<td>
					<input type="checkbox" id="mealMonDinner" [formField]="editMenuForm.selectedMeals.mon.dinner">
					<p>{{tmpMenu()!.mon.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealTueDinner" [formField]="editMenuForm.selectedMeals.tue.dinner">
					<p>{{tmpMenu()!.tue.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealWedDinner" [formField]="editMenuForm.selectedMeals.wed.dinner">
					<p>{{tmpMenu()!.wed.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealThuDinner" [formField]="editMenuForm.selectedMeals.thu.dinner">
					<p>{{tmpMenu()!.thu.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealFriDinner" [formField]="editMenuForm.selectedMeals.fri.dinner">
					<p>{{tmpMenu()!.fri.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSatDinner" [formField]="editMenuForm.selectedMeals.sat.dinner">
					<p>{{tmpMenu()!.sat.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSunDinner" [formField]="editMenuForm.selectedMeals.sun.dinner">
					<p>{{tmpMenu()!.sun.dinner.title}}</p>
				</td>
			</tr>
		}
		</tbody>
	</table>
	`,
	styles: ``,
})
export class SelectMenus implements OnChanges {
	WeekMenu = input.required<WeekMenu | null>();
	tmpMenu: WritableSignal<WeekMenu | null> = signal(null);
	@Input({ required: true }) menuId!: string;

	constructor(
		@Inject(HttpMenuRepository)
		private readonly repo: IMenuRepository,
	) {}

	ngOnChanges(): void {
		this.tmpMenu.set(this.WeekMenu());
	}

	private readonly editMenuFormInitState: EditMenuModel = {
		title: "",
		recipeId: "",
		recipeIds: [],
		selectedMeals: {
			mon: {
				breakfast: false,
				lunch: false,
				dinner: false,
			},
			tue: {
				breakfast: false,
				lunch: false,
				dinner: false,
			},
			wed: {
				breakfast: false,
				lunch: false,
				dinner: false,
			},
			thu: {
				breakfast: false,
				lunch: false,
				dinner: false,
			},
			fri: {
				breakfast: false,
				lunch: false,
				dinner: false,
			},
			sat: {
				breakfast: false,
				lunch: false,
				dinner: false,
			},
			sun: {
				breakfast: false,
				lunch: false,
				dinner: false,
			},
		},
	};

	editMenuModel = signal<EditMenuModel>(this.editMenuFormInitState);

	editMenuForm = form(this.editMenuModel);

	resetForm() {
		this.editMenuModel.set(this.editMenuFormInitState);
	}

	onEditRecipes() {
		console.log(this.editMenuModel());
		const menu = this.tmpMenu();
		if (!menu) {
			return;
		}
		const selectedMeals = this.editMenuModel().selectedMeals;
		for (const [dayOfWeek, menuOfTheDay] of Object.entries(selectedMeals)) {
			if (!isKeyOfWeekMenu(dayOfWeek)) continue;
			for (const [timeOfDay, value] of Object.entries(menuOfTheDay)) {
				if (!isKeyOfDayMenu(timeOfDay)) continue;
				if (value === true) {
					const { recipeIds, title } = this.editMenuModel();
					menu[dayOfWeek][timeOfDay].recipeIds = [...recipeIds];
					menu[dayOfWeek][timeOfDay].title = title;
				}
			}
		}

		this.tmpMenu.set(menu);
		this.resetForm();
	}

	addRecipeId() {
		const recipeIdsValue = this.editMenuModel().recipeIds;
		const recipeIdToAdd = this.editMenuModel().recipeId;

		if (!recipeIdsValue.includes(recipeIdToAdd)) {
			this.editMenuModel.update((model) => ({
				...model,
				recipeId: "",
				recipeIds: [...model.recipeIds, recipeIdToAdd],
			}));
		}
	}

	removeRecipeId(recipeIdToRemove: string) {
		const recipeIdsValues = this.editMenuModel().recipeIds;
		const index = recipeIdsValues.indexOf(recipeIdToRemove);
		if (index < 0) {
			return;
		}
		const recipeIdsWithoutTheOneToRemove = [
			...recipeIdsValues.slice(0, index),
			...recipeIdsValues.slice(index + 1),
		];
		this.editMenuModel.update((model) => ({
			...model,
			recipeIds: recipeIdsWithoutTheOneToRemove,
		}));
	}

	onSaveEdits() {
		const data = this.tmpMenu();
		console.log("Saving edits: ", data);
		if (!data) {
			return;
		}
		this.repo.updateWeekMenu(this.menuId, data);
	}
}
