import React from 'react';
import Link, { LinkProps } from 'next/link';
import getConfig from 'next/config';
import { PublicRuntimeConfig } from '@/core-types/config';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { APP_URL } = publicRuntimeConfig;

const NextLink: React.FC<LinkProps> = ({ children, href, as, ...rest }) => {
  return (
    <Link href={`${href}`} as={`${APP_URL}${as || href}`} {...rest}>
      {children}
    </Link>
  );
};

export default NextLink;
