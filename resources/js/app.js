
function gotoPage(pageLocation){
  console.log('entered');
  window.location.replace(pageLocation);
  window.reload();
}


function setNavigationLinkOnElement(name){
  if( document.getElementById(name)!=null ){
    document.getElementById(name).href=generateURL(name);
  }
}



function setNavigationLinks() {
  // if(document.getElementById('search')!=null){document.getElementById('search').href = generateURL('search');
  // document.getElementById('mygarden').href = generateURL('mygarden');
  // document.getElementById('mycart').href = generateURL('mycart');
  // document.getElementById('myAccount').href = generateURL('myAccount');
  // document.getElementById('search1').href = generateURL('search');
  // document.getElementById('mygarden1').href = generateURL('mygarden');
  // document.getElementById('mycart1').href = generateURL('mycart');
  // document.getElementById('myAccount1').href = generateURL('myAccount');
  setNavigationLinkOnElement('search');
  setNavigationLinkOnElement('mygarden');
  setNavigationLinkOnElement('mycart');
  setNavigationLinkOnElement('myAccount');
  setNavigationLinkOnElement('search1');
  setNavigationLinkOnElement('mygarden1');
  setNavigationLinkOnElement('mycart1');
  setNavigationLinkOnElement('myAccount1');

  setNavigationLinkOnElement('home');
  // setNavigationLinkOnElementByClass("logo", 'home');
}

window.addEventListener('DOMContentLoaded', (event) => {
  setNavigationLinks();
});
