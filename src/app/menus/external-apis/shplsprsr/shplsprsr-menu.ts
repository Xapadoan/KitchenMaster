import { Result } from "../../../toolBox/result/implementations/result"
import { IResult } from "../../../toolBox/result/interfaces/result.interface"
import { IValidate, ValidationError, ValidationErrorCode } from "../../../toolBox/validation/validation.interface"
import { MealMenu, DayMenu, WeekMenu } from "../../interfaces/menu.interface"

type ShpLsPrsrMealMenu = {
    Title: string
    RecipeIds: string[]
}

function ShpLsPrsrMealMenuAdapter(menu: ShpLsPrsrMealMenu): MealMenu {
    return {
        title: menu.Title,
        recipeIds: menu.RecipeIds
    }
}

export class ShpLsPrsrMealMenuValidator implements IValidate<ShpLsPrsrMealMenu> {
    validate(item: unknown): IResult<ShpLsPrsrMealMenu, ValidationError> {
        if (!item || typeof item != "object") {
            return Result.err({code: ValidationErrorCode.NOT_AN_OBJECT, path: "."})
        }

        const asMealMenu: ShpLsPrsrMealMenu = item as ShpLsPrsrMealMenu
        if (!asMealMenu.Title || typeof asMealMenu.Title != "string") {
            return Result.err({ code: ValidationErrorCode.NOT_A_STRING, path: "Title"})
        }

        if (!Array.isArray(asMealMenu.RecipeIds)) {
            return Result.err({ code: ValidationErrorCode.NOT_AN_ARRAY, path: "RecipeIds"})
        }
        const hasInvalidRecipeId = asMealMenu.RecipeIds.some((id) => typeof id != "string")
        if (hasInvalidRecipeId) {
            return Result.err({ code: ValidationErrorCode.NOT_A_STRING, path: "RecipeIds"})
        }

        return Result.ok(asMealMenu)
    }
}

type ShpLsPrsrDayMenu = {
    Breakfast: ShpLsPrsrMealMenu
    Lunch: ShpLsPrsrMealMenu
    Dinner: ShpLsPrsrMealMenu
}
function ShpLsPrsrDayMenuAdapter(meals: ShpLsPrsrMealMenu[]): DayMenu {
    return {
        breakfast: ShpLsPrsrMealMenuAdapter(meals[0]),
        lunch: ShpLsPrsrMealMenuAdapter(meals[1]),
        dinner: ShpLsPrsrMealMenuAdapter(meals[2])
    }
}

export class ShpLsPrsrDayMenuValidator implements IValidate<ShpLsPrsrDayMenu> {
    constructor(
        private readonly mealMenuValidator: IValidate<ShpLsPrsrMealMenu>
    ) {}

    validate(item: unknown): IResult<ShpLsPrsrDayMenu, ValidationError> {
        if (!item || typeof item != "object") {
            return Result.err({ code: ValidationErrorCode.NOT_AN_OBJECT, path: "."})
        }

        const asDayMenu = item as ShpLsPrsrDayMenu
        
        const breakfastResult = this.mealMenuValidator.validate(asDayMenu.Breakfast)
        if (breakfastResult.isErr()) {
            return Result.err({ code: ValidationErrorCode.INTERNAL_VALIDATION_FAILED, path: "Breakfast", error: breakfastResult.unwrapErr()})
        }

        const lunchResult = this.mealMenuValidator.validate(asDayMenu.Lunch)
        if (lunchResult.isErr()) {
            return Result.err({ code: ValidationErrorCode.INTERNAL_VALIDATION_FAILED, path: "Lunch", error: lunchResult.unwrapErr()})
        }

        const dinnerResult = this.mealMenuValidator.validate(asDayMenu.Dinner)
        if (dinnerResult.isErr()) {
            return Result.err({ code: ValidationErrorCode.INTERNAL_VALIDATION_FAILED, path: "Dinner", error: dinnerResult.unwrapErr()})
        }

        return Result.ok(asDayMenu)
    }
}

export type ShpLsPrsrWeekMenu = {
    Monday: ShpLsPrsrDayMenu
    Tuesday: ShpLsPrsrDayMenu
    Wednesday: ShpLsPrsrDayMenu
    Thursday: ShpLsPrsrDayMenu
    Friday: ShpLsPrsrDayMenu
    Saturday: ShpLsPrsrDayMenu
    Sunday: ShpLsPrsrDayMenu
}

export type ShpLsPrsrMenuCollection = {
    Id: string
    Menus: ShpLsPrsrMealMenu[]
}

export function ShpLsPrsrMenuCollectionAdapter(collection: ShpLsPrsrMenuCollection): WeekMenu {
    return {
        mon: ShpLsPrsrDayMenuAdapter(collection.Menus.slice(0, 3)),
        tue: ShpLsPrsrDayMenuAdapter(collection.Menus.slice(3, 6)),
        wed: ShpLsPrsrDayMenuAdapter(collection.Menus.slice(6, 9)),
        thu: ShpLsPrsrDayMenuAdapter(collection.Menus.slice(9, 12)),
        fri: ShpLsPrsrDayMenuAdapter(collection.Menus.slice(12, 15)),
        sat: ShpLsPrsrDayMenuAdapter(collection.Menus.slice(15, 18)),
        sun: ShpLsPrsrDayMenuAdapter(collection.Menus.slice(18, 21)),
    }
}

export class ShpLsPrsrMenuCollectionValidator implements IValidate<ShpLsPrsrMenuCollection> {
    constructor(
        private readonly validator: IValidate<ShpLsPrsrMealMenu>
    ) {}

    validate(item: unknown): IResult<ShpLsPrsrMenuCollection, ValidationError> {
        if (!item || typeof item != "object") {
            return Result.err({ code: ValidationErrorCode.NOT_AN_OBJECT, path: "." })
        }

        const asCollection = item as ShpLsPrsrMenuCollection

        let validationError: ValidationError | null = null
        asCollection.Menus.find((menu, index) => {
            const result = this.validator.validate(menu)
            if (result.isErr()) {
                validationError = { code: ValidationErrorCode.INTERNAL_VALIDATION_FAILED, path: `Menus[${index}]`, error: result.unwrapErr()}
                return true
            }

            return false
        })

        if (validationError) {
            return Result.err(validationError)
        }

        return Result.ok(asCollection)
    }
}
