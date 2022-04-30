import { createGlobalStyle, css, styled } from '../../../utils';
import { FontFamilyValue, Colors, GridBreakpointsMediaDown, SpacingProps, spacingStyle } from '../../../const';
import { DatepickerDefaultStyled } from './datepicker-default.styled';
import { FormControlDefault } from '../const';
import { Button } from '../../button';
import { Icon, IconStyled } from '../../icon';
import { FormDatepickerProps } from './types';

export const CloseBackgroundStyled = styled('div')`
  background-color: rgba(25, 25, 25, 0.5);
  display: none;
`;

export const CloseButtonStyled = styled(Button)`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  min-height: 40px;
  min-width: 40px;
  display: none;

  ${IconStyled} * {
    fill: #000;
  }
  &:hover,
  &:focus {
    ${IconStyled} * {
      fill: ${Colors.primary};
    }
  }
`;

export const FormDatepickerMobileStyled = css`
  ${CloseBackgroundStyled} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 364px);
    z-index: 19;
    display: block !important;
  }

  .react-datepicker {
    &__triangle {
      display: none;
    }
    &__portal {
      align-items: flex-end !important;
    }
    &-popper {
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      top: initial !important;
      max-height: 100vh;
      overflow: auto;
      transform: initial !important;
      margin: 0;
    }
    &__month {
      padding-bottom: 10px;

      &-container {
        width: 100vw;
        float: none;
        min-height: 364px;
      }
    }
    &__day {
      line-height: 40px !important;

      &::before,
      &::after {
        display: none;
      }
    }
  }

  ${CloseButtonStyled} {
    display: block !important;
  }
`;

export const FormDatepickerStyled = createGlobalStyle<FormDatepickerProps>`
${DatepickerDefaultStyled}
.react-datepicker {
  border: none;
  box-shadow: 0 2px 6px rgba(0,0,0,.05),0 0 0 1px rgba(0,0,0,.07);
  font-family: ${FontFamilyValue.primary};
  border-radius: 0;

  &-wrapper {
    display: block;
    flex: 1;
  }

  &-popper {
    z-index: 20;
  }
  &-popper[data-placement^="top"] .react-datepicker__triangle {
    border-top-color: ${Colors.white};
   &::before {
     border-top-color: rgba(0,0,0,.05);
   }
  }
  
  &-popper[data-placement^="bottom"] .react-datepicker__triangle {
    border-bottom-color: ${Colors.gray400};
	  &::before {
	    border-bottom-color: rgba(0,0,0,.05);
	  }
  }

  &__navigation {
    border-width: 6px;
    top: 16px;

    &--previous {
      border-right-color: ${Colors.gray800};

      &:hover,
      &:focus {
        border-right-color: ${Colors.primary};
      }
    }

    &--next {
      border-left-color: ${Colors.gray800};

      &:hover,
      &:focus {
        border-left-color: ${Colors.primary};
      }
    }
  }

  &__header {
    background-color: ${Colors.white};
    border-bottom: 1px solid ${Colors.gray700};
    padding: 0;

    .react-datepicker__current-month {
      display: none;
    }

    .react-datepicker {
      &__header__dropdown {
        text-align: center;
      }

      &__month-dropdown-container,
      &__year-dropdown-container {
        position: relative;
      }

      &__month-dropdown-container {
        min-width: 80px;
      }

      &__month-dropdown,
      &__year-dropdown {
        width: 100%;
        left: 0;
        background-color: ${Colors.white};
        border: 1px solid ${Colors.gray800};
        border-radius: 0;
        margin-top: -1px;
      }

      &__navigation--previous,
      &__navigation--next {
        top: 18px;
      }

      &__month-option,
      &__year-option {
        text-align: left;
        line-height: 20px;
        padding: 0 5px;

        &:first-of-type,
        &:last-of-type {
          border-radius: 0;
        }

        &:hover {
          background-color: ${Colors.secondaryLight};
        }
      }

      &__month-option.react-datepicker__month-option--selected_month,
      &__year-option.react-datepicker__year-option--selected_year {
        color: ${Colors.white};
        background-color: ${Colors.primary};
      }

      &__month-option--selected,
      &__year-option--selected {
        display: none;
      }

      &__navigation--month,
      &__navigation--years {
        display: none;
      }

      &__month-read-view,
      &__year-read-view {
        background: ${Colors.white};
        position: relative;
        border: 1px solid ${Colors.gray800};
        text-align: left;
        padding: 5px;
        visibility: visible !important;
        border-radius: 0;
      }

      &__month-read-view--down-arrow,
      &__year-read-view--down-arrow {
        border-width: 4px;
        left: -4px;
        top: 5px;
        border-top-color: ${Colors.gray800};
        margin-left: 12px;
      }

      &__month-read-view:hover .react-datepicker__month-read-view--down-arrow,
      &__year-read-view:hover .react-datepicker__year-read-view--down-arrow {
        border-top-color: ${Colors.gray800};
      }
    }
  }
  
  &__month {
    margin: 0;
    
    &-container {
      width: 260px;
    }
  }

  &__day {
    width: calc(100% / 7) !important;
    margin: 0;
    border-radius: 0;
    color: ${Colors.primary};
    font-weight: bold;
    font-size: 14px;
    line-height: 22px !important;
    
    &::before {
	    content: '';
	    display: block;
	    padding-bottom: 50%;
	    margin-bottom: -11px;
    }
    
    &::after {
      content: '';
	    display: block;
	    padding-top: 50%;
	    margin-top: -11px;
    }
    
    &:hover {
      background: ${Colors.gray200};
      border-radius: 0;
    }
    
    &-name {
      font-size: 12px;
      color: ${Colors.gray800};
      margin: 5px 0 0;
      width: calc(100% / 7) !important;
    }
    &--outside-month {
      color: ${Colors.gray500};
      &:hover {
        color: ${Colors.gray800};
      }
    }
    &--disabled {
      color: ${Colors.gray300} !important;
      background: none !important;
    }
    &.react-datepicker__day--keyboard-selected,
    &.react-datepicker__day--selected {
      background-color: ${Colors.primary};
      color: ${Colors.white};
      font-weight: bold;
    }
  }
  
  &__input-container {
    input {
      appearance: none;
      border-radius: 0;
      box-shadow: none;
      &::placeholder { /* Most modern browsers support this now. */
        ${({ placeholderText }) => (placeholderText == 'Required' ? `color: ${Colors.red}` : '')};
        font-size: 14px;
      }
    }
  }
}
${GridBreakpointsMediaDown.md} {
 ${FormDatepickerMobileStyled};
}
`;

