import { styled } from '../../../utils';
import { Colors, SpacingProps, spacingStyle } from '../../../const';

export const OptionPlanHeaderStyled = styled('div')<{ radio?: boolean }>`
  border-bottom: 1px solid ${Colors.gray500};
  padding: 15px 15px 15px 50px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    width: 18px;
    height: 18px;
    border: 1px solid ${Colors.primary};
    background: ${Colors.white};
    transition: 0.3s;
    ${({ radio }) => radio && 'border-radius: 100%;'}
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    transition: 0.3s;
    opacity: 0;
    top: 50%;

    ${({ radio }) =>
      radio
        ? `width: 8px; height: 8px; background: ${Colors.white}; border-radius: 100%; transform: translateY(-50%); left: 20px;`
        : `width: 10px; height: 7px; border: solid ${Colors.white}; border-width: 0 0 2px 2px; left: 19px; transform: translateY(calc(-50% + -2px)) rotate(-50deg);`}
  }
`;

export const OptionPlanInputStyled = styled('input')`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: -1;
  margin: 0;
  padding: 0;

  &:checked {
    ~ ${OptionPlanHeaderStyled} {
      background: ${Colors.gray200};
      &::before {
        background: ${Colors.primary};
      }
      &::after {
        opacity: 1;
      }
    }
  }

  &:disabled {
    ~ ${OptionPlanHeaderStyled} {
      bottom: 0;
    }
  }
`;

export const OptionPlanWrapStyled = styled('label')<SpacingProps & { simpleElement?: boolean }>`
  position: relative;
  display: block;
  ${(props) => spacingStyle(props)};
  background: ${Colors.white};
  border-radius: 10px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  ${({ simpleElement }) => !simpleElement && 'cursor: pointer;'}

  &:hover {
    ${OptionPlanHeaderStyled} {
      background: ${Colors.gray200};
    }
  }
`;
