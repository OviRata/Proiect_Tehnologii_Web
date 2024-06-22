const getSearchFlowers = async ()=>{

  const result = await fetch(
    '/client/products',
    {
      method: 'GET',
      headers:{
        'authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    }
  )

  resultJson = await result.json();
  if(result.status<300 && result.status>=200){
    console.log(resultJson.message);
  }
  else{
    alert(resultJson.error);
  }
  console.log(resultJson.products);
  return resultJson.products;
}
