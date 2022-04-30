import { styled } from '../../../../utils';
import { Modal } from '../../modal';
import { ModalHeaderStyled } from '../../modal-header';
import { ModalFooterStyled } from '../../modal-footer';
import { ModalBodyStyled } from '../../modal-body';

export const IeModalStyled = styled(Modal)`
  ${ModalFooterStyled}, ${ModalBodyStyled}, ${ModalHeaderStyled} {
    max-width: 600px;
  }
`;
