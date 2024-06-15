document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.getElementById('navbar-toggler');
  const navbarMenu = document.getElementById('navbar-menu');
  navbarToggler.classList.toggle("active");
  navbarToggler.click();

  navbarToggler.addEventListener('click', function() {

    navbarToggler.classList.toggle("active");
    navbarNav=document.getElementById('navbar-nav');
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
