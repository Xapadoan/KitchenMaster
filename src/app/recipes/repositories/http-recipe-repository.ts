import { Inject, Injectable } from "@angular/core";
import { IRecipeRepository } from "./recipes-repository.interface";
import { HttpClient } from "@angular/common/http";
import { Result } from "../../toolBox/result/implementations/result";
import { ValidationError } from "../../toolBox/validation/validation.interface";
import { ShpLsPrsrRecipeAdapter, ShpLsPrsrRecipeValidator } from "../external-apis/shplsprsr/shplsprsr-recipe";
import { ShpLsPrsrIngredientValidator } from "../external-apis/shplsprsr/shplsprsr-ingredient";

@Injectable({ providedIn: "root" })
export class HttpRecipeRepository implements IRecipeRepository {
    constructor(
        @Inject(HttpClient)
        private readonly httpClient: HttpClient
    ) {}

    async get(id: string) {
        const fileContent: string = await new Promise((resolve) => {
      this.httpClient
        .get(`http://localhost:8040/recipe/${id}`, { responseType: "text" })
        .subscribe((text) => {
          resolve(text);
        });
    });
    const rawJSON = JSON.parse(fileContent);

    const ingredientValidator = new ShpLsPrsrIngredientValidator();
    const recipeValidator = new ShpLsPrsrRecipeValidator(ingredientValidator);
    const result = recipeValidator.validate(rawJSON);
    if (result.isErr()) {
      return Result.err({
        code: HttpRecipeRepositoryErrorCode.VALIDATION_ERROR,
        error: result.unwrapErr(),
      });
    }

    const recipe = ShpLsPrsrRecipeAdapter(result.unwrap())
    return Result.ok(recipe);
    }
}

export type HttpRecipeRepositoryError = HttpRecipeRepositoryValidationError;

export type HttpRecipeRepositoryValidationError = {
  code: HttpRecipeRepositoryErrorCode.VALIDATION_ERROR;
  error: ValidationError;
};

enum HttpRecipeRepositoryErrorCode {
  VALIDATION_ERROR,
}