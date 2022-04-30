import React, { Fragment, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { FunctionalPage } from '@/store/service-types';
import { logoutFlow } from '@/store/auth/actions';

const SignOutPage: FunctionalPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch && dispatch(logoutFlow());
  }, [dispatch]);

  return <Fragment />;
};

export default connect()(SignOutPage);
