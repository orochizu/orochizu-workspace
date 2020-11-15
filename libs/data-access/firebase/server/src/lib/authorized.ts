import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { firebaseAdmin } from './firebase';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emptyGetServerSideProps = (ctx) => {
  return { props: {} as never };
};

export const authorized = (
  callback?: GetServerSideProps
): GetServerSideProps => {
  const getServerSideProps = callback ?? emptyGetServerSideProps;

  return async (ctx) => {
    try {
      const cookies = nookies.get(ctx);
      await firebaseAdmin.auth().verifyIdToken(cookies.token);

      return getServerSideProps(ctx);
    } catch (e) {
      ctx.res.writeHead(302, { Location: '/home' });
      ctx.res.end();

      return emptyGetServerSideProps(ctx);
    }
  };
};
