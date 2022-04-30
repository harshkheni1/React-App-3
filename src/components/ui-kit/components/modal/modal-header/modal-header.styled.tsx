import { css, styled } from '../../../utils';
import { Button } from '../../button';
import { ModalDialogProps } from '../modal-dialog/types';
import { Colors } from '../../../const';
import { ModalSizesType } from '../const';
import { IconStyled } from '../../icon';

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

export const CloseButton = styled(Button)`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;
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

export const ModalHeaderStyled = styled('div')<ModalDialogProps>`
  padding: 15px 60px;
  text-align: center;
  width: 100%;
  float: left;
  display: block;
  ${({ measure }) => modalSize(measure)};
`;
