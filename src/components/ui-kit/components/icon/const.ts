import { IconProps } from './types';
import { ArrayToType } from '../../const';
import Angle from '../../assets/icons/angle.svg';
import AngleDown from '../../assets/icons/angle-down.svg';
import AngleLeft from '../../assets/icons/angle-left.svg';
import AngleRight from '../../assets/icons/angle-right.svg';
import AngleLeftThin from '../../assets/icons/angle-thin-left.svg';
import AngleRightThin from '../../assets/icons/angle-thin-right.svg';
import AngleTop from '../../assets/icons/angle-top.svg';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import ArrowUp from '../../assets/icons/arrow-up.svg';
import ArrowTop from '../../assets/icons/arrow-top.svg';
import Calendar from '../../assets/icons/calendar.svg';
import Chat from '../../assets/icons/chat.svg';
import ChatOne from '../../assets/icons/chat-one.svg';
import Check from '../../assets/icons/check.svg';
import CheckIn from '../../assets/icons/check-in.svg';
import CheckThin from '../../assets/icons/check-thin.svg';
import Close from '../../assets/icons/close.svg';
import Delete from '../../assets/icons/delete.svg';
import DeletePage from '../../assets/icons/delete-page.svg';
import Download from '../../assets/icons/download.svg';
import Edit from '../../assets/icons/edit.svg';
import Email from '../../assets/icons/email.svg';
import Eye from '../../assets/icons/eye.svg';
import Filter from '../../assets/icons/filter.svg';
import ForeignLink from '../../assets/icons/foreign-link.svg';
import GbsLogo from '../../assets/icons/gbs-logo.svg';
import Image from '../../assets/icons/image.svg';
import Info from '../../assets/icons/info.svg';
import Link from '../../assets/icons/link.svg';
import MapMarker from '../../assets/icons/map-marker.svg';
import MinusThin from '../../assets/icons/minus-thin.svg';
import NoImage from '../../assets/icons/no-image.svg';
import Post from '../../assets/icons/post.svg';
import PlusThin from '../../assets/icons/plus-thin.svg';
import Phone from '../../assets/icons/phone.svg';
import Refresh from '../../assets/icons/refresh.svg';
import Resize from '../../assets/icons/resize.svg';
import Scroll from '../../assets/icons/scroll.svg';
import Search from '../../assets/icons/search.svg';
import SortAsc from '../../assets/icons/sort-asc.svg';
import SortDesc from '../../assets/icons/sort-desc.svg';
import TriangleLeft from '../../assets/icons/triangle-left.svg';
import TriangleRight from '../../assets/icons/triangle-right.svg';
import User from '../../assets/icons/user.svg';
import Warning from '../../assets/icons/warning.svg';

export const IconComponents = [
  { id: 'angle-down', icon: AngleDown },
  { id: 'angle-left', icon: AngleLeft },
  { id: 'angle-right', icon: AngleRight },
  { id: 'angle-thin-left', icon: AngleLeftThin },
  { id: 'angle-thin-right', icon: AngleRightThin },
  { id: 'angle', icon: Angle },
  { id: 'angle-top', icon: AngleTop },
  { id: 'arrow-left', icon: ArrowLeft },
  { id: 'arrow-right', icon: ArrowRight },
  { id: 'arrow-top', icon: ArrowTop },
  { id: 'arrow-up', icon: ArrowUp },
  { id: 'arrow-down', icon: ArrowDown },
  { id: 'calendar', icon: Calendar },
  { id: 'chat', icon: Chat },
  { id: 'chat-one', icon: ChatOne },
  { id: 'check-in', icon: CheckIn },
  { id: 'check-thin', icon: CheckThin },
  { id: 'check', icon: Check },
  { id: 'close', icon: Close },
  { id: 'delete', icon: Delete },
  { id: 'delete-page', icon: DeletePage },
  { id: 'download', icon: Download },
  { id: 'edit', icon: Edit },
  { id: 'email', icon: Email },
  { id: 'eye', icon: Eye },
  { id: 'filter', icon: Filter },
  { id: 'foreign-link', icon: ForeignLink },
  { id: 'gbs-logo', icon: GbsLogo },
  { id: 'image', icon: Image },
  { id: 'info', icon: Info },
  { id: 'link', icon: Link },
  { id: 'map-marker', icon: MapMarker },
  { id: 'no-image', icon: NoImage },
  { id: 'phone', icon: Phone },
  { id: 'plus-thin', icon: PlusThin },
  { id: 'post', icon: Post },
  { id: 'refresh', icon: Refresh },
  { id: 'resize', icon: Resize },
  { id: 'scroll', icon: Scroll },
  { id: 'search', icon: Search },
  { id: 'sort-asc', icon: SortAsc },
  { id: 'sort-desc', icon: SortDesc },
  { id: 'user', icon: User },
  { id: 'warning', icon: Warning },
  { id: 'triangle-left', icon: TriangleLeft },
  { id: 'triangle-right', icon: TriangleRight },
  { id: 'minus-thin', icon: MinusThin },
];

export const IconArray = [
  'angle',
  'angle-down',
  'angle-left',
  'angle-right',
  'angle-thin-left',
  'angle-thin-right',
  'angle-top',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-top',
  'arrow-up',
  'calendar',
  'chat',
  'chat-one',
  'check',
  'check-in',
  'check-thin',
  'close',
  'delete',
  'delete-page',
  'download',
  'edit',
  'email',
  'eye',
  'filter',
  'foreign-link',
  'gbs-logo',
  'image',
  'info',
  'link',
  'map-marker',
  'minus-thin',
  'no-image',
  'phone',
  'plus-thin',
  'post',
  'refresh',
  'resize',
  'scroll',
  'search',
  'sort-asc',
  'sort-desc',
  'triangle-left',
  'triangle-right',
  'user',
  'warning',
] as const;
export type IconArrayType = ArrayToType<typeof IconArray>;

export const Icons: IconProps = {
  measure: 24,
  color: 'gray800',
  name: IconArray[0],
};
