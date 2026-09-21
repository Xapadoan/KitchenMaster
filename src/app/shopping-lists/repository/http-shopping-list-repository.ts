import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Result } from "../../toolBox/result/implementations/result";
import {
	ShpLsPrsrShoppingListAdapter,
	ShpLsPrsrShoppingListValidator,
} from "../external-apis/shplsprsr/shplsprsr-shopping-list";
import type { CreateShoppingListParams } from "../interface/create-shopping-list.interface";
import {
	type ShoppingListRepository,
	ShoppingListRepositoryErrorCode,
} from "./shopping-list-repository.interface";

@Injectable({ providedIn: "root" })
export class HttpShoppingListRepository implements ShoppingListRepository {
	constructor(
		@Inject(HttpClient)
		private readonly httpClient: HttpClient,
	) {}

	async create(params: CreateShoppingListParams) {
		const response: string = await new Promise((resolve) => {
			this.httpClient
				.post("http://localhost:8040/shopping-list", JSON.stringify(params), {
					responseType: "text",
				})
				.subscribe(resolve);
		});

		const validator = new ShpLsPrsrShoppingListValidator();
		const validationResult = validator.validate(JSON.parse(response));
		if (validationResult.isErr()) {
			return Result.err({
				code: ShoppingListRepositoryErrorCode.VALIDATION_ERROR,
				error: validationResult.unwrapErr(),
			});
		}

		const rawList = validationResult.unwrap();
		return Result.ok(ShpLsPrsrShoppingListAdapter(rawList));
	}
}
