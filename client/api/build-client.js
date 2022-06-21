import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on server request should be amde to
    // http://ingress-nginx-controller.ingress-ngix.svc.cluster.local/api/users/currentuser
    return axios.create({
      // baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      baseURL: 'http://www.ticketing-app-fan.xyz/',
      headers: req.headers,
    });
  } else {
    // we are on the browser
    // request can be made wiht a base url of ''
    return axios.create({
      baseURL: '/',
    });
  }
};
