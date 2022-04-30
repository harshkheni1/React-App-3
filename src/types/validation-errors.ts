export interface ValidationErrors {
  [key: string]: string | string[];
}

export const ValidatorTrimmedRequired = (value: string): string | boolean => {
  if (!value || value.trim().length === 0) {
    return 'Required';
  }

  return true;
};
