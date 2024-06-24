const baseURL = 'http://localhost:3030'; // This could be dynamically set based on environment

const routes = {
  notlogged: {
    home: '/',
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
    home: '/homePageClient.html',
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
    home: '/homePageVendor.html',
    login: '/login+register/login.html',
    register: '/login+register/register.html',

    notifications: '/accountpages/mynotifications/MyNotifications.html',

    myAccount: '/accountpages/MyAccount.html',
    mygarden:'/homePageVendor.html',

    myAccount1: '/accountpages/MyAccount.html',
    mygarden1: '/homePageVendor.html',

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


