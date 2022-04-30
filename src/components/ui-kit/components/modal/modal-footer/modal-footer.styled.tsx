import { css, styled } from '../../../utils';
import {
  GridBreakpointsMediaDown,
  SpacingProps,
  spacingStyle,
  FullWidthHelper,
  fullWidthHelperStyle,
} from '../../../const';
import { ModalSizesType } from '../const';
import { ModalProps } from '../types';

const modalSize = (measure: ModalSizesType) => {
  switch (measure) {
    case 'lg':
      return css`
        display: block;
        max-width: 500px;
        margin: 0 auto;
        float: none;
      `;
  }

  return false;
};

export const ModalFooterStyled = styled('div')<ModalProps & SpacingProps & FullWidthHelper>`
  display: block;
  float: left;
  padding: 10px 10px 50px;
  width: 100%;
  ${({ measure }) => modalSize(measure)};

  ${GridBreakpointsMediaDown.lg} {
    padding-bottom: 10px;
  }
  ${(props) => spacingStyle(props)}
  ${({ fullWidth }) => fullWidthHelperStyle(fullWidth)}
`;
