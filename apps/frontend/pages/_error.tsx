import NextErrorComponent from 'next/error';

import * as Sentry from '@sentry/nextjs';
import { NextPageContext } from 'next';

const CustomError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  console.log(hasGetInitialPropsRun);
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

CustomError.getInitialProps = async ({
  res,
  err,
  asPath,
}: Partial<NextPageContext>) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    AppTree: undefined,
    pathname: '',
    query: undefined,
    res,
    err,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  errorInitialProps.hasGetInitialPropsRun = true;

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return errorInitialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );
  await Sentry.flush(2000);

  return errorInitialProps;
};

export default CustomError;
