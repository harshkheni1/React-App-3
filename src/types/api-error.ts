import { ValidationErrors } from './validation-errors';

export interface ApiError {
  statusCode: number;
  error: string;
  message: string;
  errors?: ValidationErrors;
  timestamp?: string;
  path?: string;
}
