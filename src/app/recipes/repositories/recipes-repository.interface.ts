import { Result } from "../../toolBox/result/implementations/result";
import { Recipe } from "../interfaces/recipe.interface";

export interface IRecipeRepository<E extends unknown = unknown> {
  get(id: string): Promise<Result<Recipe, E>>;
}
