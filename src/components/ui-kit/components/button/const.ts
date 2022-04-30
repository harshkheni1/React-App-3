import { ArrayToType, Colors, ElementSizesType } from '../../const';
import { ButtonProps, ButtonSizeStylesType } from './types';

export const ButtonTypeArray = ['button', 'reset', 'submit'] as const;
export type ButtonTypesType = ArrayToType<typeof ButtonTypeArray>;

export const ButtonSizeArray = ['sm', 'md', 'lg'] as const;
export type ButtonSizeType = ArrayToType<typeof ButtonSizeArray>;

export const ButtonTagArray = ['button', 'a', 'div', 'label'] as const;
export type ButtonTagsType = ArrayToType<typeof ButtonTagArray>;

export const ButtonVariantArray = ['solid', 'outlined', 'flat', 'link'] as const;
export type ButtonVariantType = ArrayToType<typeof ButtonVariantArray>;

export const ButtonColorArray = [
  'primary',
  'primaryDark',
  'secondaryLight',
  'gray500',
  'gray700',
  'gray800',
  'danger',
] as const;
export type ButtonColorType = ArrayToType<typeof ButtonColorArray>;

export const ButtonStylePropsArray = ['bg', 'color', 'border'] as const;
export type ButtonStylePropsType = ArrayToType<typeof ButtonStylePropsArray>;

export const ButtonStates = ['&', '&:hover', '&:disabled'];

export const ButtonSizeStyles: { [key in ElementSizesType]?: ButtonSizeStylesType } = {
  sm: {
    height: 40,
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 9,
    paddingHorizontal: 15,
    letterSpacing: 1,
  },
  md: {
    height: 48,
    fontSize: 16,
    lineHeight: 22,
    paddingVertical: 12,
    paddingHorizontal: 20,
    letterSpacing: 1,
  },
  lg: {
    height: 50,
    fontSize: 16,
    lineHeight: 22,
    paddingVertical: 13,
    paddingHorizontal: 20,
    letterSpacing: 2,
  },
};

// Color array values [default, hover, disabled]
export const ButtonStyles: {
  [key in ButtonVariantType]?: { [key in ButtonColorType]?: { [key in ButtonStylePropsType]?: any[] } };
} = {
  solid: {
    primary: {
      bg: [Colors.primary, Colors.primaryDark, Colors.gray500],
      color: [Colors.white, Colors.white, Colors.gray700],
      border: [Colors.primary, Colors.primaryDark, Colors.gray500],
    },
    primaryDark: {
      bg: [Colors.primaryDark, Colors.primaryLight, Colors.gray500],
      color: [Colors.white, Colors.white, Colors.gray700],
      border: [Colors.primaryDark, Colors.primaryLight, Colors.gray500],
    },
    secondaryLight: {
      bg: [Colors.secondaryLight, Colors.secondary, Colors.gray500],
      color: [Colors.gray800, Colors.gray800, Colors.gray700],
      border: [Colors.secondaryLight, Colors.secondary, Colors.gray500],
    },
    gray500: {
      bg: [Colors.gray500, Colors.primaryDark, Colors.gray500],
      color: [Colors.white, Colors.white, Colors.gray700],
      border: [Colors.gray500, Colors.primaryDark, Colors.gray500],
    },
    gray700: {
      bg: [Colors.gray700, Colors.primaryDark, Colors.gray500],
      color: [Colors.white, Colors.white, Colors.gray700],
      border: [Colors.gray700, Colors.primaryDark, Colors.gray500],
    },
    gray800: {
      bg: [Colors.gray800, Colors.primaryDark, Colors.gray500],
      color: [Colors.white, Colors.white, Colors.gray700],
      border: [Colors.gray800, Colors.primaryDark, Colors.gray500],
    },
    danger: {
      bg: [Colors.danger, Colors.redDark, Colors.gray500],
      color: [Colors.white, Colors.white, Colors.gray700],
      border: [Colors.danger, Colors.redDark, Colors.gray500],
    },
  },
  outlined: {
    primary: {
      bg: [Colors.transparent, Colors.primary, Colors.transparent],
      color: [Colors.primary, Colors.white, Colors.gray700],
      border: [Colors.primary, Colors.red, Colors.gray700],
    },
    primaryDark: {
      bg: [Colors.transparent, Colors.primaryDark, Colors.transparent],
      color: [Colors.primaryDark, Colors.white, Colors.gray700],
      border: [Colors.primaryDark, Colors.yellow, Colors.gray700],
    },
    secondaryLight: {
      bg: [Colors.transparent, Colors.secondaryLight, Colors.transparent],
      color: [Colors.secondaryLight, Colors.gray800, Colors.gray700],
      border: [Colors.secondaryLight, Colors.secondary, Colors.gray700],
    },
    gray500: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.gray500, Colors.primaryDark, Colors.gray700],
      border: [Colors.gray500, Colors.primaryDark, Colors.gray700],
    },
    gray700: {
      bg: [Colors.transparent, Colors.gray700, Colors.transparent],
      color: [Colors.gray700, Colors.white, Colors.gray700],
      border: [Colors.gray700, Colors.gray700, Colors.gray700],
    },
    gray800: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.gray800, Colors.primaryDark, Colors.gray700],
      border: [Colors.gray800, Colors.primaryDark, Colors.gray700],
    },
    danger: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.danger, Colors.redDark, Colors.gray700],
      border: [Colors.danger, Colors.redDark, Colors.gray700],
    },
  },
  flat: {
    primary: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.primary, Colors.primary, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    primaryDark: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.primaryDark, Colors.primaryDark, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    secondaryLight: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.secondaryLight, Colors.secondary, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    gray500: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.gray500, Colors.primaryDark, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    gray700: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.gray700, Colors.primaryDark, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    gray800: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.gray800, Colors.primaryDark, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    danger: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.danger, Colors.redDark, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
  },
  link: {
    primary: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.primary, Colors.primary, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    primaryDark: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.primaryDark, Colors.primaryDark, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    secondaryLight: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.secondaryLight, Colors.secondary, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    gray500: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.gray500, Colors.primaryDark, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    gray700: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.gray700, Colors.primaryDark, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    gray800: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.gray800, Colors.primaryDark, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
    danger: {
      bg: [Colors.transparent, Colors.transparent, Colors.transparent],
      color: [Colors.danger, Colors.redDark, Colors.gray700],
      border: [Colors.transparent, Colors.transparent, Colors.transparent],
    },
  },
};

export const ButtonDefault: ButtonProps = {
  variant: 'solid',
  color: 'primary',
  type: 'button',
  measure: 'md',
  disabled: false,
  fullWidth: false,
  uppercase: true,
  shade: false,
};
