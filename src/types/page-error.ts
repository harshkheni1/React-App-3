import img403 from '../images/logo.png';
import img404 from '../images/logo.png';
import img500 from '../images/logo.png';

export interface PageError {
  code: number;
  message?: string;
  data?: unknown;
}

export interface ErrorContent {
  code: number;
  title: string;
  text: string;
  img: string;
}

export const errorList: ErrorContent[] = [
  {
    code: 400,
    title: 'Bad Request',
    text: 'Something went wrong. The server cannot process the request.',
    img: img500,
  },
  {
    code: 403,
    title: 'Forbidden',
    text: 'Access to this resource on the server is denied.',
    img: img403,
  },
  {
    code: 404,
    title: 'Page not found',
    text: 'Sorry, the page you were trying to view does not exist.',
    img: img404,
  },
  {
    code: 500,
    title: 'Internal server error',
    text:
      'Something went wrong with our servers.\nDon’t worry our development team has automatically been notified of the issue and they are working on it.\nPlease try again in a few minutes.',
    img: img500,
  },
];
