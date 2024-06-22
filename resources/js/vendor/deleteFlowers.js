const deleteFlowers = async function ( event ) {
  event.preventDefault();
  let name = document.getElementById('flower_name').value;
  let stage = document.getElementById('stage').value;

  const result = await fetch('/vendor/delete',
    {
      method: 'DELETE',
      headers:{
        'Accept': 'application/json',
        'name':name,
        'stage':stage,
        'authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    }
    );

  console.log(result);
  const resultJson = await result.json();
  if(result.status<300 && result.status>=200){
    console.log(resultJson.message);
  }
  else{
    alert(resultJson.error);
  }

}
