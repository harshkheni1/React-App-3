import { styled } from '../../../utils';
import { Colors } from '../../../const';

export const FormRangeStyled = styled.div`
  margin: 0 0 15px;

  .rc-slider {
    position: relative;
    height: 14px;
    padding: 5px 0;
    width: 100%;
    border-radius: 6px;
    touch-action: none;
    box-sizing: border-box;
  }
  .rc-slider * {
    box-sizing: border-box;
  }
  .rc-slider-rail {
    position: absolute;
    width: 100%;
    background-color: ${Colors.gray200};
    height: 2px;
    border-radius: 6px;
  }
  .rc-slider-track {
    position: absolute;
    left: 0;
    height: 2px;
    border-radius: 6px;
    background-color: ${Colors.primaryDark};
  }
  .rc-slider-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    cursor: pointer;
    cursor: grab;
    margin-top: -9px;
    background-color: ${Colors.primaryLight};
    touch-action: pan-x;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    background-color: ${Colors.primary};
  }
  .rc-slider-handle:focus {
    outline: none;
  }
  .rc-slider-handle-click-focused:focus {
    box-shadow: unset;
  }
  .rc-slider-handle:active {
    cursor: grabbing;
  }
  .rc-slider-mark {
    position: absolute;
    top: 18px;
    left: 0;
    width: 100%;
    font-size: 12px;
  }
  .rc-slider-mark-text {
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    color: #999;
  }
  .rc-slider-mark-text-active {
    color: #666;
  }
  .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 2px;
    background: transparent;
  }
  .rc-slider-dot {
    position: absolute;
    bottom: -2px;
    margin-left: -4px;
    width: 8px;
    height: 8px;
    border: 2px solid #e9e9e9;
    background-color: #fff;
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle;
  }
  .rc-slider-dot-reverse {
    margin-right: -4px;
  }
  .rc-slider-disabled {
    background-color: #e9e9e9;
  }
  .rc-slider-disabled .rc-slider-track {
    background-color: ${Colors.primaryDark};
  }
  .rc-slider-disabled .rc-slider-handle,
  .rc-slider-disabled .rc-slider-dot {
    border-color: #ccc;
    box-shadow: none;
    background-color: #fff;
    cursor: not-allowed;
  }
  .rc-slider-disabled .rc-slider-mark-text,
  .rc-slider-disabled .rc-slider-dot {
    cursor: not-allowed !important;
  }
`;
