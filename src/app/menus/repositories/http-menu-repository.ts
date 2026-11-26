import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Result } from "../../toolBox/result/implementations/result";
import {
	ShpLsPrsrMealMenuValidator,
	ShpLsPrsrMenuCollectionAdapter,
	ShpLsPrsrMenuCollectionValidator,
	WeekMenuAdapter,
} from "../external-apis/shplsprsr/shplsprsr-menu";
import type { DayMenu, WeekMenu } from "../interfaces/menu.interface";
import {
	type IMenuRepository,
	MenuRepositoryErrorCode,
} from "./menu-repository.interface";

@Injectable({ providedIn: "root" })
export class HttpMenuRepository implements IMenuRepository {
	constructor(
		@Inject(HttpClient)
		private readonly httpClient: HttpClient,
	) {}

	async findWeeks(id: string) {
		const fileContent: string = await new Promise((resolve) => {
			this.httpClient
				.get(`http://localhost:8040/menu/${id}`, { responseType: "text" })
				.subscribe((text) => resolve(text));
		});

		return this.adaptResponse(fileContent);
	}

	async createWeekMenu() {
		const defaultDayMenu: DayMenu = {
			breakfast: { title: "Breakfast" },
			lunch: { title: "Lunch" },
			dinner: { title: "Dinner" },
		};
		const defaultWeekMenu: WeekMenu = {
			mon: defaultDayMenu,
			tue: defaultDayMenu,
			wed: defaultDayMenu,
			thu: defaultDayMenu,
			fri: defaultDayMenu,
			sat: defaultDayMenu,
			sun: defaultDayMenu,
		};
		const createResponse: string = await new Promise((resolve) => {
			this.httpClient
				.post(
					`http://localhost:8040/menu`,
					JSON.stringify({ Menus: WeekMenuAdapter(defaultWeekMenu) }),
					{ responseType: "text" },
				)
				.subscribe(resolve);
		});

		return this.adaptResponse(createResponse);
	}

	async updateWeekMenu(id: string, params: WeekMenu) {
		const updateResponse: string = await new Promise((resolve) => {
			this.httpClient
				.put(
					`http://localhost:8040/menu/${id}`,
					JSON.stringify({ Menus: WeekMenuAdapter(params) }),
					{ responseType: "text" },
				)
				.subscribe(resolve);
		});

		return this.adaptResponse(updateResponse);
	}

	private adaptResponse(str: string) {
		const rawJSON = JSON.parse(str);
		const mealMenuValidator = new ShpLsPrsrMealMenuValidator();
		const collectionValidator = new ShpLsPrsrMenuCollectionValidator(
			mealMenuValidator,
		);
		const result = collectionValidator.validate(rawJSON);
		if (result.isErr()) {
			return Result.err({
				code: MenuRepositoryErrorCode.VALIDATION_ERROR,
				error: result.unwrapErr(),
			});
		}

		const menu = ShpLsPrsrMenuCollectionAdapter(result.unwrap());
		return Result.ok(menu);
	}
}
