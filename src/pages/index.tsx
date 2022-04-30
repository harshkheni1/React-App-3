import React from 'react';
import { connect } from 'react-redux';

import { FunctionalPage } from '@/store/service-types';
import Layout from '../containers/layout';
import { nextRedirect } from '../service/helpers';

export const HomePage: FunctionalPage = () => <Layout />;

HomePage.getInitialProps = ({ store, res }) => {
  const {
    app: { isAuthorized },
  } = store.getState();

  if (!isAuthorized) {
    return nextRedirect(res, '/auth');
  }

  return nextRedirect(res, '/account');
};

export default connect()(HomePage);
