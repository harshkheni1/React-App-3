import React, { FC, useContext } from 'react';
import { WithStyle } from '../../utils';
import { PopoverProps, PopoverStaticProps, PopoverElementProps } from './types';
import {
  PopoverStyled,
  PopoverWrapStyled,
  PopoverHeaderStyled,
  PopoverTitleStyled,
  PopoverBodyStyled,
  PopoverCloseStyled,
} from './popover.styled';
import { ClosePopoverContext } from './popover-context';
import { Icon } from '../icon';

export const Popover: FC<PopoverProps> & PopoverStaticProps & WithStyle = (props) => {
  const { isOpen, children, ...rest } = props;
  return (
    isOpen && (
      <ClosePopoverContext.Provider value={rest}>
        <PopoverStyled>{children}</PopoverStyled>
      </ClosePopoverContext.Provider>
    )
  );
};

export const PopoverWrap: FC<PopoverElementProps> & WithStyle = ({ children }) => {
  return <PopoverWrapStyled>{children}</PopoverWrapStyled>;
};

export const PopoverHeader: FC<PopoverElementProps> & WithStyle = ({ children }) => {
  const contextProps = useContext(ClosePopoverContext);
  return (
    <PopoverHeaderStyled>
      {children}
      <PopoverCloseStyled variant="flat" data-testid="modal-close-button" onClick={contextProps.onClose}>
        <Icon name="close" measure={16} />
      </PopoverCloseStyled>
    </PopoverHeaderStyled>
  );
};

export const PopoverTitle: FC<PopoverElementProps> & WithStyle = ({ children }) => {
  return <PopoverTitleStyled>{children}</PopoverTitleStyled>;
};

export const PopoverBody: FC<PopoverElementProps> & WithStyle = ({ children }) => {
  return <PopoverBodyStyled>{children}</PopoverBodyStyled>;
};

PopoverWrap.displayName = 'Popover.Wrap';
PopoverHeader.displayName = 'Popover.Header';
PopoverTitle.displayName = 'Popover.Title';
PopoverBody.displayName = 'Popover.Body';
Popover.Style = PopoverStyled;

Popover.Wrap = PopoverWrap;

Popover.Header = PopoverHeader;
Popover.Header.Style = PopoverHeaderStyled;

Popover.Title = PopoverTitle;
Popover.Title.Style = PopoverTitleStyled;

Popover.Body = PopoverBody;
Popover.Body.Style = PopoverBodyStyled;
