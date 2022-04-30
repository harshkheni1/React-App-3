import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { OptionPlanProps } from './types';
import { OptionPlanWrapStyled, OptionPlanInputStyled, OptionPlanHeaderStyled } from './option-block.styled';
import { SpacingProps } from '../../../const';
import { CheckboxGroupItem, RadioGroupItem } from 'react-uforms';
import { Box, Col, Img, Row } from '@/ui-kit';

export const OptionPlan: FC<OptionPlanProps & SpacingProps> & WithStyle = ({
  m,
  mt,
  mr,
  mb,
  ml,
  p,
  pt,
  pr,
  pb,
  pl,
  ...props
}) => {
  const { radio, children, name, id, value, label, disabled, onChange, onClick, logo, simpleElement } = props;
  return (
    <OptionPlanWrapStyled
      {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl, simpleElement }}
      as={simpleElement ? 'span' : 'label'}
      aria-label={label}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {!simpleElement && (
        <OptionPlanInputStyled
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          as={radio ? RadioGroupItem : CheckboxGroupItem}
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          onChange={() => {
            if (onChange) {
              onChange();
            }
          }}
        />
      )}
      <OptionPlanHeaderStyled radio={radio}>
        <Row alignItems="center">
          <Col col={6}>{label}</Col>
          {logo && (
            <Col col={6}>
              <Box align="right">
                <Img src={logo} height={35} />
              </Box>
            </Col>
          )}
        </Row>
      </OptionPlanHeaderStyled>
      {children}
    </OptionPlanWrapStyled>
  );
};

OptionPlan.displayName = 'OptionPlan';
OptionPlan.Style = OptionPlanWrapStyled;
