const isProd = process.env.NODE_ENV === 'production';
const isLocal = process.env.SERVER === 'local';
// --------------------------------------------------
// AXIOS
// --------------------------------------------------
import axios from 'axios';

var clientUrl = 'https://api.kulbabka.info';
var localtUrl = 'http://localhost:8081';

if (isLocal) {
  clientUrl = 'http://localhost:8081'
}

const $axios = axios.create({baseURL: clientUrl}) 

import Cookies from 'js-cookie';

class AuthService {
  login(user) {
    return $axios
      .post('/api/auth/signin', {
        phone: user.phone,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          Cookies.set('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    Cookies.remove('user');
  }

  register(user) {
    return $axios.post('/api/auth/signup', {
      phone: user.phone,
      password: user.password
    })
    .then(response => {
      if (response.data.accessToken) {
        Cookies.set('user', JSON.stringify(response.data));
      }

      return response.data;
    });
  }
}

export default new AuthService();