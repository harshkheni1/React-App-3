export interface FormControlBasicType {
  color?: string;
  border: string;
  backgroundColor?: string;
}

export interface FormControlDefaultType extends FormControlBasicType {
  placeholderColor: string;
}

export interface FormControlActionType extends FormControlBasicType {
  icon?: any;
}

export interface FormControlSizeStyleType {
  height: number;
  fontSize: number;
  lineHeight: number;
  paddingVertical: number;
  paddingHorizontal: number;
}
