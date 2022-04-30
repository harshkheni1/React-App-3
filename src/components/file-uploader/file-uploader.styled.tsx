import {
  Button,
  styled,
  Text,
  PopoverWrapStyled as PopoverWrapDefaultStyled,
  PopoverStyled,
  GridBreakpointsMediaDown,
} from '@/ui-kit';

export const ButtonSectionStyled = styled(Button)`
  max-width: 270px;
  white-space: nowrap;
  text-align: left;
  border-radius: 0;
`;

export const FileNameStyled = styled(Text)`
  max-width: 460px;
  word-break: break-all;
`;

export const PopoverWrapStyled = styled(PopoverWrapDefaultStyled)`
  ${PopoverStyled} {
    ${GridBreakpointsMediaDown.md} {
      width: calc(100vw - 60px);
    }
  }
`;
