import { HtmlProps } from '../../utils';
import { ColorType, GridBreakpointsArrayType } from '../../const';
import { ImgFitType } from './const';

export interface ImgElementProps {
  height?: any;
  placeholder?: any;
  onClick?: () => void;
}

export interface ImgWrapProps
  extends Omit<HtmlProps<HTMLDivElement>, 'height' | 'placeholder' | 'onClick'>,
    ImgElementProps {
  src?: any;
}

export interface ImgProps
  extends Omit<HtmlProps<HTMLImageElement>, 'crossOrigin' | 'height' | 'width' | 'placeholder' | 'onClick'>,
    ImgElementProps {
  fit?: ImgFitType;
  fullWidth?: boolean;
  bg?: ColorType;
  children?: any;
  heightContext?: any;
  width?: number | { [key in GridBreakpointsArrayType]?: number };
  height?: number | { [key in GridBreakpointsArrayType]?: number };
}
