import { styled, Button, Box, GridBreakpointsMediaDown, GridBreakpointsMediaUp } from '@/ui-kit';

export const ShowMoreButtonStyled = styled(Button)`
  font-size: 14px;
  font-weight: normal;
  letter-spacing: normal;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

export const ImageStyled = styled(Box)`
  width: 64px;
  min-width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #f3f3f3;
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  &::before {
    content: '';
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(219, 225, 235, 0.9);
    text-align: center;
    line-height: 65px;
    font-size: 14px;
    font-weight: 600;
  }
`;

const imageCounter = (count, exist) => {
  if (count <= exist) {
    return '';
  }

  return `
  > *:first-child::before {
    display: block;
    content: '+${count - exist}';
  }
  `;
};

export const ImageWrapperStyled = styled(Box)<{ count?: number }>`
  overflow: hidden;
  float: right;
  flex-direction: row-reverse;

  ${({ count }) =>
    count &&
    `      
    ${GridBreakpointsMediaDown.lg} {
      width: 310px;
      ${imageCounter(count, 4)}
    }
    ${GridBreakpointsMediaDown.md} {
      width: 240px;
      ${imageCounter(count, 3)}
    }
    ${GridBreakpointsMediaDown.sm} {
      width: 80px;
      ${imageCounter(count, 1)}
    } 
    ${GridBreakpointsMediaUp.lg} {
      width: 390px;
      ${imageCounter(count, 5)}
    }
  `};
`;
