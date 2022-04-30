import { TextStyledAttrProps } from '../text/types';

export interface ShowMoreProps extends TextStyledAttrProps {
  truncateSize?: number;
  moreTitle?: string;
  lessTitle?: string;
}
