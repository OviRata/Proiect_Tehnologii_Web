
function gotoPage(pageLocation){
  console.log('entered');
  window.location.replace(pageLocation);
  window.reload();
}



export function setNavigationLinks() {
  document.getElementById('search').href = generateURL('search');
  document.getElementById('mygarden').href = generateURL('mygarden');
  document.getElementById('mycart').href = generateURL('mycart');
  document.getElementById('myAccount').href = generateURL('myAccount');
  document.getElementById('search1').href = generateURL('search');
  document.getElementById('mygarden1').href = generateURL('mygarden');
  document.getElementById('mycart1').href = generateURL('mycart');
  document.getElementById('myAccount1').href = generateURL('myAccount');
}

window.addEventListener('DOMContentLoaded', (event) => {
  setNavigationLinks();
});
