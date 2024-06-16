const baseURL = 'http://localhost:8080'; // This could be dynamically set based on environment

const routes = {
  home: '/',
  login: '/login+register/login.html',
  register: '/login+register/register.html',
  myAccount: '/accountpages/MyAccountNotLoggedIn.html',
  search: '/search.html',
  mygarden:'/mygarden.html',
  mycart:'/myshoppingcart.html',

};

export {baseURL, routes};

