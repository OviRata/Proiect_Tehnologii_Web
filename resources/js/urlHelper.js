

function gotoPage(pageLocation){
  console.log('entered');
  window.location.replace(pageLocation);
  window.reload();
}

function generateURL(routeKey) {
  return `${baseURL}${routes[routeKey]}`;
}

