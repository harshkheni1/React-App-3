import { styled } from '../../utils';
import { Colors, clearfixHelperStyle, spacingStyle } from '../../const';
import { PanelProps, PanelElementProps } from './types';
import { FormRadioLabelStyled } from '../form/radio/label';
import { ListItemStyled } from '../list';

export const PanelStyled = styled('div')<PanelProps>`
  border: 1px solid ${Colors.secondary};
  display: block;
  cursor: ${({ as }) => (as == 'label' ? 'pointer' : 'default')};
  ${(rest) => spacingStyle(rest)}
`;

export const PanelHeaderStyled = styled('header')<PanelProps>`
  padding: 8px 15px;
  background-color: ${Colors.secondary};
  ${clearfixHelperStyle}

  ${FormRadioLabelStyled} {
    float: right;
    margin: 12px -7px 0 0;
    &:before {
      background-color: transparent;
    }
    &:after {
      background-color: ${Colors.gray800};
    }
  }
`;

export const PanelTitleStyled = styled('p')<PanelElementProps>`
  font-weight: 700;
  line-height: 24px;
  float: left;
  margin: 0;
`;

export const PanelBodyStyled = styled('div')<PanelElementProps>`
  padding: 20px 15px 5px;
`;

export const PanelFooterStyled = styled('footer')<PanelElementProps>`
  ${ListItemStyled} {
    font-weight: 300;
    background-color: ${Colors.secondaryLight};
    margin: 0 0 1px;
    &:nth-last-child(1) {
      margin: 0;
    }
  }
`;
