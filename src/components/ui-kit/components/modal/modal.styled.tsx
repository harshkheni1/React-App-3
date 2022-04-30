import { styled } from '../../utils';
import { ModalSizesType } from './const';
import { spacingStyle } from '../../const/helpers';
import { ModalBackgroundProps } from './types';

export const ModalBackgroundStyled = styled('div')<{ measure?: ModalSizesType } & ModalBackgroundProps>`
  position: fixed;
  overflow-y: auto;
  padding: ${({ measure }) => (measure === 'full' ? '0' : '50px')} 0;
  top: 0;
  left: 0;
  width: 100%;
  > div {
    width: 94%;
  }
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: block;
  ${(props) => spacingStyle(props)}
`;
