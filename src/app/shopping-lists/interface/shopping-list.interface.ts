import type { Ingredient } from "../../recipes/interfaces/recipe.interface";

export type ShoppingList = { [ingredientName: string]: Ingredient[] };
