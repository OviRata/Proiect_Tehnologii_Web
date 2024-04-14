function loginButtonPressed(){
  let username = document.getElementById("username-input").value
  let password = document.getElementById("password-input").value
  console.log("Inputted username: "+username);
  console.log("Inputted password: "+password);
}


function signUpButtonPressed(){
  let username = document.getElementById("username-input").value
  let fullName = document.getElementById("fullname-input").value
  let email = document.getElementById("email-input").value
  let password = document.getElementById("password-input").value
  let confirmPassword = document.getElementById("confirm-password-input").value
  console.log("Inputted username: "+username);
  console.log("Inputted fullname: "+fullName);
  console.log("Inputted email: "+email);
  console.log("Inputted password: "+password);
  console.log("Inputted confirm password: "+confirmPassword);

}



function gotoPage(pageLocation){
  console.log('entered');
  window.location.replace(pageLocation);
  window.reload();
}
