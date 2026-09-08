import { Recipe, RecipeValidator } from "../interfaces/recipe.interface";
import { IRecipeRepository } from "./recipes-repository.interface";
import { Result } from "../../toolBox/result/implementations/result";
import { ValidationError } from "../../toolBox/validation/validation.interface";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FileRecipeRepository
  implements IRecipeRepository<FileRecipeRepositoryError>
{
  constructor(
    @Inject(HttpClient)
    private readonly httpClient: HttpClient
  ) {}

  async get(id: string) {
    const fileContent: string = await new Promise((resolve) => {
      this.httpClient
        .get(`../assets/recipes/${id}.json`, { responseType: "text" })
        .subscribe((text) => {
          resolve(text);
        });
    });
    const rawJSON = JSON.parse(fileContent);

    const validator = new RecipeValidator();
    const result = validator.validate(rawJSON);
    if (result.isErr()) {
      return Result.err({
        code: FileRecipeRepositoryErrorCode.VALIDATION_ERROR,
        error: result.unwrapErr(),
      });
    }
    return Result.ok(result.unwrap());
  }
}

export type FileRecipeRepositoryError = FileRecipeRepositoryValidationError;

export type FileRecipeRepositoryValidationError = {
  code: FileRecipeRepositoryErrorCode.VALIDATION_ERROR;
  error: ValidationError;
};

enum FileRecipeRepositoryErrorCode {
  VALIDATION_ERROR,
}
