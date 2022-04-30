import { css, styled } from '../../utils';
import { LoadingStyledAttrProps } from './types';
import { Colors } from '../../const';
import { LoadingBg } from './const';

const position = (full: boolean) => {
  if (full) {
    return css`
      min-height: 100vh;
      position: fixed;
    `;
  } else {
    return css`
      position: absolute;
    `;
  }
};

export const SpinnerStyled = styled('div')<LoadingStyledAttrProps>`
  &::after {
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    content: '';
    display: inline-block;
    z-index: 51;
    width: 28px;
    height: 28px;
    font-size: 28px;
    line-height: 28px;
    border: 2px solid ${Colors.white};
    border-top: 2px solid ${({ $color }) => Colors[$color]};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingStyled = styled('div')<LoadingStyledAttrProps>`
  z-index: 20;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${({ bg }) => LoadingBg[bg]};
  ${({ full }) => position(full)};

  > div {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  span {
    display: block;
    margin-top: 15px;
    font-size: ${({ $fontSize }) => `${$fontSize}px`};
    color: ${({ $color }) => Colors[$color]};
  }

  path {
    stroke: ${({ $color }) => Colors[$color]};
  }
`;
