import {
  styled,
  Text,
  PopoverWrapStyled as PopoverWrapDefaultStyled,
  PopoverStyled,
  GridBreakpointsMediaDown,
  Box,
  Row,
} from '@/ui-kit';

export const ContainerStyled = styled(Box)`
  border-radius: 10px;
  box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.12);
  border: none;
  overflow: hidden;
  min-height: 411px;
  margin-bottom: 30px;
  background: white;
  text-align: left;
`;

export const RowStyledContentCenter = styled(Row)`
  justify-content: center;
`;

export const UploadBlock = styled('div')`
  margin-bottom: 20px;
`;

export const UploadBlockLabel = styled('label')`
  border: 1px dashed #7b84a9;
  width: 100 %;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const UploadBlockFileArea = styled('input')`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  opacity: 0;
  z-index: 100;
`;

export const TextSecondary = styled('p')`
  color: #7b84a9 !important;
  margin: 0;
`;

export const RowFileStyled = styled(Row)`
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  background: #efefef;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UploadCompleted = styled(Row)`
  background-color: #e2f9e1;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FileNameStyled = styled(Text)`
  max-width: 460px;
  word-break: break-all;
`;

export const PopoverWrapStyled = styled(PopoverWrapDefaultStyled)`
  ${PopoverStyled} {
    ${GridBreakpointsMediaDown.md} {
      width: calc(100vw - 60px);
    }
  }
`;
