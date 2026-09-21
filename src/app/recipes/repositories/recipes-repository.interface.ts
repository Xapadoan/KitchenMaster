import type { Result } from "../../toolBox/result/implementations/result";
import type { Recipe } from "../interfaces/recipe.interface";

export interface IRecipeRepository<E = unknown> {
	get(id: string): Promise<Result<Recipe, E>>;
}
