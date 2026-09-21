import z from "zod";
import {
	type ShpLsPrsrIngredient,
	ShpLsPrsrIngredientAdapter,
} from "../../../recipes/external-apis/shplsprsr/shplsprsr-ingredient";
import { Result } from "../../../toolBox/result/implementations/result";
import type { IResult } from "../../../toolBox/result/interfaces/result.interface";
import {
	type IValidate,
	type ValidationError,
	ValidationErrorCode,
} from "../../../toolBox/validation/validation.interface";
import type { ShoppingList } from "../../interface/shopping-list.interface";

export type ShpLsPrsrShoppingList = {
	[ingredientName: string]: ShpLsPrsrIngredient[];
};

const ShpLsPrsrIngredientQuantitySchema = z.object({
	Name: z.string(),
	Amount: z.number(),
	Unit: z.string(),
});

const ShpLsPrsrShoppingListSchema = z.record(
	z.string(),
	z.array(ShpLsPrsrIngredientQuantitySchema),
);

export class ShpLsPrsrShoppingListValidator
	implements IValidate<ShpLsPrsrShoppingList>
{
	validate(item: unknown): IResult<ShpLsPrsrShoppingList, ValidationError> {
		const validation = ShpLsPrsrShoppingListSchema.safeParse(item);

		if (!validation.success) {
			console.error(validation.error);
			return Result.err({
				code: ValidationErrorCode.NOT_AN_OBJECT,
				path: String(validation.error.issues[0]?.path),
			});
		}

		return Result.ok(item as ShpLsPrsrShoppingList);
	}
}

export function ShpLsPrsrShoppingListAdapter(
	rawList: ShpLsPrsrShoppingList,
): ShoppingList {
	return Object.entries(rawList).reduce((acc, [ingredientName, units]) => {
		const domainUnits = units.map(ShpLsPrsrIngredientAdapter);
		acc[ingredientName] = domainUnits;
		return acc;
	}, {} as ShoppingList);
}
