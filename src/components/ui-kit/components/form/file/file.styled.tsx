import { styled } from '../../../utils';
import { FormFileProps, FormFileWrapProps } from './types';
import { spacingStyle } from '../../../const/helpers';
import { Button } from '@/ui-kit';
import { ButtonProps } from '@/components/ui-kit/components/button/types';

export const FormFileStyled = styled('input')<FormFileProps>`
  height: 50px;
  min-height: 50px;
  max-height: 50px;
  line-height: 5px !important;
  padding: 20px 15px;
  border-radius: 0;
  -webkit-user-modify: read-write-plaintext-only;

  &::-webkit-file-upload-button {
    width: 0;
    padding: 0;
    display: block;
    box-sizing: border-box;
    visibility: hidden;
  }
  &::file-selector-button {
    width: 0;
    height: 0;
    padding: 0;
    display: inline-block;
    box-sizing: border-box;
    visibility: hidden;
  }
`;

export const FormFileFieldWrapStyled = styled('div')<FormFileWrapProps>`
  position: relative;
  ${(props) => spacingStyle(props)}
`;

export const FormFileButtonStyled = styled(Button)<ButtonProps>`
  font-size: 11px;
  line-height: 50px;
  min-height: 50px;
  max-height: 50px;
  height: 50px;
  padding: 0 15px;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  overflow: visible;
  border-radius: 0;
`;
