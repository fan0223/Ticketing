import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import buildClient from '../api/build-client';
import Header from '../component/header';
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  // cause we use getInitialProps in custom App , so the page Component disable use getInitialProps
  // but if we want fetch data (getInitialProps) in page Component, can use the approach
  // that take parameter appContext , the page Component getInitialProps put in appContext.Component.getInitialProps
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
