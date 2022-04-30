import { ArrayToType, GridBreakpointsScale } from './types';
import { createMap } from 'styled-components-breakpoint';

export const map = createMap({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
});

export const GridBreakpointsArray = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type GridBreakpointsArrayType = ArrayToType<typeof GridBreakpointsArray>;

export const GridBreakpointsMax: GridBreakpointsScale = {
  xs: 319,
  sm: 575,
  md: 767,
  lg: 991,
  xl: 1199,
};

export const GridBreakpointsMediaDown: GridBreakpointsScale = {
  xs: `@media (max-width: ${GridBreakpointsMax.xs}px)`,
  sm: `@media (max-width: ${GridBreakpointsMax.sm}px)`,
  md: `@media (max-width: ${GridBreakpointsMax.md}px)`,
  lg: `@media (max-width: ${GridBreakpointsMax.lg}px)`,
  xl: `@media (max-width: ${GridBreakpointsMax.xl}px)`,
};

export const GridBreakpointsMediaUp: GridBreakpointsScale = {
  xs: `@media (min-width: ${+GridBreakpointsMax.xs + 1}px)`,
  sm: `@media (min-width: ${+GridBreakpointsMax.sm + 1}px)`,
  md: `@media (min-width: ${+GridBreakpointsMax.md + 1}px)`,
  lg: `@media (min-width: ${+GridBreakpointsMax.lg + 1}px)`,
  xl: `@media (min-width: ${+GridBreakpointsMax.xl + 1}px)`,
};

export const ContainerMaxWidth: GridBreakpointsScale = {
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1140,
};
