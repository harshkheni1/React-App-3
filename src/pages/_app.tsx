import React from 'react';
import App, { AppInitialProps, AppContext } from 'next/app';
import { Router } from 'next/router';
import * as UAParser from 'ua-parser-js';
import { END } from 'redux-saga';
import Bowser from 'bowser';
import { Provider } from 'react-redux';
import { coreStore, reduxWrapper, SagaStore } from '../store';
import { AppScope } from '@/store/app/types';
import { cleanPageError, setIsMobile, restoreSession, startSessionWatcher } from '@/store/app/actions';
import { disableScopeLoading, enableScopeLoading } from '@/store/scope-loading/actions';
import { cleanUpScopeError } from '@/store/scope-error/actions';
import NotificationProvider from '@/components/notification/notification-provider';
import ErrorBoundary from '../containers/error-boundary';
import { CssBaseline } from '@/ui-kit';
import { IeModal } from '@/components/ui-kit/components/modal/modals';

class GbsClaimsApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    const {
      store,
      store: { dispatch },
    } = ctx;
    dispatch(startSessionWatcher());
    if (ctx.req) {
      dispatch(restoreSession(ctx));
    }

    dispatch(cleanPageError());
    dispatch(cleanUpScopeError());

    const uaString = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;
    const userAgent = UAParser(uaString);
    dispatch(setIsMobile(userAgent.device.type === UAParser.DEVICE.MOBILE));

    const browser = Bowser.getParser(uaString);
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      store,
      isIE: browser?.isBrowser && browser.isBrowser('Internet Explorer', true),
    };

    if (ctx.req) {
      dispatch(END);
      await (store as SagaStore).sagaTask.toPromise();
    }

    return {
      pageProps,
    };
  };

  componentDidMount() {
    coreStore?.dispatch(startSessionWatcher());

    if (typeof document !== 'undefined') {
      Router.events.on('routeChangeStart', this.handleRouteChangeStart);
      Router.events.on('routeChangeComplete', this.handleRouteChangeComplete);
    }
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      Router.events.off('routeChangeStart', this.handleRouteChangeStart);
      Router.events.off('routeChangeComplete', this.handleRouteChangeComplete);
    }
  }

  handleRouteChangeStart = () => {
    coreStore?.dispatch(enableScopeLoading(AppScope));
  };

  handleRouteChangeComplete = () => {
    coreStore?.dispatch(disableScopeLoading(AppScope));
  };

  render() {
    const { Component, pageProps } = this.props;
    const { isIE } = pageProps;

    return (
      <Provider store={coreStore}>
        <ErrorBoundary>
          <NotificationProvider>
            <CssBaseline />
            <Component {...pageProps} />
            {isIE && <IeModal />}
          </NotificationProvider>
        </ErrorBoundary>
      </Provider>
    );
  }
}

export default reduxWrapper.withRedux(GbsClaimsApp);
