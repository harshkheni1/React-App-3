import { styled } from '../../utils';
import { Colors, GridBreakpointsMediaUp } from '../../const';

export const PreloadImageStyled = styled('div')<{ withoutText?: boolean }>`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  > div {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: ${Colors.secondary};
    animation: spiral 6s reverse linear infinite;
  }

  &::before {
    display: block;
    color: ${Colors.primary};
    fill: ${Colors.primary};
    font-size: 44px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  ${GridBreakpointsMediaUp.md} {
    ${({ withoutText }) =>
      !withoutText &&
      `
      &::before {
        top: calc(50% - 15px);
      }

      &::after {
        display: block;
        color: ${Colors.primary};
        content: 'Please wait, image is loading';
        font-size: 16px;
        width: 100%;
        padding: 0 15px;
        text-align: center;
        font-weight: 300;
        position: absolute;
        top: calc(50% + 30px);
        left: 50%;
        transform: translate(-50%, -50%);
      }
  `};
  }

  img,
  + img {
    z-index: 2;
  }

  @keyframes spiral {
    0% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        0% 25%,
        75% 25%,
        75% 75%,
        25% 75%,
        25% 50%,
        50% 50%,
        25% 50%,
        25% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
    7.25% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        0% 25%,
        75% 25%,
        75% 75%,
        50% 75%,
        50% 50%,
        50% 50%,
        25% 50%,
        25% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
    14.5% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        0% 25%,
        75% 25%,
        75% 50%,
        50% 50%,
        50% 50%,
        50% 50%,
        25% 50%,
        25% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
    21.75% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        0% 25%,
        25% 25%,
        25% 50%,
        25% 50%,
        25% 50%,
        25% 50%,
        25% 50%,
        25% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
    29% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        0% 75%,
        25% 75%,
        25% 75%,
        25% 75%,
        25% 75%,
        25% 75%,
        25% 75%,
        25% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
    36.25% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        75% 100%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
    42.5% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        0% 25%
      );
    }
    50% {
      clip-path: polygon(
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%,
        0% 25%,
        0% 25%,
        0% 25%,
        0% 25%,
        0% 25%,
        0% 25%,
        0% 25%
      );
    }
    57.25% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        75% 25%,
        0% 25%
      );
    }
    64.5% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        75% 100%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
    71.75% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        0% 75%,
        25% 75%,
        25% 75%,
        25% 75%,
        25% 75%,
        25% 75%,
        25% 75%,
        25% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
    79% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        0% 25%,
        25% 25%,
        25% 50%,
        25% 50%,
        25% 50%,
        25% 50%,
        25% 50%,
        25% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
    86.25% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        0% 25%,
        75% 25%,
        75% 50%,
        50% 50%,
        50% 50%,
        50% 50%,
        25% 50%,
        25% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
    92.5% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        0% 25%,
        75% 25%,
        75% 75%,
        50% 75%,
        50% 50%,
        50% 50%,
        25% 50%,
        25% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
    100% {
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        0% 25%,
        75% 25%,
        75% 75%,
        25% 75%,
        25% 50%,
        50% 50%,
        25% 50%,
        25% 75%,
        75% 75%,
        75% 25%,
        0% 25%
      );
    }
  }
`;
