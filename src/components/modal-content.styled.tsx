import { styled, Box, SectionStyled } from '@/ui-kit';

export const ModalContainerStyled = styled(Box)`
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;

  ${SectionStyled} > *:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
