import React, { Fragment } from 'react';
import { NextPageContext } from 'next';

import NextLink from '@/components/next-link';
import { FunctionalPage } from '@/store/service-types';
import { CssBaseline, Page, Box, Container, Navbar, Button } from '@/ui-kit';
import MainLogo from '../images/logo.png';

import { ErrorContent, errorList } from '../types/page-error';

const defaultError: ErrorContent = errorList.find((item) => item.code === 500);

const ErrorPage: FunctionalPage<{
  statusCode: number;
  title?: string;
  err?: unknown;
}> = ({ statusCode, title }) => {
  const content: ErrorContent = errorList.find((item) => item.code === statusCode) || defaultError;

  return (
    <Fragment>
      <CssBaseline />
      <Page bg="secondaryLight">
        <Navbar>
          <Container>
            <Box display="flex">
              <NextLink href="/">
                <Navbar.Brand>
                  <img src={MainLogo} alt="main logo" />
                </Navbar.Brand>
              </NextLink>
            </Box>
          </Container>
        </Navbar>
        <Page.Error
          img={content.img}
          code={content.code}
          title={title || content.title}
          text={content.text}
          link={
            <NextLink href="/">
              <Button variant="solid" color="primaryDark" as="div" fullWidth>
                Go to the homepage
              </Button>
            </NextLink>
          }
        />
      </Page>
    </Fragment>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  let statusCode;
  if (res) {
    statusCode = res.statusCode;
  } else {
    statusCode = err ? err.statusCode : 404;
  }

  if (statusCode !== 404) {
    //Sentry log ?
  }
  return { statusCode, err };
};

export default ErrorPage;
