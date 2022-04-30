export type TooltipPositionType = number | 'auto';
export interface TooltipProps {
  content: { [k: string]: unknown } | string | unknown;
  position?: TooltipPositionType[];
  direction?: string;
  isButton?: boolean;
  useHover?: boolean;
}
