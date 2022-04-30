import React, { FC } from 'react';
import { styled } from '../../utils';
import { Colors, Form, TextSize, spacingStyle, bgHelperStyle, displayHelperStyle } from '../../const';
import { InputGroupElementProps, InputGroupProps } from './types';

const InputGroupChild: FC<InputGroupElementProps> = (props) => {
  const { className, children } = props;
  return <div {...{ className }}>{children}</div>;
};

export const InputGroupStyled = styled(InputGroupChild)<InputGroupProps>`
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  ${(props) => spacingStyle(props)}
  input[type="file"] {
    padding: 20px 10px;
  }
  input {
    width: 100%;
    line-height: ${Form.controlInputLineHeight};
    padding: ${Form.controlInputPadding};
    display: block;
    font-size: 12px;
    -webkit-user-modify: read-write-plaintext-only;
    box-sizing: border-box;
    color: ${Colors.gray800};
    background-color: ${Colors.white};
    border: 1px solid ${Colors.gray700};
    ${({ display }) => display && displayHelperStyle(display)}

    &::-webkit-input-placeholder {
      color: ${Colors.gray500};
      text-transform: none;
    }
    &::-moz-placeholder {
      color: ${Colors.gray500};
      text-transform: none;
    }
    &:-ms-input-placeholder {
      color: ${Colors.gray500};
      text-transform: none;
    }
    &:-moz-placeholder {
      color: ${Colors.gray500};
      text-transform: none;
    }

    &:focus {
      z-index: 1;
      border-color: ${Colors.primary};
    }
  }
`;

export const InputGroupAddonStyled = styled(InputGroupChild)<InputGroupElementProps>`
  min-width: 50px;
  display: flex;
  border: 1px solid ${Colors.gray700};
  line-height: 20px;
  align-items: center;
  justify-content: center;
  border-right: none;
  box-sizing: border-box;
  ${({ bg }) => bgHelperStyle(bg)}
  button {
    margin: -1px -1px -1px -1px;
    &:hover,
    &:focus {
      z-index: 1;
    }
  }
  ${({ display }) => display && displayHelperStyle(display)}
`;

export const InputGroupBlockStyled = styled(InputGroupChild)<InputGroupElementProps>`
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;
  ${({ bg }) => bgHelperStyle(bg)}
  & ~ ${InputGroupAddonStyled} {
    border-left: none;
    border-right: 1px solid ${Colors.gray700};
    margin-left: -1px;
    button {
      margin: -1px -1px -1px 0;
    }
  }
  ${({ display }) => display && displayHelperStyle(display)}
`;

export const InputGroupTextStyled = styled(InputGroupChild)<InputGroupElementProps>`
  min-width: 50px;
  display: flex;
  border: 1px solid ${Colors.gray700};
  line-height: 20px;
  align-items: center;
  justify-content: center;
  border-right: none;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  font-size: ${TextSize.xs};
  ${({ bg }) => bgHelperStyle(bg)}
  ${({ display }) => display && displayHelperStyle(display)}
`;
