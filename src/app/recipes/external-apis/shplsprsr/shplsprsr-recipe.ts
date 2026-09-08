import { Result } from "../../../toolBox/result/implementations/result";
import { IValidate, ValidationError, ValidationErrorCode } from "../../../toolBox/validation/validation.interface";
import { Recipe } from "../../interfaces/recipe.interface";

export type ShpLsPrsrRecipe = {
  Name: string;
  Quantity: number;
  Ingredients: string[];
  Steps: string[];
}

export function ShpLsPrsrRecipeAdapter(shplsprsr: ShpLsPrsrRecipe): Recipe {
    return {
        name: shplsprsr.Name,
        ingredients: shplsprsr.Ingredients,
        quantity: shplsprsr.Quantity,
        steps: shplsprsr.Steps,
    }
}

export class ShpLsPrsrRecipeValidator implements IValidate<ShpLsPrsrRecipe> {
  validate(item: unknown): Result<ShpLsPrsrRecipe, ValidationError> {
    const asRecipe: ShpLsPrsrRecipe = item as ShpLsPrsrRecipe;
    if (!item || typeof item !== "object") {
      return Result.err({ code: ValidationErrorCode.NOT_AN_OBJECT, path: "." });
    }

    if (typeof asRecipe.Name !== "string") {
      return Result.err({
        code: ValidationErrorCode.NOT_A_STRING,
        path: "Name",
      });
    }

    if (!Array.isArray(asRecipe.Ingredients)) {
      return Result.err({
        code: ValidationErrorCode.NOT_AN_ARRAY,
        path: "Ingredients",
      });
    }
    const asInvalidIngredient = asRecipe.Ingredients.some(
      (ingredient) => typeof ingredient != "string"
    );
    if (asInvalidIngredient) {
      return Result.err({
        code: ValidationErrorCode.NOT_A_STRING,
        path: "Ingredients",
      });
    }

    if (!Array.isArray(asRecipe.Steps)) {
      return Result.err({
        code: ValidationErrorCode.NOT_AN_ARRAY,
        path: "Steps",
      });
    }
    const asInvalidStep = asRecipe.Steps.some(
      (step) => typeof step != "string"
    );
    if (asInvalidStep) {
      return Result.err({
        code: ValidationErrorCode.NOT_A_STRING,
        path: "Steps[]",
      });
    }

    if (typeof asRecipe.Quantity !== "number") {
      return Result.err({
        code: ValidationErrorCode.NOT_A_NUMBER,
        path: "Quantity",
      });
    }

    return Result.ok(asRecipe);
  }
}