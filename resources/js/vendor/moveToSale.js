
const moveFlowerToSale = async ( flowerName, currentStage, finalStage ) =>{
  const moving = {flowerName:flowerName , currentStage:currentStage, finalStage:finalStage };

  const result = await fetch('/vendor/products/move/specific',

    {
      method: 'PUT',
      headers:{
        'authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'content-type': 'application/json'
      },
      body: JSON.stringify(moving)
    }

  );

  const resultJson = await result.json();

  if(result.status<300 && result.status>=200){
    console.log(resultJson.message);
  }
  else{
    alert(resultJson.error);
  }
}

const moveSpecificToSale = async () => {



  console.log("clicked move specific");
  let flowerName = document.getElementById("search-input").value;
  console.log(flowerName);
  if( flowerName === "" ){
    alert('no flower in input!');
  }

  await moveFlowerToSale(flowerName, 'grown', 'sale');
  window.location.reload();
}


const moveAllToSale = async () => {



  grownFlowers = await getFlowersOnStage('grown');
  for(let i in grownFlowers){
    flower = grownFlowers.at(i);
    await moveFlowerToSale( flower.name, 'grown', 'sale' )
  }


  window.location.reload();
}
