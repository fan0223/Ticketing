import axios from 'axios';
import buildClient from '../api/build-client';
const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};
// https://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser
LandingPage.getInitialProps = async (context) => {
  console.log('LANDING page');
  const build = buildClient(context);
  const { data } = await build.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
