const changeData = async (event)=>{

  let username = document.getElementById("username").value
  //document.getElementById("username").disabled=true;

  let fullname = document.getElementById("fullname").value
  //document.getElementById("fullname").disabled=true;

  let email = document.getElementById("email").value

  newData = {username:username, fullname:fullname, email:email}


  const result = await fetch('/user/change',
    {
      method: 'PUT',
      headers:{
        'authorization': 'Bearer '+localStorage.getItem('accessToken'),
        'content-type': 'application/json'
      },
      body:JSON.stringify(newData)
    }
    )

    resultJson = await result.json();

    jwt = resultJson.jwt;
    localStorage.setItem('accessToken', jwt);

    if(result.status<300 && result.status>=200){
      console.log(resultJson.message);
    }
    else{
      alert(resultJson.error);
    }

  payloadObject = getPayload();
  //globalRole = payloadObject.role;
  localStorage.setItem("globalRole", payloadObject.role);
  localStorage.setItem( "globalUsername" , payloadObject.username );
  localStorage.setItem( "globalFullname" , payloadObject.fullname );
  localStorage.setItem( "globalEmail" , payloadObject.email );

  location.reload();


}
