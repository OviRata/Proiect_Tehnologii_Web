
async function loginButtonPressed(event){
  event.preventDefault();




  let username = document.getElementById("username-input").value
  let password = document.getElementById("password-input").value
  console.log("Inputted username: "+username);
  console.log("Inputted password: "+password);

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
  //console.log( getPayload() );

  payloadObject = getPayload();
  //globalRole = payloadObject.role;
  localStorage.setItem("globalRole", payloadObject.role);
  location.reload();
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

  if(password!=confirmPassword){
    alert("password is not the same as confirm password!!!");
    return;
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

  // console.log(result);
  // console.log(result.status);
  // console.log(resultJson);
  //
  if(result.status<300 && result.status>=200){
    alert(resultJson.message);
  }
  else{
    alert(resultJson.error);
  }

}

