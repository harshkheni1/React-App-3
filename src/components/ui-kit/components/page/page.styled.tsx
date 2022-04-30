import { styled } from '../../utils';
import { bgHelperStyle, spacingStyle } from '../../const';
import { PageProps } from './types';

export const PageStyled = styled('div')<PageProps>`
  position: relative;
  ${({ bg }) => (bg ? bgHelperStyle(bg) : '')}
  ${(props) => spacingStyle(props)}
`;
