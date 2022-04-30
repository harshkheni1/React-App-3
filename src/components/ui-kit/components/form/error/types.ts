import { SpacingProps } from '../../../const';
import { HtmlProps } from '../../../utils/types';

export interface ErrorProps extends HtmlProps<HTMLDivElement>, SpacingProps {
  name: string;
}
