const getFlowersOnStage = async (stage)=>{

  const result = await fetch(
    '/vendor/products',
    {
      method:'GET',
      headers:{
        'authorization': 'Bearer '+localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    }
  )

  resultJson = await result.json();

  if(result.status<300 && result.status>=200){
    console.log(resultJson.message);
  }
  else{
    console.log(resultJson.error);
  }
  allFlowersJson = resultJson.products;
  console.log(allFlowersJson);
  flowersOnStage=[];
  for(let i in allFlowersJson){
    flower = allFlowersJson.at(i);
    console.log(flower);
    console.log(flower.stage);

    console.log(stage);
    console.log( typeof flower );
    if(flower.stage===stage){
      flowersOnStage.push(flower);
    }
  }
  return flowersOnStage;

}

