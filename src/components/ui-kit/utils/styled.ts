import * as styledComponents from 'styled-components';
import { IconProps } from '../components/icon/types';

// tslint:disable-next-line: no-duplicate-imports
import { ThemedStyledComponentsModule } from 'styled-components';
const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme,
} = styledComponents as ThemedStyledComponentsModule<IconProps>;

export { styled, css, createGlobalStyle, keyframes, ThemeProvider, withTheme };
