import React, { FC } from 'react';
import { darken } from 'polished';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { styled } from '../../../utils';
import { Colors, TextSize, spacingStyle, SpacingProps } from '../../../const';
import { FormSelectProps } from './types';
import { IconStyled } from '../../icon';
import { FormControlSize, formControlSizeVariant } from '../const';
import { FormInputBasicStyles } from '../input';

export const FormSelectContainerStyled = styled('div')<SpacingProps>`
  ${(props) => spacingStyle(props)};
`;

export const FormSelectChild: FC<FormSelectProps> = (props) =>
  props.isCreatable ? <CreatableSelect {...props} /> : <Select {...props} />;

export const FormMobileSelectStyled = styled('div')<{ hideError?: boolean }>`
  position: relative;
  width: 100%;
  background: ${Colors.white};
  ${IconStyled} {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
  }
  > select {
    height: ${FormControlSize['md'].height}px;
    ${formControlSizeVariant('md')};
    ${FormInputBasicStyles};
    padding-right: 40px;
    position: relative;
    z-index: 1;
    background: transparent;
    ${({ hideError }) =>
      !hideError &&
      `
      &.is-invalid {
        margin-bottom: 30px;
      }
      + .invalid-feedback {
        position: absolute;
        bottom: -24px;
        left: 0;
      }
    `}
  }
`;

export const FormSelectStyled = styled(FormSelectChild)<FormSelectProps>`
.react-select__placeholder { /* Most modern browsers support this now. */
  font-size: 14px;
   ${({ placeholder }) => (placeholder == 'Required' ? `color: ${Colors.red}` : '')}
}
  .react-select,
  .react-select-creatable {
    &__control {
      color:${Colors.red}
      border-radius: 0;
      border: ${({ error }) => `1px solid ${error ? Colors.danger : Colors.gray700}`};
      line-height: 20px;
      box-sizing: border-box;
      font-size: ${TextSize.xs};
      &:hover {
        box-shadow: none;
        outline: none;
        border: 1px solid ${Colors.gray700};
      }
      &--menu-is-open,
      &--is-focused {
        box-shadow: inset 0 0 0 1px rgba(61, 178, 215, 0.8);
        outline: none;
        border: 1px solid #3e9dbb;
      }
      &--is-disabled {
        border: 1px solid ${Colors.gray300};
        color: ${Colors.gray500};
        background-color: ${Colors.gray100};
        .react-select__dropdown-indicator ${IconStyled} {
          fill: ${Colors.gray300} !important;
        }
      }
    }
    &__value-container {
      min-height: 50px;
      padding: 5px 15px;
    }
    &__indicator {
      width: 36px;
      height: 50px;
      box-sizing: border-box;
      position: relative;

      &-separator {
        display: none;
      }
    }
    &__clear-indicator {
      width: auto;
      padding: 14px 5px;
      cursor: pointer;
      &:hover {
        color: ${darken(0.1, Colors.primary)};
      }
    }
    &__dropdown-indicator-inner {
      width: 20px;
      height: 20px;
      text-align: center;
      position: absolute;
      top: 50%;
      margin: -10px 0 0;
    }
    &__menu {
      margin: -1px 0 0;
      border-radius: 0;
      z-index: 11;
      box-shadow: none;
      padding: 0;
      border: 1px solid ${Colors.gray700};
      &-notice {
        font-size: ${TextSize.xs};
      }
      &-list {
        padding: 0;
      }
    }
    &__multi-value {
      background-color: ${Colors.gray400};
      &__label {
        height: 32px;
        font-size: ${TextSize.xs};
        padding: 5px 10px;
        line-height: 22px;
      }
      &__remove {
        width: 32px;
        background-color: ${Colors.gray400};
        cursor: pointer;
        text-align: center;
        svg {
          margin: 0 auto;
        }

        &:hover,
        &:focus {
          background-color: ${Colors.gray400};
        }
      }
    }
    &__clear-btn {
      width: 22px;
      height: 22px;
      background-color: ${Colors.gray400};
      border: none;
      padding: 6px;
      line-height: 8px;
      cursor: pointer;
      &:hover,
      &:focus {
        outline: none;
        background-color: ${Colors.gray500};
      }
    }
    &__no-result {
      height: 44px;
      padding: 10px 15px;
      line-height: 24px;
    }
    &__option {
      height: 44px;
      font-size: ${TextSize.xs};
      cursor: pointer;
      position: relative;
      padding: 10px 15px;
      line-height: 24px;
      color: ${Colors.gray800};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-bottom: 1px solid ${Colors.gray400};
    }
  }
  .react-select__option .react-select-creatable__check-block,
  .react-select-creatable__option .react-select__check-ico {
    display: none;
  }
  .react-select {
    &__option {
      padding-left: 50px;
      padding-right: 15px;
      .react-select__radio-ico,
      .react-select__check-ico {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
        border: 1px solid ${Colors.primary};
        text-align: center;
        line-height: 20px;

        svg {
          display: none;
        }
      }
      .react-select__radio-ico {
        border-radius: 100%;

        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 4px;
          border-radius: 100%;
          background: ${Colors.primary};
          opacity: 0;
        }
      }
      &.react-select__option--is-focused {
        box-shadow: inset 0 0 0 1px rgba(61, 178, 215, 0.8);
        background: inherit;
      }
      &:hover {
        background-color: ${Colors.gray500};
      }
      &.react-select__option--is-selected {
        background-color: ${Colors.transparent};
        cursor: default;
        position: relative;
        .react-select__check-ico {
          background-color: ${Colors.primary};
          svg {
            display: inline-block;
          }
        }
        .react-select__radio-ico {
          &::before {
            opacity: 1;
          }
        }
      }
    }
  }
  .react-select__option.react-select__location-wrap {
    padding-left: 35px;
    .react-select__location-icon {
      display: block;
      position: absolute;
      top: 50%;
      left: 15px;
      margin: -11px 0 0;
    }
    &.react-select__option--is-focused,
    &.react-select__option--is-selected {
      background-color: ${Colors.white};
      color: ${Colors.primaryDark};
      * {
        fill: ${Colors.primaryDark};
      }
    }
  }
  .react-select-creatable {
    &__option {
      padding-left: 48px;
      cursor: pointer;
      .react-select-creatable__check-block {
        width: 18px;
        height: 18px;
        border: 1px solid ${Colors.gray700};
        top: 50%;
        left: 16px;
        display: block;
        position: absolute;
        margin: -9px 0 0;
        padding: 2px;
        svg {
          margin: 2px 0 0 0;
          display: none;
        }
      }
      &.react-select-creatable__option--is-focused,
      &.react-select-creatable__option--is-selected {
        background-color: ${Colors.white};
      }
      &.react-select-creatable__option--is-selected {
        .react-select-creatable__check-block {
          svg {
            display: block;
          }
        }
      }
    }
  }
`;
