const pathsCompletelyWhiteListed=[
  "/product-display/flowers/",
  "/resources/img/",
  "/display/userDisplay/",
  "/admin/",
  "/resources/js/admin/"
]
const whitelist = [
  "/404.html",
  "/AdminPage.html",
  "/ChangePassword.html",
  "/homePageClient.html",
  "/homePageVendor.html",
  "/index.html",
  "/mygarden.html",
  "/myshoppingcart.html",
  "/placeOrder.html",
  "/plantFlower.html",
  "/product.html",
  "/removeFlower.html",
  "/removeUser.html",
  "/Report.html",
  "/search.html",
  "/userInfo.html",
  "/accountpages/MyAccount.html",
  "/accountpages/MyAccountNotLoggedIn.html",
  "/accountpages/mynotifications/MyNotifications.html",
  "/login+register/formValidation.js",
  "/login+register/login.html",
  "/login+register/login_register_logic.js",
  "/login+register/register.html",
  "/product-display/flowers_for_debug.js",
  "/product-display/products-grid.js",
  "/product-display/search.js",
  "/resources/css/formContainer.css",
  "/resources/css/homePageVendor.css",
  "/resources/css/menustyle.css",
  "/resources/css/mygarden.css",
  "/resources/css/notifications_styles.css",
  "/resources/css/plantFlower.css",
  "/resources/css/product-card.css",
  "/resources/css/productpage-styles.css",
  "/resources/css/profileContainer.css",
  "/resources/css/search.css",
  "/resources/css/shoppingcart.css",
  "/resources/css/style.css",
  "/resources/js/app.js",
  "/resources/js/config.js",
  "/resources/js/export.js",
  "/resources/js/menuByRole.js",
  "/resources/js/mynotifications.js",
  "/resources/js/navbar-script.js",
  "/resources/js/role.js",
  "/resources/js/shoppingCart.js",
  "/resources/js/urlHelper.js",
  "/resources/js/admin/createUserCard.js",
  "/resources/js/admin/deleteUser.js",
  "/resources/js/admin/getAllUsers.js",
  "/resources/js/client/addToCartButton.js",
  "/resources/js/client/getSearchFlowers.js",
  "/resources/js/loggedUser/changeData.js",
  "/resources/js/notifications/deleteNotification.js",
  "/resources/js/notlogged/getProducts.js",
  "/resources/js/vendor/addFlower.js",
  "/resources/js/vendor/deleteFlowers.js",
  "/resources/js/vendor/getFlowers.js",
  "/resources/js/vendor/moveToSale.js",
];
whitelist.push("/",
  "/login", "/formValidation.js", "login_register_logic.js",
  "/register", "/authentification/extractPayLoad.js");
let whitelist_nocase= whitelist.map(value => value.toLowerCase());
let pathsWhite_nocase=pathsCompletelyWhiteListed.map(value => value.toLowerCase());

function isWithinWhitePath(str){
  for(var pathW of pathsWhite_nocase)
    if(str.toLowerCase().startsWith(pathW))
      return true;
  return false;
}

module.exports ={whitelist, whitelist_nocase, pathsWhite_nocase, pathsCompletelyWhiteListed, isWithinWhitePath} ;
