import React, { FC, useState } from 'react';
import { AccordionProps, AccordionItemProps } from './types';
import { WithStyle } from '../../utils';
import { AccordionStyled, AccordionAStyled, AccordionContentPStyled, AccordionContentStyled } from './accordion.styled';
import { Icon } from '../icon';
import { Row } from '../grid';

export const Accordion: FC<AccordionProps> & WithStyle = ({ children }) => {
  return <AccordionStyled>{children}</AccordionStyled>;
};

export const AccordionItem: FC<AccordionItemProps> = ({ children, title }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <>
      <AccordionAStyled
        className={isActive ? 'active' : ''}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        {title}
      </AccordionAStyled>
      <AccordionContentStyled className={isActive ? 'active' : ''}>
        <AccordionContentPStyled>{children}</AccordionContentPStyled>
      </AccordionContentStyled>
    </>
  );
};

Accordion.displayName = 'Accordion';
Accordion.Style = AccordionStyled;