export const FormDatepickerInputStyled = styled('input')`
  width: 100%;
  background-color: transparent !important;
  border-radius: 0;
  position: relative;
  border-color: ${Colors.gray700};
  &::after {
    content: attr(placeholder) !important;
    font-size: 12px;
    color: ${FormControlDefault.placeholderColor};
    text-transform: lowercase;
    font-weight: 400;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    letter-spacing: 0.8px;
  }
  &:not([value='']):after {
    content: '' !important;
  }
`;

export const FormDatepickerIconStyled = styled(Icon)`
  top: 50%;
  left: 50%;
  position: absolute;
  display: block;
  font-size: 11px;
`;
export const FormDatepickerPrevIconStyled = styled(Button)`
  width: 30px;
  height: 100%;
  ${FormDatepickerIconStyled} {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  /* stylelint-disable */
  svg > * {
    fill: ${Colors.gray800};
  }

  &:hover {
    ${FormDatepickerIconStyled} > * {
      fill: ${Colors.primary} !important;
    }
  }
`;

export const FormDatepickerNextIconStyled = styled(Button)`
  width: 30px;
  height: 100%;
  ${FormDatepickerIconStyled} {
    transform: translate(-50%, -50%) rotate(-90deg);
  }
  svg > * {
    fill: ${Colors.gray800};
  }

  &:hover {
    ${FormDatepickerIconStyled} > * {
      fill: ${Colors.primary} !important;
    }
  }
`;

export const FormDatepickerSelectStyled = styled('div')`
  border: 1px solid ${Colors.gray300};
  background: ${Colors.white};
  position: relative;
  ${IconStyled} {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    z-index: 0;
    font-size: 8px;
  }

  select {
    background: transparent;
    appearance: none;
    border: none;
    box-shadow: none;
    width: 100%;
    border-radius: 0;
    padding: 8px 20px 8px 10px;
    font-size: 11px;
    font-weight: bold;
    position: relative;
    z-index: 1;
  }
`;

export const FormDatepickerWrapStyled = styled('div')<SpacingProps>`
  position: relative;
  ${(props) => spacingStyle(props)}
`;
