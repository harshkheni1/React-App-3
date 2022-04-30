import { HtmlProps } from '../../../utils';
import { ModalSizesType } from '../const';

export interface ModalDialogProps extends HtmlProps<HTMLDivElement> {
  measure?: ModalSizesType;
}
