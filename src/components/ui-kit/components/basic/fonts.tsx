import { FontFaceItem, FontFaceTheme } from './types';
import { css } from '../../utils';
import { FontFamilyValue } from '../../const';
import {
  WorkLightPrimary,
  WorkLightSecondary,
  WorkRegularPrimary,
  WorkRegularSecondary,
  WorkSemiBoldPrimary,
  WorkSemiBoldSecondary,
  WorkBoldPrimary,
  WorkBoldSecondary,
  OpenBoldItalicPrimary,
  OpenBoldItalicSecondary,
} from './fonts-src';

const work: FontFaceTheme = {
  fontFamily: FontFamilyValue.primary,
  fontFaces: [
    {
      local: `local('Work Sans Light'), local('WorkSans-Light')`,
      primarySrc: `url(https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_c6DptfpA4cD3.woff2) format('woff2')`,
      secondarySrc: `url(${WorkLightSecondary}) format('woff')`,
      fontWeight: 300,
      fontStyle: 'normal',
    },
    {
      local: `local('Work Sans'), local('WorkSans-Regular')`,
      primarySrc: `url(https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDptfpA4Q.woff2) format('woff2')`,
      secondarySrc: `url(${WorkRegularSecondary}) format('woff')`,
      fontWeight: 400,
      fontStyle: 'normal',
    },
    {
      local: `local('Work Sans SemiBold'), local('WorkSans-Medium')`,
      primarySrc: `url(https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDptfpA4Q.woff2) format('woff2')`,
      secondarySrc: `url(${WorkSemiBoldSecondary}) format('woff')`,
      fontWeight: 600,
      fontStyle: 'normal',
    },
    {
      local: `local('Work Sans Bold'), local('WorkSans-Bold')`,
      primarySrc: `url(https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDptfpA4Q.woff2) format('woff2')`,
      secondarySrc: `url(${WorkBoldSecondary}) format('woff')`,
      fontWeight: 700,
      fontStyle: 'normal',
    },
  ],
};

const open: FontFaceTheme = {
  fontFamily: FontFamilyValue.secondary,
  fontFaces: [
    {
      local: `local('Open Sans Bold'), local('OpenSans-Italic.woff')`,
      primarySrc: `url(${OpenBoldItalicPrimary}) format('woff2')`,
      secondarySrc: `url(${OpenBoldItalicSecondary}) format('woff')`,
      fontWeight: 400,
      fontStyle: 'italic',
    },
  ],
};

const faces: FontFaceTheme[] = [work, open];

const formatFontFace = (fontFace: FontFaceItem, fontFamily: string) => `
    @font-face {
        font-family: '${fontFamily}';
        src: ${fontFace.local}, ${fontFace.primarySrc}, ${fontFace.secondarySrc};
        font-weight: ${fontFace.fontWeight};
        font-style: ${fontFace.fontStyle}
        font-display: swap;
    }`;

const formatFontFamily = (fontFamilyDetails: FontFaceTheme) => {
  return fontFamilyDetails.fontFaces.reduce(
    (templateLiteral: string, face: FontFaceItem) =>
      templateLiteral + formatFontFace(face, fontFamilyDetails.fontFamily),
    '',
  );
};

const fonts = css`
  ${() => {
    return faces.reduce(
      (templateLiteral: string, fontFamilyDetails: FontFaceTheme) =>
        templateLiteral + formatFontFamily(fontFamilyDetails),
      '',
    );
  }}
`;

export { fonts };
