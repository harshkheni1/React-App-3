import React, { Fragment, ReactElement } from 'react';
import Head from 'next/head';
import { Loading } from '@/ui-kit';
import { connect } from 'react-redux';

import { RootState } from '@/store/root-reducer';
import { isScopeLoading } from '@/store/scope-loading/helpers';
import { AppScope } from '@/store/app/types';
import Header from './header';
import Footer from './footer';
import NotificationCenter from '@/components/notification/notification-center';
import { MainLayoutStyled } from './styled/main.styled';

interface LayoutProps {
  isLoading: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  children?: ReactElement | ReactElement[];
}

const Layout: React.FC<LayoutProps> = ({ children, isLoading, hideHeader, hideFooter }) => {
  return (
    <Fragment>
      <Head>
        <title>ProtectAll Portal</title>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
        />
        <link rel="icon" href="favicon.png" type="image/png" sizes="32x32" />
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"></link>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-179981887-1"></script>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <MainLayoutStyled hideHeader={hideHeader} hideFooter={hideFooter}>
        {!hideHeader && <Header />}
        {children}
        {isLoading && <Loading color="gray800" fontSize={32} full bg="white" />}
        <NotificationCenter />
        {!hideFooter && <Footer />}
      </MainLayoutStyled>
    </Fragment>
  );
};

const mapStateToProps = ({ scopeLoading }: RootState) => ({ isLoading: isScopeLoading(scopeLoading, AppScope) });

export default connect(mapStateToProps)(Layout);
