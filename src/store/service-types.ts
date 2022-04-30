import { NextPageContext } from 'next';

export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type FunctionalPage<T = undefined> = React.FC<T> & {
  getInitialProps?: (arg: NextPageContext) => unknown;
};
