document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/resources/menu.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('menu-container').innerHTML = data;
      setNavigationLinks(); // Ensure links are set after menu is loaded
    })
    .catch(error => console.error('Error loading menu:', error));
});

function setNavigationLinks() {
  import('./js/urlHelper.js').then(({ generateURL }) => {
    document.getElementById('search').href = generateURL('search');
    document.getElementById('mygarden').href = generateURL('mygarden');
    document.getElementById('mycart').href = generateURL('mycart');
    document.getElementById('myAccount').href = generateURL('myAccount');
    document.getElementById('search1').href = generateURL('search');
    document.getElementById('mygarden1').href = generateURL('mygarden');
    document.getElementById('mycart1').href = generateURL('mycart');
    document.getElementById('myAccount1').href = generateURL('myAccount');
  }).catch(error => console.error('Error setting navigation links:', error));
}

document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.getElementById('navbar-toggler');
  const navbarMenu = document.getElementById('navbar-menu');
  navbarToggler.classList.toggle("active");
  navbarToggler.click();

  navbarToggler.addEventListener('click', function() {

    navbarToggler.classList.toggle("active");
    let navbarNav=document.getElementById('navbar-nav');
    if( navbarNav.style.display=="none" ){
      navbarNav.style.display="flex";
      navbarMenu.style.display="flex";
    }
    else{
      navbarNav.style.display="none";
      navbarMenu.style.display="none";
    }

  });

  navbarToggler.click();

});
