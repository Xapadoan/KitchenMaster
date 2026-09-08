import { IResult } from "../result/interfaces/result.interface";

export interface IValidate<T> {
  validate(item: unknown): IResult<T, ValidationError>;
}

export enum ValidationErrorCode {
  NOT_A_STRING = "NOT_A_STRING",
  NOT_AN_OBJECT = "NOT_AN_OBJECT",
  NOT_AN_ARRAY = "NOT_AN_ARRAY",
  NOT_A_NUMBER = "NOT_A_NUMBER",
  INTERNAL_VALIDATION_FAILED = "INTERNAL_VALIDATION_FAILED"
}

type BaseValidationError = {
  code: ValidationErrorCode.NOT_A_STRING | ValidationErrorCode.NOT_AN_OBJECT | ValidationErrorCode.NOT_AN_ARRAY | ValidationErrorCode.NOT_A_NUMBER;
  path: string;
};

type InternalValidationError = {
  code: ValidationErrorCode.INTERNAL_VALIDATION_FAILED
  path: string;
  error: ValidationError
}

export type ValidationError = BaseValidationError | InternalValidationError
