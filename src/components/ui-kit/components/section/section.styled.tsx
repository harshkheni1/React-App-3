import React from 'react';
import { styled } from '../../utils';
import { SectionProps, SectionHeaderProps, SectionTitleProps, SectionBodyProps } from './types';
import { TextSize, Colors, spacingStyle } from '../../const';
import { ButtonStyled } from '../button';
import { IconStyled } from '../icon';

export const SectionStyled = styled('section')<SectionProps>`
  display: block;
  ${(props) => spacingStyle(props)}
`;

export const SectionHeaderStyled = styled(({ children, className, onClick }) => (
  <header className={className} onClick={onClick}>
    {children}
  </header>
))<SectionHeaderProps>`
  ${({ collapsable, expanded }) => collapsable & expanded};
  ${({ clickable }) => clickable && 'cursor: pointer;'}
`;

export const SectionTitleStyled = styled(({ children, className }) => <span className={className}>{children}</span>)<
  SectionTitleProps
>`
  font-size: ${TextSize.xxs};
  line-height: 16px;
  text-transform: uppercase;
  color: ${Colors.gray800};
  padding: 12px 15px;
`;

export const SectionActionStyled = styled('div')<{ expanded: boolean }>`
  display: flex;
  justify-content: center;
  height: 100%;
  background: ${Colors.gray400};

  ${ButtonStyled} {
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-width: 0;
    background: ${Colors.transparent};
    padding: 0;
    border-radius: 0;
    letter-spacing: 2px;
    font-size: 12px;
    font-weight: 600;
  }

  ${IconStyled} {
    ${({ expanded }) => expanded && 'transform: rotate(180deg);'}
  }
`;

export const SectionBodyStyled = styled(({ children, className }) => <div className={className}>{children}</div>)<
  SectionBodyProps
>`
  padding: 15px 0 5px;
  ${({ collapsable, expanded }) => collapsable && (expanded ? 'display: block;' : 'display: none;')}
  ${(props) => spacingStyle(props)}
`;
