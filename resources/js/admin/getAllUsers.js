const getAllUsers = async () => {

  const result = await fetch('/admin/users',
    {
      method: 'GET',
      headers:{
        'authorization': 'Bearer '+localStorage.getItem('accessToken'),
        'content-type': 'application/json'
      }
    }
    );

  resultJson = await result.json();

  if(result.status<300 && result.status>=200){
    console.log(resultJson.message);
  }
  else{
    console.log(resultJson.error);
  }

  return resultJson.users;

}
