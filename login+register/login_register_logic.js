function loginButtonPressed(){
  let username = document.getElementById("username-input").value
  let password = document.getElementById("password-input").value
  console.log("Inputted username: "+username);
  console.log("Inputted password: "+password);

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}


async function signUpButtonPressed(event){
  event.preventDefault();
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

  const result = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));

  if(result.status==='ok'){
    alert('Success');
  }
  else{
    alert(result.error);
  }

}

