
async function loginButtonPressed(event){
  event.preventDefault();


  let username = document.getElementById("username-input").value
  let password = document.getElementById("password-input").value
  console.log("Inputted username: "+username);
  console.log("Inputted password: "+password);
 // let errors=validateLoginForm(username, password);
  let errors="";
  if(errors.length ){
    alert("Login data isn't valid:\n"+errors+"\nPlease try again using valid input.");
    return ;
  }
  const result = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .catch(error => console.error('Error:', error));

   resultJson = await result.json();
  if(result.status<300 && result.status>=200){
    alert(resultJson.message);
  }
  else{
    alert(resultJson.error);
  }

  console.log(resultJson.token);

  localStorage.setItem( "accessToken" , resultJson.token );
   payloadObject = getPayload();

  localStorage.setItem("globalRole", payloadObject.role);
  localStorage.setItem( "globalUsername" , payloadObject.username );
  localStorage.setItem( "globalFullname" , payloadObject.fullname );
  localStorage.setItem( "globalEmail" , payloadObject.email );

  location.href = '/index.html';
  //location.reload();
}


async function signUpButtonPressed(event){
  event.preventDefault();
  let username = document.getElementById("username-input").value
  let fullName = document.getElementById("fullname-input").value
  let email = document.getElementById("email-input").value
  let role = document.getElementById("role-input").value
  let password = document.getElementById("password-input").value
  let confirmPassword = document.getElementById("confirm-password-input").value
  console.log("Inputted username: "+username);
  console.log("Inputted fullname: "+fullName);
  console.log("Inputted email: "+email);
  console.log("Inputted role: "+role);
  console.log("Inputted password: "+password);
  console.log("Inputted confirm password: "+confirmPassword);

  let errors=validateRegisterForm(username, fullName, email, role, password, confirmPassword);
  if(errors.length){
    alert("Registration data isn't valid:\n"+errors+"\nPlease try again using valid input.");
    return ;
  }

  const result = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, fullName, role, email, password })
  })
    .catch(error => console.error('Error:', error));

  console.log(result);

   resultJson = await result.json();

  if(result.status<300 && result.status>=200){
    alert(resultJson.message);
    location.href = '/login';
  }
  else{
    alert(resultJson.error);
  }

}
