import { CombineHelper } from '../../const/helpers';

export interface BoxProps extends CombineHelper {
  as?: 'div' | 'p' | 'span' | 'a' | 'b' | 'footer' | 'header';
}
