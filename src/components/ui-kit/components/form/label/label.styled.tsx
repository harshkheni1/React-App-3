import { Form, TextSize, spacingStyle, TextSizeType, GridBreakpointsArrayType, map } from '../../../const';
import { styled, asterisk } from '../../../utils';
import { LabelProps } from './types';

const fontSize = (measure: TextSizeType | { [key in GridBreakpointsArrayType]?: TextSizeType }) =>
  map(measure, (s) => `font-size: ${TextSize[s]};`);

export const FormLabelStyled = styled('label')<LabelProps>`
  color: ${Form.controlLabelColor};
  display: block;
  ${({ measure }) => measure && fontSize(measure)};
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 8px;
  ${({ required }) => required && asterisk()}
  ${(props) => spacingStyle(props)}
`;
