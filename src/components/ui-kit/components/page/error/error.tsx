import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { PageErrorStyled, RowStyled } from './error.styled';
import { PageErrorProps } from '../types';
import { Container, Row, Col } from '../../grid';
import { Text } from '../../text';
import { Box } from '../../box';
import { Img } from '../../img';
import { Heading } from '../../heading';

export const PageError: FC<PageErrorProps> & WithStyle = (props) => {
  const { img, code, title, text, link } = props;
  return (
    <PageErrorStyled {...props}>
      <Container>
        <RowStyled justifyContent="center" alignItems="center">
          <Col lg={11}>
            <Row>
              <Col md={6} mdOrder={2} smOrder={1}>
                <Img src={img} fit="contain" fullWidth />
              </Col>
              <Col md={6} mdOrder={1} smOrder={2}>
                <Heading as="h2">
                  {code}: {title}
                </Heading>
                <Box>
                  <Text as="p">{text}</Text>
                </Box>
                <Row>
                  <Col lg={8}>{link}</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </RowStyled>
      </Container>
    </PageErrorStyled>
  );
};
