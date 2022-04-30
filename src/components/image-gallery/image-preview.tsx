import React, { useState } from 'react';
import { UploadedFile } from '@/core-types/uploaded-file';
import { ThumbType } from '@/core-types/thumb';
import { Modal, Heading, Carousel, Icon, Img, Text, Box } from '@/ui-kit';
import { getThumb } from './helpers';

const ImagePreview: React.FC<{
  files: UploadedFile[];
  currentFile: number;
  onClose?: () => void;
  previewTitle?: string;
  isMobile?: boolean;
}> = ({ files, currentFile, onClose, previewTitle = 'View Items Images', isMobile = false }) => {
  const [currentIdx, setCurrentIdx] = useState(currentFile);
  const activeFile = files[currentIdx];
  const nextImage = () => {
    setCurrentIdx(currentIdx + 1);
  };
  const prevImage = () => {
    setCurrentIdx(currentIdx - 1);
  };

  return (
    <Modal isOpen={true} onClose={onClose} measure="lg">
      <Modal.Header>
        <Heading as="h5" fontWeight="sbold">
          {previewTitle}
        </Heading>
      </Modal.Header>
      <Modal.Body fullWidth pl={30} pr={30}>
        <Carousel.Img current={currentIdx + 1} count={files.length}>
          {!isMobile && (
            <Carousel.Control onClick={prevImage} position="left" disabled={currentIdx === 0}>
              <Icon name="angle-left" measure={14} color="white" />
            </Carousel.Control>
          )}
          <Img
            alt="current preview image"
            src={getThumb(activeFile, ThumbType.XL)}
            fit="contain"
            height={{ xs: 178, sm: 440 }}
            placeholder
            fullWidth
            key={activeFile.id}
          />
          {!isMobile && (
            <Carousel.Control onClick={nextImage} position="right" disabled={currentIdx === files.length - 1}>
              <Icon name="angle-right" measure={14} color="white" />
            </Carousel.Control>
          )}
        </Carousel.Img>
      </Modal.Body>
      <Modal.Footer fullWidth p={[20, 30]}>
        <Text uppercase measure="xs" m={[0, 0, 8]} letterSpacing={2}>
          images in claim: {files.length}
        </Text>
        <Box m={[0, -8]}>
          {files.map((file, index) => (
            <Box key={file.id} display="inline-block" style={{ width: '64px' }} m={[8]}>
              <Carousel.Thumb onClick={() => setCurrentIdx(index)} active={file.id === activeFile.id}>
                <Img
                  src={getThumb(file, ThumbType.MD)}
                  fit="cover"
                  height={{ xs: 64, sm: 64 }}
                  placeholder
                  fullWidth
                  alt="carousel image"
                />
              </Carousel.Thumb>
            </Box>
          ))}
        </Box>
      </Modal.Footer>
    </Modal>
  );
};

export default ImagePreview;
