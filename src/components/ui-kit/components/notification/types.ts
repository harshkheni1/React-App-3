import { NotificationTypesType } from './const';
import { HtmlProps } from '../../utils/types';
import { ArrayToType } from '../../const';

export const NotificationListMeasureArray = ['md', 'lg'];
export type NotificationListMeasureType = ArrayToType<typeof NotificationListMeasureArray>;

export interface NotificationProps extends HtmlProps<HTMLDivElement> {
  id?: string;
  type?: NotificationTypesType;
  title?: string;
  buttonTitle?: string;
  onClickButton?: () => void;
  onRemove?: () => void;
}

export interface NotificationStyledAttrProps extends NotificationProps {
  $type?: NotificationTypesType;
}

interface TimeoutProps {
  enter: number;
  exit: number;
}

export interface NotificationListProps extends HtmlProps<HTMLDivElement> {
  items: NotificationProps[];
  measure?: NotificationListMeasureType;
  timeout?: number | TimeoutProps;
}
