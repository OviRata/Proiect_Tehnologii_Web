const baseURL = 'http://localhost:3030';

const routes = {
  notlogged: {
    home: '/accountpages/myhomes/',
    login: '/login+register/login.html',
    register: '/login+register/register.html',

    notifications: '/accountpages/mynotifications/MyNotifications.html',

    myAccount: '/accountpages/MyAccountNotLoggedIn.html',
    search: '/search.html',
    mygarden:'/mygarden.html',
    mycart:'/myshoppingcart.html',

    myAccount1: '/accountpages/MyAccountNotLoggedIn.html',
    search1: '/search.html',
    mygarden1:'/mygarden.html',
    mycart1:'/myshoppingcart.html',



    product:'/product.html'
  },

  client: {
    home: '/accountpages/myhomes/homePageClient.html',
    login: '/login+register/login.html',
    register: '/login+register/register.html',

    notifications: '/accountpages/mynotifications/MyNotifications.html',

    myAccount: '/accountpages/MyAccount.html',
    search: '/search.html',
    mycart:'/myshoppingcart.html',

    myAccount1: '/accountpages/MyAccount.html',
    search1: '/search.html',
    mycart1:'/myshoppingcart.html',

    product:'/product.html'
  },

  vendor: {
    home: '/accountpages/myhomes/homePageVendor.html',
    login: '/login+register/login.html',
    register: '/login+register/register.html',

    notifications: '/accountpages/mynotifications/MyNotifications.html',

    myAccount: '/accountpages/MyAccount.html',
    mygarden:'/accountpages/myhomes/homePageVendor.html',

    myAccount1: '/accountpages/MyAccount.html',
    mygarden1: '/accountpages/myhomes/homePageVendor.html',

    product:'/product.html'
  },

  admin:{
    home:'/AdminPage.html',
    myAccount:'/accountPages/MyAccount.html',
    product:'product.html',
    notifications:'/accountpages/myNotifications/MyNotifications.html',

    home1:'/AdminPage.html',
    myAccount1:'/accountPages/MyAccount.html'
  }

};
