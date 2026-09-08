import { Result } from "../../toolBox/result/implementations/result";
import { ValidationError } from "../../toolBox/validation/validation.interface";
import { CreateShoppingListParams } from "../interface/create-shopping-list.interface";
import { ShoppingList } from "../interface/shopping-list.interface";

export interface ShoppingListRepository {
  create(params: CreateShoppingListParams): Promise<Result<ShoppingList, ShoppingListRepositoryError>>
}

export type ShoppingListRepositoryError = ShoppingListRepositoryValidationError;

export type ShoppingListRepositoryValidationError = {
  code: ShoppingListRepositoryErrorCode.VALIDATION_ERROR;
  error: ValidationError;
};

export enum ShoppingListRepositoryErrorCode {
  VALIDATION_ERROR,
}