import React, { FC } from 'react';
import { styled, css, uppercase } from '../../utils';
import { Colors, spacingStyle, fontWeightHelperStyle, TagColors } from '../../const';
import { TagProps, TagPositionType } from './types';
import { TagSize, TagVariant, TagSizeType, TagVariantType } from './const';

const tagSizeStyle = (measure: TagSizeType) => css`
  font-size: ${TagSize[measure].fontSize}px;
  line-height: ${TagSize[measure].lineHeight}px;
  padding: ${TagSize[measure].paddingVertical}px ${TagSize[measure].paddingHorizontal}px;
`;

const tagColorStyles = (color: TagVariantType) => css`
  color: ${TagColors[TagVariant[color].color]};
  background-color: ${TagColors[TagVariant[color].bg]};
`;

const TagChild: FC<TagProps> = (props) => {
  const { className, children } = props;
  return <span {...{ className }}>{children}</span>;
};

const tagPosition = (position: TagPositionType[]) => css`
  position: absolute;
  display: block;
  top: ${position[0] ? `${position[0]}px` : 'auto'};
  right: ${position[1] ? `${position[1]}px` : 'auto'};
  bottom: ${position[2] ? `${position[2]}px` : 'auto'};
  left: ${position[3] ? `${position[3]}px` : 'auto'};
`;

export const TagStyled = styled(TagChild)<TagProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  display: inline-block;
  margin: 0;
  white-space: ${({ nowrap }) => (nowrap ? 'nowrap' : 'normal')};
  ${(props) => props.uppercase && uppercase()}
  ${({ measure }) => tagSizeStyle(measure)}
  ${({ color }) => tagColorStyles(color)}
  ${({ fontWeight }) => fontWeightHelperStyle(fontWeight)}
  ${({ position }) => position && position.length > 0 && tagPosition(position)}
  ${(props) => spacingStyle(props)}
`;
