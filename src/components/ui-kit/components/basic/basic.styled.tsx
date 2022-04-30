import { createGlobalStyle } from '../../utils';
import { fonts } from './fonts';
import { normalize } from 'styled-normalize';
import { Colors, FontFamilyValue } from '../../const';

export const CssBaseline = createGlobalStyle`
  ${normalize}
  ${fonts}
  html {
    height: 100%;
    width: 100%;
  }
  body {
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: ${FontFamilyValue.primary};
    font-weight: 400;
    line-height: 1.5;
    background: ${Colors.gray300};

    #root,
    .root {
      height: 100%;
      width: 100%;
    }
  }
  
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }
  
  b,
  strong {
    font-weight: 700;
  }
  .nowrap {white-space:nowrap;}
  .fSjGNW:checked ~ .sc-fznZeY {
    background: #e7f1ff !important;
}
.pr-0 {padding-right:0px !important;}
`;
CssBaseline.displayName = 'CssBaseline';
