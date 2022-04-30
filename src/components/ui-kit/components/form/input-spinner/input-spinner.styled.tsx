import { styled } from '../../../utils';
import { Button } from '../../../';
import { InputSpinnerProps } from './types';

export const InputSpinnerWrapStyled = styled('div')`
  display: flex;
`;

export const InputSpinnerControlStyled = styled(Button)`
  min-height: 100%;
  padding: 0;
`;

export const InputSpinnerStyled = styled('input')<InputSpinnerProps>`
  width: ${({ measure }) => (measure === 'md' ? '70px' : '40px')};
  font-size: ${({ measure }) => (measure === 'md' ? '24px' : '16px')};
  font-weight: 700;
  text-align: center;
  padding: ${({ measure }) => (measure === 'md' ? '0 15px' : '0 5px')};
  border: none;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  &:disabled {
    border: none;
    background-color: unset;
  }

  &:read-only {
    outline: none;
  }
`;
