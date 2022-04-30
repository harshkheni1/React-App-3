import { styled } from '../../utils';
import { spacingStyle, bgHelperStyle, alignHelperStyle } from '../../const';
import { MediaProps, MediaBodyProps } from './types';
import { ImgStyled } from '../img';

export const MediaStyled = styled('a')<MediaProps>`
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  cursor: ${({ as }) => (as === 'a' ? 'pointer' : 'default')};
  ${({ bg }) => bgHelperStyle(bg)}
  ${(props) => spacingStyle(props)}
`;
export const MediaBodyStyled = styled('div')<MediaBodyProps>`
  flex: 1;
  align-self: ${({ vertical }) => vertical};
  ${(props) => spacingStyle(props)}
`;
export const MediaAsideStyled = styled('div')<MediaBodyProps>`
  align-self: ${({ vertical }) => vertical};
  ${({ width }) => width && `width: ${width}px;`}
  ${(props) => spacingStyle(props)}
  ${({ align }) => align && alignHelperStyle(align)}

  ${ImgStyled} {
    display: block;
  }
`;
