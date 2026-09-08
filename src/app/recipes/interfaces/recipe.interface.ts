import { Result } from "../../toolBox/result/implementations/result";
import {
  IValidate,
  ValidationError,
  ValidationErrorCode,
} from "../../toolBox/validation/validation.interface";

export type Recipe = {
  name: string;
  description?: string;
  ingredients: string[];
  steps: string[];
  anticipation?: string;
  quantity: number;
};
