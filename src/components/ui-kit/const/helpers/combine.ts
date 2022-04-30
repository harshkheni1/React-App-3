import { css, HtmlProps } from '../../utils';
import { FullWidthHelper, fullWidthHelperStyle } from './full-width';
import { DisplayHelperStyledAttrProps, displayHelperStyle } from './display';
import { AlignHelper, alignHelperStyle } from './align';
import { FloatHelper, floatHelperStyle } from './float';
import { BgHelper, bgHelperStyle } from './bg';
import { AlignItemsHelper, alignItemsHelperStyle } from './align-items';
import { JustifyContentHelper, justifyContentHelperStyle } from './justify-content';
import { ColorHelperStyledAttrProps, colorHelperStyle } from './color';
import { FontFamilyHelper, fontFamilyHelperStyle } from './font-family';
import { FontWeightHelper, fontWeightHelperStyle } from './font-weight';
import { ClearfixHelper, clearfixHelperStyle } from './clearfix';
import { SpacingProps, spacingStyle } from './spacing';
import { BorderHelper, borderHelperStyle } from './border';
import { WordBreakHelper, wordBreakHelperStyle } from './word-break';
import { TextDecorationHelper, textDecorationHelperStyle } from './text-decoration';

export interface CombineHelper
  extends HtmlProps<HTMLDivElement>,
    FullWidthHelper,
    DisplayHelperStyledAttrProps,
    AlignHelper,
    FloatHelper,
    BgHelper,
    ColorHelperStyledAttrProps,
    FontFamilyHelper,
    FontWeightHelper,
    ClearfixHelper,
    BorderHelper,
    AlignItemsHelper,
    JustifyContentHelper,
    WordBreakHelper,
    TextDecorationHelper,
    SpacingProps {}

export const combineStyle = (props: CombineHelper) => {
  const {
    fullWidth,
    $display,
    align,
    float,
    bg,
    $color,
    fontFamily,
    fontWeight,
    clearfix,
    border,
    alignItems,
    justifyContent,
    wordBreak,
    textDecoration,
    m,
    mt,
    mr,
    mb,
    ml,
    p,
    pt,
    pr,
    pb,
    pl,
  } = props;
  return css`
    ${fullWidth && fullWidthHelperStyle(fullWidth)}
    ${$display && displayHelperStyle($display)}
    ${align && alignHelperStyle(align)}
    ${float && floatHelperStyle(float)}
    ${bg && bgHelperStyle(bg)}
    ${alignItems && alignItemsHelperStyle(alignItems)}
    ${justifyContent && justifyContentHelperStyle(justifyContent)}
    ${$color && colorHelperStyle($color)}
    ${fontFamily && fontFamilyHelperStyle(fontFamily)}
    ${fontWeight && fontWeightHelperStyle(fontWeight)}
    ${clearfix && clearfixHelperStyle}
    ${border && borderHelperStyle(border)}
    ${wordBreak && wordBreakHelperStyle(wordBreak)}
    ${textDecoration && textDecorationHelperStyle(textDecoration)}
    ${spacingStyle({ m, mt, mr, mb, ml, p, pt, pr, pb, pl })}
  `;
};
