import { styled } from '../../utils';
import { Colors, GridBreakpointsMediaDown, GridBreakpointsMediaUp, SpacingProps, spacingStyle } from '../../const';
import { TextStyled } from '../text/text.styled';
import { IconStyled } from '../icon';

export const StepEditorTitleStyled = styled('div')`
  position: relative;
  z-index: 9;
  ${GridBreakpointsMediaDown.lg} {
    display: flex;
    justify-content: space-between;
    margin-left: -1px;
    margin-right: -1px;

    > * {
      padding: 18px 16px;
      background: ${Colors.secondary};
      margin-right: 1px;
      margin-left: 1px;
      display: flex;
      align-items: center;
      width: 51px;
      min-width: 51px;
    }
  }

  > ${IconStyled} {
    transition: 0.3s;
  }
  > ${TextStyled} {
    width: 100%;
    letter-spacing: 1.65px;
  }
`;

export const StepEditorContainerStyled = styled('div')`
  background: ${Colors.white};

  ${GridBreakpointsMediaDown.lg} {
    left: 0;
    position: absolute;
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.41);
    width: 100%;
    z-index: 8;
    background-color: #faf4ef;
  }

  ${GridBreakpointsMediaUp.lg} {
    margin-left: -1px;
    margin-right: -1px;
    display: flex;
  }
`;

export const StepEditorItemContainerStyled = styled('div')`
  padding: 18px 16px;
  background: ${Colors.secondaryLight};

  ${GridBreakpointsMediaUp.lg} {
    display: none !important;
  }
`;

export const StepEditorItemIconStyled = styled('div')`
  ${GridBreakpointsMediaUp.lg} {
    padding: 18px 16px 18px 0;
    height: auto;
  }
  ${GridBreakpointsMediaDown.lg} {
    display: flex;
    align-items: center;
  }
`;

export const StepEditorItemStyled = styled('div')<{ disabled?: boolean }>`
  cursor: pointer;
  display: block;
  ${GridBreakpointsMediaUp.lg} {
    margin-left: 1px;
    margin-right: 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: ${Colors.secondaryLight};

    > ${TextStyled} {
      padding: 18px 16px;
    }
  }

  ${GridBreakpointsMediaDown.lg} {
    display: flex;
    justify-content: space-between;
    margin-left: -1px;
    margin-right: -1px;

    &:not(:last-child) {
      margin-bottom: 2px;
    }

    > * {
      padding: 18px 16px;
      background: ${Colors.white};
      margin-right: 1px;
      margin-left: 1px;
      width: 51px;
      min-width: 51px;
    }

    ${StepEditorItemContainerStyled} {
      width: 100%;
    }
  }

  ${({ disabled }) =>
    disabled &&
    `
    ${GridBreakpointsMediaDown.lg} {
      display: none !important;
    }
    cursor: auto !important;
    > ${TextStyled} {
     color: ${Colors.gray300} !important;
    }
  `}
`;

export const StepEditorStyled = styled('div')<SpacingProps & { active?: boolean }>`
  position: relative;
  ${GridBreakpointsMediaDown.lg} {
    background: ${Colors.secondaryLight};
  }

  /* stylelint-disable */
  ${GridBreakpointsMediaDown.lg} {
    ${({ active }) =>
      active
        ? `
          ${StepEditorContainerStyled} {
            display: block;
          }
          
          ${StepEditorTitleStyled} {
            ${IconStyled} {
              transform: rotate(180deg);
            }
          }
        `
        : `
          ${StepEditorContainerStyled} {
            display: none;
          }
        `}
  }

  ${(props) => spacingStyle(props)}
`;
