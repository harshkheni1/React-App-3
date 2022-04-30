import { css, styled } from '../../../utils';
import { Colors, GridBreakpointsMediaUp } from '../../../const';
import { ModalDialogProps } from './types';
import { ModalSizesType } from '../const';

const modalSize = (measure: ModalSizesType) => {
  switch (measure) {
    case 'sm':
      return css`
        ${GridBreakpointsMediaUp.sm} {
          max-width: 300px;
        }
      `;
    case 'md':
      return css`
        max-width: 500px;
      `;
    case 'lg':
      return css`
        ${GridBreakpointsMediaUp.lg} {
          max-width: 800px;
        }
      `;
    case 'xl':
      return css`
        ${GridBreakpointsMediaUp.lg} {
          max-width: 800px;
        }
        ${GridBreakpointsMediaUp.xl} {
          max-width: 1140px;
        }
      `;
    case 'full':
      return css`
        width: 100%;
        height: 100%;
        max-height: 100%;
        max-width: 100%;
      `;
  }

  return css`
    ${GridBreakpointsMediaUp.sm} {
      max-width: 500px;
    }
  `;
};
export const Dialog = styled('div')<ModalDialogProps>`
  background: ${Colors.white};
  border-radius: 10px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  display: block;
  position: relative;
  margin: 0 auto;
  ${({ measure }) => modalSize(measure)};
`;
