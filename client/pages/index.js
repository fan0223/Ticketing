import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <div>Landing page</div>;
};
// https://ingress-nginx-controller.ingress-ngix.svc.cluster.local/api/users/currentuser
LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on server request should be amde to
    // https://ingress-nginx-controller.ingress-ngix.svc.cluster.local/api/users/currentuser
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    // we are on the browser
    // request can be made wiht a base url of ''
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};

export default LandingPage;
