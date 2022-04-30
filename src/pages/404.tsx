import React from 'react';
import { Page, Container, Heading } from '@/ui-kit';
import Layout from '../containers/layout';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <Page>
        <Container>
          <Heading as="h1" fontSize={100} align="center">
            404
          </Heading>
          <Heading as="h4" fontSize={22} align="center">
            Page Not Found
          </Heading>
        </Container>
      </Page>
    </Layout>
  );
};

export default NotFoundPage;
