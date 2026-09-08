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
function ShpLsPrsrDayMenuAdapter(menu: ShpLsPrsrDayMenu): DayMenu {
    return {
        breakfast: ShpLsPrsrMealMenuAdapter(menu.Breakfast),
        lunch: ShpLsPrsrMealMenuAdapter(menu.Lunch),
        dinner: ShpLsPrsrMealMenuAdapter(menu.Dinner)
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

export function ShpLsPrsrWeekMenuAdapter(menu: ShpLsPrsrWeekMenu): WeekMenu {
    return {
        mon: ShpLsPrsrDayMenuAdapter(menu.Monday),
        tue: ShpLsPrsrDayMenuAdapter(menu.Tuesday),
        wed: ShpLsPrsrDayMenuAdapter(menu.Wednesday),
        thu: ShpLsPrsrDayMenuAdapter(menu.Thursday),
        fri: ShpLsPrsrDayMenuAdapter(menu.Friday),
        sat: ShpLsPrsrDayMenuAdapter(menu.Saturday),
        sun: ShpLsPrsrDayMenuAdapter(menu.Sunday),
    }
}

export class ShpLsPrsrWeekMenuValidator implements IValidate<ShpLsPrsrWeekMenu> {
    constructor(
        private readonly validator: IValidate<ShpLsPrsrDayMenu>
    ) {}

    validate(item: unknown): IResult<ShpLsPrsrWeekMenu, ValidationError> {
        if (!item || typeof item != "object") {
            return Result.err({ code: ValidationErrorCode.NOT_AN_OBJECT, path: "." })
        }

        const asWeekMenu = item as ShpLsPrsrWeekMenu

        let validationError: ValidationError | null = null
        Object.entries(asWeekMenu).find(([key, value]) => {
            const result = this.validator.validate(value)
            if (result.isErr()) {
                validationError = { code: ValidationErrorCode.INTERNAL_VALIDATION_FAILED, path: key, error: result.unwrapErr()}
                return true
            }

            return false
        })

        if (validationError) {
            return Result.err(validationError)
        }

        return Result.ok(asWeekMenu)
    }
}
