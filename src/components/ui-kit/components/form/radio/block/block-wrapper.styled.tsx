import { Colors, SpacingProps, spacingStyle, styled } from '@/ui-kit';
import { FormRadioBlockStyled } from './block.styled';

export const FormRadioBlockWrapperStyled = styled('div')<SpacingProps>`
  display: flex;
  ${(props) => spacingStyle(props)}

  > * {
    ${FormRadioBlockStyled} {
      background: ${Colors.white};
    }
    input:checked ~ ${FormRadioBlockStyled} {
      background: ${Colors.gray500};
    }
    &:first-child {
      ${FormRadioBlockStyled} {
        border-bottom-left-radius: 40px;
        border-top-left-radius: 40px;
      }
    }
    &:last-child {
      ${FormRadioBlockStyled} {
        border-bottom-right-radius: 40px;
        border-top-right-radius: 40px;
      }
    }
  }
`;
