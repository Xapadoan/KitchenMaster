import { Inject, Injectable } from "@angular/core";
import { IMenuRepository, MenuRepositoryError, MenuRepositoryErrorCode } from "./menu-repository.interface";
import { HttpClient } from "@angular/common/http";
import { ValidationError } from "../../toolBox/validation/validation.interface";
import { ShpLsPrsrDayMenuValidator, ShpLsPrsrMealMenuValidator, ShpLsPrsrMenuCollectionAdapter, ShpLsPrsrMenuCollectionValidator } from "../external-apis/shplsprsr/shplsprsr-menu";
import { Result } from "../../toolBox/result/implementations/result";
import { WeekMenu } from "../interfaces/menu.interface";

@Injectable({ providedIn: "root" })
export class HttpMenuRepository implements IMenuRepository {
    constructor(
        @Inject(HttpClient)
        private readonly httpClient: HttpClient
    ) {}

    async findWeeks(id: string) {
        const fileContent: string = await new Promise((resolve) => {
            this.httpClient
                .get(`http://localhost:8040/menu/${id}`, {responseType: "text"})
                .subscribe((text) => resolve(text))
        })

        const rawJSON = JSON.parse(fileContent)
        const mealMenuValidator = new ShpLsPrsrMealMenuValidator()
        const collectionValidator = new ShpLsPrsrMenuCollectionValidator(mealMenuValidator)
        const result = collectionValidator.validate(rawJSON)
        if (result.isErr()) {
            return Result.err({ code: MenuRepositoryErrorCode.VALIDATION_ERROR, error: result.unwrapErr() })
        }

        const menu = ShpLsPrsrMenuCollectionAdapter(result.unwrap())
        return Result.ok(menu)
    }
} 
