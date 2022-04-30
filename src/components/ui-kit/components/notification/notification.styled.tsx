import { styled } from '../../utils';
import { NotificationStyledAttrProps } from './types';
import { Colors, TextSize } from '../../const';

export const NotificationStyled = styled('div')<NotificationStyledAttrProps>`
  min-height: 54px;
  position: relative;
  background-color: ${({ $type }) => ($type === 'success' ? '#DCF7EB' : '#FFE0E0')};
  color: ${Colors.gray800};
  font-size: ${TextSize.sm};
  padding: ${({ buttonTitle }) => `18px ${buttonTitle ? '130px' : '15px'} 18px 60px`};
  text-align: right;
  & > svg {
    width: 60px;
    height: 48px;
    display: block;
    position: absolute;
    text-align: center;
    padding: 15px;
    margin: -24px 0 0;
    box-sizing: border-box;
    top: 50%;
    left: 0;
  }
  & > span {
    text-align: left;
    display: block;
    word-break: break-word;
  }
  & > button,
  a {
    background-color: transparent;
    top: 50%;
    right: 0;
    color: ${Colors.gray800};
    position: absolute;
    font-size: ${TextSize.xxs};
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    display: block;
    line-height: 20px;
    padding: 14px 15px;
    border: 1px;
    margin: -24px 10px 5px;
    letter-spacing: 1.65px;
    height: 48px;
    &:hover {
      border: none;
      background-color: transparent;
      color: ${Colors.black};
    }
  }
`;
