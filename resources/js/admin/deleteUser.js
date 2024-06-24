const deleteUser = async (event) =>{
  event.preventDefault();
  const userId = document.getElementById('user_id').value;

  const result = await fetch('/admin/users',
    {
      method: 'DELETE',
      headers:{
        'authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'deleteid':userId
      }
    }
    )

  const resultJson = await result.json();

  if(result.status<300 && result.status>=200){
    console.log(resultJson.message);
  }
  else{
    alert(resultJson.error);
  }



}
