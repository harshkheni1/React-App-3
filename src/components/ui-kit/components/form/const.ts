import { FormControlActionType, FormControlDefaultType, FormControlSizeStyleType } from './types';
import { Colors, ElementSizesType } from '../../const';
import { css } from '../../utils';
import { IconStyled } from '../icon';

export const FormControlSm: FormControlSizeStyleType = {
  height: 44,
  fontSize: 12,
  lineHeight: 22,
  paddingVertical: 10,
  paddingHorizontal: 15,
};

export const FormControlMd: FormControlSizeStyleType = {
  height: 52,
  fontSize: 14,
  lineHeight: 16,
  paddingVertical: 16,
  paddingHorizontal: 16,
};

export const FormControlLg: FormControlSizeStyleType = {
  height: 56,
  fontSize: 14,
  lineHeight: 36,
  paddingVertical: 10,
  paddingHorizontal: 15,
};

export const FormControlSize: { [key in ElementSizesType]?: FormControlSizeStyleType } = {
  sm: FormControlSm,
  md: FormControlMd,
  lg: FormControlLg,
};

export const FormControlDefault: FormControlDefaultType = {
  color: Colors.gray800,
  placeholderColor: Colors.gray700,
  border: `1px solid ${Colors.gray700}`,
};

export const FormControlDisabled: FormControlActionType = {
  color: Colors.gray700,
  backgroundColor: Colors.gray300,
  border: `1px solid ${Colors.gray500}`,
};

export const FormControlFocused: FormControlActionType = {
  border: `2px solid ${Colors.primary}`,
};

export const FormControlError: FormControlActionType = {
  color: Colors.danger,
  border: `2px solid ${Colors.danger}`,
};

export const FormControlSuccess: FormControlActionType = {
  color: Colors.success,
  border: `2px solid ${Colors.success}`,
};

export const formControlBasic = css`
  width: 100%;
  display: block;
  box-sizing: border-box;
  appearance: none;
`;

export const formControlSizeVariant = (measure: ElementSizesType) => css`
  font-size: ${FormControlSize[measure].fontSize}px;
  line-height: ${FormControlSize[measure].lineHeight}px;
  padding: ${FormControlSize[measure].paddingVertical}px ${FormControlSize[measure].paddingHorizontal}px;
`;

export const formControlColorVariant = () => css`
  color: ${FormControlDefault.color};
  background-color: ${FormControlDefault.backgroundColor};
  border: ${FormControlDefault.border};

  &.is-invalid {
    border-color: ${Colors.danger};
  }
  &.is-success {
    border-color: ${Colors.success};

    & + ${IconStyled} {
      opacity: 1;
      z-index: 0;
    }
  }
`;

export const formControlPlaceholder = css`
  &::-webkit-input-placeholder {
    color: ${FormControlDefault.placeholderColor};
    text-transform: none;
  }
  &::-moz-placeholder {
    color: ${FormControlDefault.placeholderColor};
    text-transform: none;
  }
  &:-ms-input-placeholder {
    color: ${FormControlDefault.placeholderColor};
    text-transform: none;
  }
`;

export const formControlFocusVariant = css`
  &:focus {
    border: ${FormControlFocused.border};
    box-shadow: 0 0 0 2px rgba(0, 103, 244, 0.5);
  }
`;

export const formControlDisabledVariant = css`
  &:disabled {
    background-color: ${FormControlDisabled.backgroundColor};
    border: ${FormControlDisabled.border};
  }
`;
