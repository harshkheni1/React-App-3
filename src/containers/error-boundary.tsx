import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ErrorPage from '../pages/_error';
import { RootState } from '@/store/root-reducer';

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, error }) => {
  if (error) {
    return <ErrorPage statusCode={error.code} title={error.message} />;
  }

  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = ({ app: { error } }: RootState) => ({
  error,
});

type ErrorBoundaryProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ErrorBoundary);
