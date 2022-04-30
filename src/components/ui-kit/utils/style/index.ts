import { css } from '../styled';
import { Colors } from '@/ui-kit';

export const fullWidth = (margin = '0px') => css`
  width: calc(100% - ${margin});
`;

export const fullHeight = (margin = '0px') => css`
  height: calc(100% - ${margin});
`;

export const centerAligned = (display: 'flex' | 'inline-flex' = 'inline-flex') => css`
  display: ${display};
  justify-content: center;
  align-items: center;
`;

export const uppercase = () => css`
  text-transform: uppercase;
`;

export const mobsmall = () => css`
  font-size: 14px !important;
`;

export const capitalize = () => css`
  text-transform: capitalize;
`;

export const lineThrough = () => css`
  text-decoration: line-through;
`;

export const underline = () => css`
  text-decoration: underline !important;
`;

export const asterisk = () => css`
  ::after {
    content: ' *';
    color: ${Colors.primary};
  }
`;

export const iconColor = (value: string) => css`
  * {
    fill: ${value};
  }
`;

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

export const hexToBrightness = (color: string) => {
  const c = color?.substring(1); // strip #
  const rgb = parseInt(c, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue

  return 0.2126 * r + 0.7152 * g + 0.0722 * b; // 0 - 255
};
