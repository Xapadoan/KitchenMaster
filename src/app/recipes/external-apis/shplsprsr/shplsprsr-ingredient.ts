import z from "zod";
import { IResult } from "../../../toolBox/result/interfaces/result.interface";
import { IValidate, ValidationError, ValidationErrorCode } from "../../../toolBox/validation/validation.interface";
import { Result } from "../../../toolBox/result/implementations/result";
import { Ingredient, Unit } from "../../interfaces/recipe.interface";

export type ShpLsPrsrIngredient = {
  Name: string,
  Amount: number,
  Unit: string,
}

const ShpLsIngredientSchema = z.object({
  Name: z.string(),
  Amount: z.number(),
  Unit: z.string()
})

export function ShpLsPrsrIngredientAdapter(shplsprsr: ShpLsPrsrIngredient): Ingredient {
  let unit = Unit.Unknown
  switch (shplsprsr.Unit) {
    case "g":
      unit = Unit.Gram
      break
    case "cac":
      unit = Unit.Cac
      break
    case "cas":
      unit = Unit.Cas
      break
    case "ml":
      unit = Unit.Milliliter
      break
    case "":
      unit = Unit.Unit
      break
  }

  return { name: shplsprsr.Name, amount: shplsprsr.Amount, unit }
}

export class ShpLsPrsrIngredientValidator implements IValidate<ShpLsPrsrIngredient> {
  validate(item: unknown): IResult<ShpLsPrsrIngredient, ValidationError> {
    const zodValidationResult = z.safeParse(ShpLsIngredientSchema, item)
    if (!zodValidationResult.success) {
      console.error(zodValidationResult.error)
      return Result.err({ code: ValidationErrorCode.NOT_AN_OBJECT, path: "." })
    }

    return Result.ok(zodValidationResult.data)
  }
}