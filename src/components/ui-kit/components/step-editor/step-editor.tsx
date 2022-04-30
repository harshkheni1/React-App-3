import React, { FC, useState } from 'react';
import { WithStyle } from '../../utils/types';
import { Text } from '../text';
import { StepEditorItemProps, StepEditorProps, StepEditorStaticProps } from './types';
import {
  StepEditorItemStyled,
  StepEditorStyled,
  StepEditorContainerStyled,
  StepEditorItemContainerStyled,
  StepEditorTitleStyled,
  StepEditorItemIconStyled,
} from './step-editor.styled';
import { Icon } from '../icon';

export const StepEditor: FC<StepEditorProps> & StepEditorStaticProps & WithStyle = ({ title, ...props }) => {
  const [collapseState, setCollapseState] = useState(false);
  return (
    <StepEditorStyled {...props} active={collapseState}>
      <StepEditorTitleStyled>
        <Text fontWeight="bold" uppercase measure="xxs" mt={0} mb={{ xs: 0, lg: 8 }}>
          {title}
        </Text>
        <div onClick={() => setCollapseState(!collapseState)}>
          <Icon name="angle" measure={10} display={{ xs: 'block', lg: 'none' }} />
        </div>
      </StepEditorTitleStyled>
      <StepEditorContainerStyled>{props.children}</StepEditorContainerStyled>
    </StepEditorStyled>
  );
};

export const StepEditorItem: FC<StepEditorItemProps> & WithStyle = ({
  title,
  disabled,
  counter,
  current,
  onClick,
  children,
}) => {
  return (
    <StepEditorItemStyled {...{ onClick, disabled }}>
      <Text fontWeight="bold" measure="sm" m={[0]} display={{ xs: 'none', lg: 'block' }}>
        {title}
        {disabled ? (
          <Text as="span" fontWeight="normal">
            : {counter} step{current ? '(current)' : ''}
          </Text>
        ) : (
          ''
        )}
      </Text>
      <StepEditorItemContainerStyled>{children}</StepEditorItemContainerStyled>
      {!disabled && (
        <StepEditorItemIconStyled>
          <Icon name="edit" measure={18} />
        </StepEditorItemIconStyled>
      )}
    </StepEditorItemStyled>
  );
};

StepEditor.displayName = 'StepEditor';
StepEditor.Style = StepEditorStyled;
StepEditor.Item = StepEditorItem;
StepEditor.Item.Style = StepEditorItemStyled;
