

function gotoPage(pageLocation){
  console.log('entered');
  window.location.replace(pageLocation);
  window.reload();
}

function generateURL(routeKey) {
  console.log("generated: "+`${baseURL}${routes[routeKey]}`);
  return `${baseURL}${routes[routeKey]}`;
}

