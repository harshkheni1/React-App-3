import { styled } from '../../../utils';
import { Colors, GridBreakpointsMediaDown, GridBreakpointsMediaUp } from '../../../const';
import { HeadingStyled } from '../../heading/heading.styled';
import { BoxStyled } from '../../box';
import { ImgStyled } from '../../img';
import { Row } from '../../grid';
import { PageErrorProps } from '../types';
import React, { FC } from 'react';

export const RowStyled = styled(Row)`
  min-height: 585px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTkiIGhlaWdodD0iNTg1IiB2aWV3Qm94PSIwIDAgMzU5IDU4NSI+ICAgIDxwYXRoIGZpbGw9IiNGNUU5REYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTM1OSA1MjVoLTYwdjYwSDBWODRoODRWMGgyNzV2NTI1ek02MCAwdjYwSDBWMGg2MHoiLz48L3N2Zz4=);
  background-size: auto 100%;
  align-items: center;
  justify-content: center;

  ${GridBreakpointsMediaUp.md} {
    min-height: 472px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NTIiIGhlaWdodD0iNDcyIiB2aWV3Qm94PSIwIDAgNzUyIDQ3MiI+ICAgIDxwYXRoIGZpbGw9IiNGNUU5REYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTc1MiA0MDJoLTcwdjcwSDBWMTM4aDEzOFYwaDYxNHY0MDJ6TTcwIDB2NzBIMFYwaDcweiIvPjwvc3ZnPg==);
    background-size: 100% auto;
  }
  ${GridBreakpointsMediaUp.lg} {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjQ3MiIgdmlld0JveD0iMCAwIDEwMjQgNDcyIj4gICAgPHBhdGggZmlsbD0iI0Y1RTlERiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTAyNCA0MDJoLTcwdjcwSDB2LTY0aDI2NFYwaDc2MHY0MDJ6TTcwIDB2NzBIMFYwaDcweiIvPjwvc3ZnPg==);
    background-size: contain;
  }
`;

const PageErrorChild: FC<PageErrorProps> = ({ className, children }) => <div className={className}>{children}</div>;
export const PageErrorStyled = styled(PageErrorChild)`
  min-height: calc(100vh - 85px);
  box-sizing: border-box;
  background-color: ${Colors.secondaryLight};
  padding: 15px 0;
  display: flex;
  align-items: center;
  ${HeadingStyled} {
    margin: 0 0 20px;
    ${GridBreakpointsMediaDown.sm} {
      margin: 0 0 15px;
      text-align: center;
    }
  }
  ${BoxStyled} {
    margin: 0 0 40px;
    white-space: pre-line;

    ${GridBreakpointsMediaDown.sm} {
      margin: 0 0 25px;
      text-align: center;
    }
  }

  ${ImgStyled} {
    max-width: 100%;
    margin: 0 auto;
    display: block;
    ${GridBreakpointsMediaDown.sm} {
      max-width: 290px;
      margin: 0 auto 20px;
    }
  }
`;
