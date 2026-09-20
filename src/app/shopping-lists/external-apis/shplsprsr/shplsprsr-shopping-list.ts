import z from "zod"
import { IValidate, ValidationError, ValidationErrorCode } from "../../../toolBox/validation/validation.interface"
import { IResult } from "../../../toolBox/result/interfaces/result.interface"
import { Result } from "../../../toolBox/result/implementations/result"
import { ShoppingList } from "../../interface/shopping-list.interface"
import { ShpLsPrsrIngredient, ShpLsPrsrIngredientAdapter } from "../../../recipes/external-apis/shplsprsr/shplsprsr-ingredient"
import { formatIngredient } from "../../../recipes/interfaces/recipe.interface"

export type ShpLsPrsrShoppingList = {
  [ingredientName: string]: ShpLsPrsrIngredient[]
}

const ShpLsPrsrIngredientQuantitySchema = z.object({
  Name: z.string(),
  Amount: z.number(),
  Unit: z.string(),
})

const ShpLsPrsrShoppingListSchema = z.record(z.string(), z.array(ShpLsPrsrIngredientQuantitySchema))

export class ShpLsPrsrShoppingListValidator implements IValidate<ShpLsPrsrShoppingList> {
  validate(item: unknown): IResult<ShpLsPrsrShoppingList, ValidationError> {
    const validation = ShpLsPrsrShoppingListSchema.safeParse(item)

    if (!validation.success) {
      console.error(validation.error)
      return Result.err({ code: ValidationErrorCode.NOT_AN_OBJECT, path: String(validation.error.issues[0]?.path) })
    }

    return Result.ok(item as ShpLsPrsrShoppingList)
  }
}

export function ShpLsPrsrShoppingListAdapter(rawList: ShpLsPrsrShoppingList): ShoppingList {
  return Object.entries(rawList).reduce((acc, [key, value]) => {
    const quantities = value.reduce((vAcc, quantity) => {
      const ingredient = ShpLsPrsrIngredientAdapter(quantity)
      return {...vAcc, [key]: formatIngredient(ingredient) }
    }, {} as ShoppingList)
    return { ...acc, ...quantities }
  }, {} as ShoppingList)
}