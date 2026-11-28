import { CommonModule } from "@angular/common";
import {
	Component,
	Inject,
	Input,
	input,
	model,
	type OnChanges,
	signal,
	type WritableSignal,
} from "@angular/core";
import { FormField, form } from "@angular/forms/signals";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";
import {
	type DayMenu,
	isKeyOfDayMenu,
	isKeyOfWeekMenuData,
	type WeekMenu,
	type WeekMenuData,
} from "../interfaces/menu.interface";
import { HttpMenuRepository } from "../repositories/http-menu-repository";
import type { IMenuRepository } from "../repositories/menu-repository.interface";
import { RecipeIdsInput } from "./recipe-ids-input/recipe-ids-input";

type DayTimeMealSelection = Record<keyof DayMenu, boolean>;

type EditMenuModel = {
	title: string;
	recipeIds: string[];
	selectedMeals: Record<keyof WeekMenuData, DayTimeMealSelection>;
};

@Component({
	selector: "app-menus-select-menus",
	imports: [
		CommonModule,
		FormField,
		MatProgressSpinner,
		MatIconModule,
		RecipeIdsInput,
	],
	template: `
	<div>
		<input type="text" [formField]="editMenuForm.title" />
		<app-menus-recipe-ids-input [formField]="editMenuForm.recipeIds" />
		<button (click)="this.onEditRecipes()">Edit</button>
		<button (click)="this.onSaveEdits()">Save</button>
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
		@if (!this.tmpMenuData()) {
			<mat-spinner />
		} @else {
			<tr>
				<td>
					<input type="checkbox" id="mealMonBreakfast" [formField]="editMenuForm.selectedMeals.mon.breakfast">
					<p>{{tmpMenuData()!.mon.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealTueBreakfast" [formField]="editMenuForm.selectedMeals.tue.breakfast">
					<p>{{tmpMenuData()!.tue.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealWedBreakfast" [formField]="editMenuForm.selectedMeals.wed.breakfast">
					<p>{{tmpMenuData()!.wed.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealThuBreakfast" [formField]="editMenuForm.selectedMeals.thu.breakfast">
					<p>{{tmpMenuData()!.thu.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealFriBreakfast" [formField]="editMenuForm.selectedMeals.fri.breakfast">
					<p>{{tmpMenuData()!.fri.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSatBreakfast" [formField]="editMenuForm.selectedMeals.sat.breakfast">
					<p>{{tmpMenuData()!.sat.breakfast.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSunBreakfast" [formField]="editMenuForm.selectedMeals.sun.breakfast">
					<p>{{tmpMenuData()!.sun.breakfast.title}}</p>
				</td>
			</tr>
			<tr>
				<td>
					<input type="checkbox" id="mealMonLunch" [formField]="editMenuForm.selectedMeals.mon.lunch">
					<p>{{tmpMenuData()!.mon.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealTueLunch" [formField]="editMenuForm.selectedMeals.tue.lunch">
					<p>{{tmpMenuData()!.tue.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealWedLunch" [formField]="editMenuForm.selectedMeals.wed.lunch">
					<p>{{tmpMenuData()!.wed.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealThuLunch" [formField]="editMenuForm.selectedMeals.thu.lunch">
					<p>{{tmpMenuData()!.thu.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealFriLunch" [formField]="editMenuForm.selectedMeals.fri.lunch">
					<p>{{tmpMenuData()!.fri.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSatLunch" [formField]="editMenuForm.selectedMeals.sat.lunch">
					<p>{{tmpMenuData()!.sat.lunch.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSunLunch" [formField]="editMenuForm.selectedMeals.sun.lunch">
					<p>{{tmpMenuData()!.sun.lunch.title}}</p>
				</td>
			</tr>
			<tr>
				<td>
					<input type="checkbox" id="mealMonDinner" [formField]="editMenuForm.selectedMeals.mon.dinner">
					<p>{{tmpMenuData()!.mon.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealTueDinner" [formField]="editMenuForm.selectedMeals.tue.dinner">
					<p>{{tmpMenuData()!.tue.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealWedDinner" [formField]="editMenuForm.selectedMeals.wed.dinner">
					<p>{{tmpMenuData()!.wed.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealThuDinner" [formField]="editMenuForm.selectedMeals.thu.dinner">
					<p>{{tmpMenuData()!.thu.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealFriDinner" [formField]="editMenuForm.selectedMeals.fri.dinner">
					<p>{{tmpMenuData()!.fri.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSatDinner" [formField]="editMenuForm.selectedMeals.sat.dinner">
					<p>{{tmpMenuData()!.sat.dinner.title}}</p>
				</td>
				<td>
					<input type="checkbox" id="mealSunDinner" [formField]="editMenuForm.selectedMeals.sun.dinner">
					<p>{{tmpMenuData()!.sun.dinner.title}}</p>
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
	tmpMenuData: WritableSignal<WeekMenuData | null> = signal(null);
	@Input({ required: true }) menuId!: string;

	constructor(
		@Inject(HttpMenuRepository)
		private readonly repo: IMenuRepository,

		@Inject(Router)
		private readonly router: Router,
	) {}

	ngOnChanges(): void {
		this.tmpMenuData.set(this.WeekMenu()?.data || null);
	}

	private readonly editMenuFormInitState: EditMenuModel = {
		title: "",
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

	editMenuModel = model<EditMenuModel>(this.editMenuFormInitState);

	editMenuForm = form(this.editMenuModel);

	resetForm() {
		this.editMenuModel.set(this.editMenuFormInitState);
	}

	onEditRecipes() {
		console.log(this.editMenuModel());
		const menu = this.tmpMenuData();
		if (!menu) {
			return;
		}
		const selectedMeals = this.editMenuModel().selectedMeals;
		for (const [dayOfWeek, menuOfTheDay] of Object.entries(selectedMeals)) {
			if (!isKeyOfWeekMenuData(dayOfWeek)) continue;
			for (const [timeOfDay, value] of Object.entries(menuOfTheDay)) {
				if (!isKeyOfDayMenu(timeOfDay)) continue;
				if (value === true) {
					const { recipeIds, title } = this.editMenuModel();
					menu[dayOfWeek][timeOfDay].recipeIds = [...recipeIds];
					menu[dayOfWeek][timeOfDay].title = title;
				}
			}
		}

		this.tmpMenuData.set(menu);
		this.resetForm();
	}

	onSaveEdits() {
		const data = this.tmpMenuData();
		if (!data) {
			return;
		}
		this.repo
			.updateWeekMenu(this.menuId, data)
			.then(() => this.router.navigate([this.menuId]));
	}
}
