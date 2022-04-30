import { css, styled } from '../../../utils';
import { ModalSizesType } from '../const';
import { ModalProps } from '../types';
import { SpacingProps, FullWidthHelper, spacingStyle, fullWidthHelperStyle } from '../../../const';

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

export const ModalBodyStyled = styled('div')<ModalProps & SpacingProps & FullWidthHelper>`
  float: left;
  margin-bottom: 20px;
  padding: 0 10px;
  width: 100%;
  ${({ measure }) => modalSize(measure)};
  ${(props) => spacingStyle(props)}
  ${({ fullWidth }) => fullWidthHelperStyle(fullWidth)}
`;
