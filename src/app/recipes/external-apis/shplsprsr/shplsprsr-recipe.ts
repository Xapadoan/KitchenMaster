import { Result } from "../../../toolBox/result/implementations/result";
import { IValidate, ValidationError, ValidationErrorCode } from "../../../toolBox/validation/validation.interface";
import { Recipe } from "../../interfaces/recipe.interface";
import { ShpLsPrsrIngredient, ShpLsPrsrIngredientAdapter, ShpLsPrsrIngredientValidator } from "./shplsprsr-ingredient";

export type ShpLsPrsrRecipe = {
  Name: string;
  Quantity: number;
  Ingredients: string[];
  Steps: string[];
}

export function ShpLsPrsrRecipeAdapter(shplsprsr: ShpLsPrsrRecipe): Recipe {
  return {
    name: shplsprsr.Name,
    ingredients: shplsprsr.Ingredients.map((i) => ShpLsPrsrIngredientAdapter(JSON.parse(i))),
    quantity: shplsprsr.Quantity,
    steps: shplsprsr.Steps,
  }
}

export class ShpLsPrsrRecipeValidator implements IValidate<ShpLsPrsrRecipe> {
  constructor(
    private readonly ingredientValidator: IValidate<ShpLsPrsrIngredient>
  ) {}

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
    let ingredientValidationError: ValidationError | null = null
    const hasInvalidIngredient = asRecipe.Ingredients.some((ingredient) => {
      const validation = this.ingredientValidator.validate(JSON.parse(ingredient))
      if (validation.isErr()) {
        ingredientValidationError = validation.unwrapErr()
        return true
      }
      return false
    });
    if (hasInvalidIngredient && ingredientValidationError) {
      return Result.err({
        code: ValidationErrorCode.INTERNAL_VALIDATION_FAILED,
        path: "Ingredients",
        error: ingredientValidationError,
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