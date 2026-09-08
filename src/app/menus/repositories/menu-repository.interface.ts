import { Result } from "../../toolBox/result/implementations/result";
import { ValidationError } from "../../toolBox/validation/validation.interface";
import { WeekMenu } from "../interfaces/menu.interface";

export interface IMenuRepository {
  findWeeks(id: string): Promise<Result<WeekMenu, MenuRepositoryError>>;
}

export type MenuRepositoryError = MenuRepositoryValidationError;

export type MenuRepositoryValidationError = {
  code: MenuRepositoryErrorCode.VALIDATION_ERROR;
  error: ValidationError;
};

export enum MenuRepositoryErrorCode {
  VALIDATION_ERROR,
}
