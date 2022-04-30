import { FieldGroupNav } from 'react-uforms';
import { css, styled } from '../../../utils';
import { Colors, GridBreakpointsMediaDown, GridBreakpointsMediaUp, TextSize } from '../../../const';
import { FormGroupNavStyledAttrProps } from './types';

export const FormGroupNavStyled = styled(FieldGroupNav)<FormGroupNavStyledAttrProps>`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: step;
  ${GridBreakpointsMediaDown.md} {
    display: block;
  }

  li {
    ${GridBreakpointsMediaDown.md} {
      height: 0;
      overflow: hidden;
      counter-increment: step;

      &.active {
        height: unset;
        overflow: unset;
        font-size: ${TextSize.xl};
        font-weight: bold;
      }
      &:before {
        display: block;
        color: ${Colors.primary};
        font-size: ${TextSize.sm};
        font-weight: bold;
        content: ${({ $stepsQty }) => `'Step ' counter(step)'${$stepsQty ? ` of ${$stepsQty}` : ''}'`};
        margin-bottom: 5px;
      }
    }

    ${GridBreakpointsMediaUp.md} {
      display: block;
      flex: 1;
      text-align: center;
      color: ${Colors.gray800};
      font-size: ${TextSize.sm};
      line-height: 20px;
      padding: 32px 0 0;
      position: relative;

      &:before {
        width: 24px;
        height: 24px;
        line-height: 24px;
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        background-color: ${Colors.white};
        color: ${Colors.primary};
        font-size: ${TextSize.xs};
        margin: 0 0 0 -12px;
        border-radius: 50%;
        z-index: 1;
        text-align: center;
        counter-increment: step;
        content: counter(step);
        overflow: hidden;
      }

      &:after {
        position: absolute;
        content: '';
        display: block;
        top: 12px;
        left: -50%;
        right: 0;
        z-index: 0;
        border-top: 1px solid ${Colors.white};
      }
      &:nth-child(1) {
        &:after {
          left: 50%;
        }
      }
      &:nth-last-child(1) {
        &:after {
          right: 50%;
        }
      }

      ${({ $ignoreCompleted }) =>
        !$ignoreCompleted &&
        css`
          &.is-completed {
            &:before {
              color: ${Colors.gray500};
              text-indent: -999px;
              background-color: ${Colors.primary};
              background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTMgOSI+ICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTcuNDkzNjUxMSw4LjQ2OTUzOTI3IEMxNy43ODY2MTY1LDguMTg5ODkwNSAxOC4yNTA4MTIsOC4yMDA2ODU3NSAxOC41MzA0NjA3LDguNDkzNjUxMTIgQzE4Ljc4NDY4NjksOC43NTk5ODMyOCAxOC43OTg4NzY3LDkuMTY3ODI3OTEgMTguNTc5MjQ2NCw5LjQ0OTg4NDY1IEwxOC41MDYzNDg5LDkuNTMwNDYwNzMgTDExLjE3MzAxNTUsMTYuNTMwNDYwNyBDMTAuOTE3OTc1NywxNi43NzM5MDc5IDEwLjUzMTI1ODIsMTYuNzk4MjUyNiAxMC4yNDk4ODI5LDE2LjYwMzQ5NDkgTDEwLjE2MDMxNzgsMTYuNTMwNDYwNyBMNi40OTM2NTExMiwxMy4wMzA0NjA3IEM2LjIwMDY4NTc1LDEyLjc1MDgxMiA2LjE4OTg5MDUsMTIuMjg2NjE2NSA2LjQ2OTUzOTI3LDExLjk5MzY1MTEgQzYuNzIzNzY1NDIsMTEuNzI3MzE5IDcuMTMwNTA5NTEsMTEuNjk0MTg1MyA3LjQyMjQ3MTE2LDExLjkwMDQ2NjMgTDcuNTA2MzQ4ODgsMTEuOTY5NTM5MyBMMTAuNjY2LDE0Ljk4NiBMMTcuNDkzNjUxMSw4LjQ2OTUzOTI3IFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02IC04KSIvPjwvc3ZnPg==);
              background-position: 50% 50%;
              background-repeat: no-repeat;
            }
            &:after {
              border-top-color: ${Colors.primary};
            }
          }
        `}

      &.is-active,
      &.active {
        font-weight: bold;
        &:before {
          font-weight: normal;
          color: ${Colors.white};
          background: ${Colors.primary};
          text-indent: 0;
        }
      }
    }
  }
`;
