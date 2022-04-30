import { CombineHelper, combineStyle } from '../../const';
import { styled } from '../../utils';

export const BoxStyled = styled('div')<CombineHelper>`
  ${(props) => combineStyle(props)}
`;
