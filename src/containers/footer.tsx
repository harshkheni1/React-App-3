import React from 'react';

import { Container, Box, Row, Col, List, Text, Icon, styled, GridBreakpointsMediaUp, Colors, A } from '@/ui-kit';
import { MainFooterStyled } from './styled/main.styled';

const FooterColumn = styled(Row)`
  ${GridBreakpointsMediaUp.md} {
    > div:not(:last-child) {
      border-left: 1px solid ${Colors.gray500};
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <MainFooterStyled as="footer">
      <Container>
        <Box display={{ xs: 'block', md: 'none' }}>
          <Icon name="gbs-logo" measure={14} />
        </Box>
        <FooterColumn>
          <Col sm={6} md={3} mdOrder={2}>
            <List listStyle="none" m={[5]} measure="sm" p={[0]}>
              <List.Item mb={5}>9151 Boulevard 26,</List.Item>
              <List.Item mb={5}>Suite 150,</List.Item>
              <List.Item mb={5}>North Richland Hills, Texas 76180</List.Item>
            </List>
          </Col>
          <Col sm={6} md={4} mdOrder={3}>
            <List listStyle="none" m={[5, -5, 5, 0]} measure="sm" p={[0]}>
              <List.Item>
                <Icon name="email" mr={10} measure={14} color="primaryDark" />
                <A color="primary" href="mailto:support@myprotectall.com">
                  support@myprotectall.com
                </A>
              </List.Item>
              <List.Item mb={10}>
                {/* <Icon name="phone" mr={10} measure={14} color="primaryDark" /> */}
                <Text measure="sm" m={[10, 0, 0]}>
                  For assistance or additional information, please call the Toll Free Number listed in your Terms and
                  Conditions.
                </Text>
                {/* <A color="primary" href="tel:1-877-277-6043">
                  1-877-277-6043
                </A> */}
              </List.Item>
            </List>
          </Col>
          <Col md={5} mdOrder={1}>
            <Box vertical-align="bottom">
              <Box display={{ xs: 'none', md: 'block' }}>
                <Icon name="gbs-logo" measure={14} />
              </Box>
              <Text measure="sm" m={[10, 0, 0]}>
                Terms of Service | Privacy Policy
              </Text>
              <Text measure="sm" m={[5, 0, 0]}>
                © 2020 All Rights Reserved. ProtectAll USA, LLC
              </Text>
            </Box>
          </Col>
        </FooterColumn>
      </Container>
    </MainFooterStyled>
  );
};

export default Footer;
