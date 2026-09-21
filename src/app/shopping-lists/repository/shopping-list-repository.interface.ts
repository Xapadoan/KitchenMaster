import type { Result } from "../../toolBox/result/implementations/result";
import type { ValidationError } from "../../toolBox/validation/validation.interface";
import type { CreateShoppingListParams } from "../interface/create-shopping-list.interface";
import type { ShoppingList } from "../interface/shopping-list.interface";

export interface ShoppingListRepository {
	create(
		params: CreateShoppingListParams,
	): Promise<Result<ShoppingList, ShoppingListRepositoryError>>;
}

export type ShoppingListRepositoryError = ShoppingListRepositoryValidationError;

export type ShoppingListRepositoryValidationError = {
	code: ShoppingListRepositoryErrorCode.VALIDATION_ERROR;
	error: ValidationError;
};

export enum ShoppingListRepositoryErrorCode {
	VALIDATION_ERROR,
}
