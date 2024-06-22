const getFlowers = async()=>{

  const result = await fetch(
    '/notlogged/products',
    {
      method: 'GET',
      headers:{
        'content-type': 'application/json',
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

