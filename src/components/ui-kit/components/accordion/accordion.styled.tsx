import { styled } from '../../utils';
import { Colors } from '../../const';

export const AccordionStyled = styled('div')``;

export const AccordionAStyled = styled('a')`
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  padding: 11px 0px;
  padding-right:45px;
  margin-top: 15px;
  color: ${Colors.primary};
  font-size: 17px;
  font-weight: 400;
  border-bottom: 1px solid #e5e5e5;
  justify-content: center;
  @media(max-width:767px) {
    font-size: 15px;
    margin-top:0px;
  }

  &:hover,
  :hover::after {
    cursor: pointer;
    color: ${Colors.primaryDark};
  }
  &:hover::after {
    border: 1px solid ${Colors.primaryDark};
  }
  &.active {
    color: ${Colors.primaryDark};
    // border-bottom: 1px solid ${Colors.primaryDark};
  }
  &::after {
    font-family: 'Ionicons';
    content: '\f218';
    position: absolute;
    float: left;
    right: 0;
    font-size: 1rem;
    color: ${Colors.primary};
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 1px solid ${Colors.primary};
    text-align: center;
  }
  &.active::after {
    font-family: 'Ionicons';
    content: '\f209';
    color: ${Colors.primaryDark};
    border: 1px solid ${Colors.primaryDark};
  }
`;

export const AccordionContentStyled = styled('div')`
  opacity: 0;
  max-height: 0;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  font-family: 'Work Sans', sans-serif;
  clear: both;
  -webkit-transition: all 0.25s ease-in-out;
  -moz-transition: all 0.25s ease-in-out;
  -ms-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  &.active {
    opacity: 1;
    padding: 15px 0px;
    max-height: 100%;
  }
`;

export const AccordionContentPStyled = styled('p')`
  font-size: 15px;
  font-weight: 300;
  margin-top: 0px;
`;
