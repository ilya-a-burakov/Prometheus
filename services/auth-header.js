import Cookies from 'js-cookie'

export default function authHeader() {
  let user = JSON.parse(Cookies.get('user'));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}