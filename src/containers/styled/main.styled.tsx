import styled from 'styled-components';
import {
  Box,
  CombineHelper,
  css,
  PageStyled,
  Colors,
  GridBreakpointsMediaUp,
  GridBreakpointsMediaDown,
} from '@/ui-kit';

export const MainHeaderStyled = styled('header')<CombineHelper>`
  position: sticky;
  top: 0;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  background-color: ${Colors.white};
  z-index: 10;
  min-height: 70px;
  display: flex;
  align-items: center;
  width: 100%;
  > * {
    width: 100%;
  }
  span img {
    width: 260px !important;
    height: auto;
  }
`;

export const MainFooterStyled = styled(Box)<CombineHelper>`
  padding: 24px 0;
  z-index: 10;
  bottom: 0;
  width: 100%;
  margin-top: 20px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  background-color: ${Colors.white};
  position: relative;

  ${GridBreakpointsMediaUp.xs} {
    position: absolute;
  }
`;

const layoutStyle = (hideFooter: boolean, hideHeader: boolean) => {
  if (hideFooter && hideHeader) {
    return css`
      ${PageStyled} {
        min-height: 100vh;
      }
    `;
  }
  let styles = '';
  if (!hideFooter) {
    styles = `
      ${styles}
      ${PageStyled} {        
        ${GridBreakpointsMediaDown.xs} {
          padding-bottom: 30px;
        }    
           
        ${GridBreakpointsMediaUp.xs} {
          padding-bottom: 324px;
          min-height: 100vh;
        }
        
        ${GridBreakpointsMediaUp.sm} {
          padding-bottom: 242px;
        }

        ${GridBreakpointsMediaUp.md} {
          padding-bottom: 193px;                  
        }

        ${GridBreakpointsMediaUp.lg} {
          padding-bottom: 182px;
        }

        ${GridBreakpointsMediaUp.xl} {
          padding-bottom: 190px;
        }
      }     
    `;
  }
  if (!hideHeader) {
    styles = `
      ${styles}
      ${PageStyled} {
        padding-top: 30px;
        
        ${GridBreakpointsMediaUp.xs} {
          min-height: calc(100vh - 70px);
        }
      }
      `;
  }

  if (!hideFooter && !hideHeader) {
    styles = `
      ${styles}
      ${PageStyled} {
        width: 100%;
        > * {
          width: 100%;
        }
      }`;
  }

  return styles;
};

export const MainLayoutStyled = styled('div')<{ hideFooter: boolean; hideHeader: boolean }>`
  min-height: 100vh;
  position: relative;
  ${({ hideFooter, hideHeader }) => layoutStyle(hideFooter, hideHeader)};
`;
