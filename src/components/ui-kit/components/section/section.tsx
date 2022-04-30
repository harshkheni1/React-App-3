import React, { FC, useContext, useState } from 'react';
import { WithStyle } from '../../utils';
import {
  SectionActionProps,
  SectionBodyProps,
  SectionHeaderProps,
  SectionProps,
  SectionStaticProps,
  SectionTitleProps,
} from './types';
import {
  SectionActionStyled,
  SectionBodyStyled,
  SectionHeaderStyled,
  SectionStyled,
  SectionTitleStyled,
} from './section.styled';
import SectionContext from './section-context';
import { Button } from '../button';
import { Icon } from '../icon';
import { Tooltip } from '../tooltip';

export const Section: FC<SectionProps> & SectionStaticProps & WithStyle = (props) => {
  const [expanded, toggleExpanded] = useState(props.expanded);

  return (
    <SectionStyled {...props}>
      <SectionContext.Provider
        value={{
          collapsable: props.collapsable,
          expanded: expanded,
          updateExpanded: () => {
            toggleExpanded(!expanded);
          },
        }}
      >
        {props.children}
      </SectionContext.Provider>
    </SectionStyled>
  );
};

export const SectionHeader: FC<SectionHeaderProps> & WithStyle = (props) => {
  const { updateExpanded, ...contextProps } = useContext(SectionContext);
  const click = () => {
    if (props.clickable) {
      updateExpanded();
    }
  };

  return (
    <SectionHeaderStyled onClick={() => click()} {...contextProps} {...props}>
      {props.children}
    </SectionHeaderStyled>
  );
};

SectionHeader.defaultProps = {
  clickable: false,
};

export const SectionTitle: FC<SectionTitleProps> & WithStyle = (props) => {
  return <SectionTitleStyled {...props}>{props.children}</SectionTitleStyled>;
};

export const SectionAction: FC<SectionActionProps> & WithStyle = ({ icon = 'angle-down', text, tooltip, ...props }) => {
  const { collapsable, expanded, updateExpanded } = useContext(SectionContext);

  return (
    <SectionActionStyled expanded={expanded}>
      {props.children}
      {collapsable && (
        <Button color="gray800" measure="md" type="button" uppercase variant="flat" onClick={updateExpanded}>
          {icon && <Icon measure={10} name={icon} mr={text && 10} />}
          {text && <span style={{ marginRight: '10px' }}>{expanded ? ` hide ${text}` : ` show ${text}`}</span>}
          {tooltip && <Tooltip isButton={true} direction="right" content={tooltip} />}
        </Button>
      )}
    </SectionActionStyled>
  );
};

export const SectionBody: FC<SectionBodyProps> & WithStyle = (props) => {
  const contextProps = useContext(SectionContext);

  return (
    <SectionBodyStyled {...contextProps} {...props}>
      {props.children}
    </SectionBodyStyled>
  );
};

Section.displayName = 'Section';
SectionHeader.displayName = 'Section.Header';
SectionTitle.displayName = 'Section.Title';
SectionTitle.displayName = 'Section.Action';
SectionBody.displayName = 'Section.Body';
Section.Style = SectionStyled;
Section.Header = SectionHeader;
Section.Header.Style = SectionHeaderStyled;
Section.Title = SectionTitle;
Section.Title.Style = SectionTitleStyled;
Section.Action = SectionAction;
Section.Action.Style = SectionActionStyled;
Section.Body = SectionBody;
Section.Body.Style = SectionBodyStyled;
