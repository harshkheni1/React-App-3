import { ArrayToType, css } from '../../utils';
import { GridBreakpointsArrayType, map } from '../grid';

export const PositionArray = ['top', 'right', 'bottom', 'left'] as const;
export type PositionType = ArrayToType<typeof PositionArray>;

export const padding = (arr: Array<number> | { [key in GridBreakpointsArrayType]?: Array<number> }) => {
  if (Array.isArray(arr)) {
    return css`
      padding: ${arr.join('px ')}px !important;
    `;
  }

  const value: { [key in GridBreakpointsArrayType]?: string } = {};

  Object.keys(arr).forEach((key: GridBreakpointsArrayType) => {
    value[key] = `${arr[key].join('px ')}px !important;`;
  });

  return map(value, (v) => `padding: ${v};`);
};

export const paddingValue = (value: number | { [key in GridBreakpointsArrayType]?: number }, position: PositionType) =>
  map(value, (v) => `padding-${position}: ${v}px !important;`);

export const margin = (arr: Array<number | 'auto'> | { [key in GridBreakpointsArrayType]?: Array<number> }) => {
  if (Array.isArray(arr)) {
    const marginArray = arr.map((i) => (i === 'auto' ? i : `${i}px`));
    return css`
      margin: ${marginArray.join(' ')} !important;
    `;
  }

  const value: { [key in GridBreakpointsArrayType]?: string } = {};

  Object.keys(arr).forEach((key: GridBreakpointsArrayType) => {
    value[key] = `${arr[key].join('px ')}px !important;`;
  });

  return map(value, (v) => `margin: ${v};`);
};

export const marginValue = (
  value: number | { [key in GridBreakpointsArrayType]?: number } | 'auto',
  position: PositionType,
) => {
  return map(value, (v) => `margin-${position}: ${v === 'auto' ? v : `${v}px`} !important;`);
};

export interface SpacingProps {
  p?: Array<number> | { [key in GridBreakpointsArrayType]?: Array<number> };
  pt?: number | { [key in GridBreakpointsArrayType]?: number };
  pr?: number | { [key in GridBreakpointsArrayType]?: number };
  pb?: number | { [key in GridBreakpointsArrayType]?: number };
  pl?: number | { [key in GridBreakpointsArrayType]?: number };
  m?: Array<number | 'auto'> | { [key in GridBreakpointsArrayType]?: Array<number> };
  mt?: number | { [key in GridBreakpointsArrayType]?: number } | 'auto';
  mr?: number | { [key in GridBreakpointsArrayType]?: number } | 'auto';
  mb?: number | { [key in GridBreakpointsArrayType]?: number } | 'auto';
  ml?: number | { [key in GridBreakpointsArrayType]?: number } | 'auto';
}

export const spacingStyle = ({ m, mt, mr, mb, ml, p, pt, pr, pb, pl }: SpacingProps) => css`
  ${(m || m === 0) && margin(m)}
  ${(mt || mt === 0) && marginValue(mt, 'top')}
  ${(mr || mr === 0) && marginValue(mr, 'right')}
  ${(mb || mb === 0) && marginValue(mb, 'bottom')}
  ${(ml || ml === 0) && marginValue(ml, 'left')}
  ${(p || p === 0) && padding(p)}
  ${(pt || pt === 0) && paddingValue(pt, 'top')}
  ${(pr || pr === 0) && paddingValue(pr, 'right')}
  ${(pb || pb === 0) && paddingValue(pb, 'bottom')}
  ${(pl || pl === 0) && paddingValue(pl, 'left')}
`;
