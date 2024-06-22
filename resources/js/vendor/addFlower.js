const addFlower = async (event)=>{
  event.preventDefault();

  name = document.getElementById('flower_name').value;
  //image = document.getElementById('flower_image').value;
  const fileInput = document.getElementById('flower_image');
  let price = document.getElementById('flower_price').value;
  let soil = document.getElementById('soil').value;
  let temperature = document.getElementById('temperature').value;
  let humidity = document.getElementById('humidity').value;
  let water = document.getElementById('water').value;
  let stage = document.getElementById('stage').value;
  let description = document.getElementById('description').value;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('image', fileInput.files[0]);
  formData.append('soil', soil);
  formData.append('temperature', temperature);
  formData.append('humidity', humidity);
  formData.append('water', water);
  formData.append('stage', stage);
  formData.append('description', description);

  const token = localStorage.getItem('accessToken');

  const result = await fetch(
    '/vendor/products',
  {
      method:'POST',
      headers:{
        'authorization': 'Bearer '+token
      },
      body: formData
    }
  );

  resultJson = await result.json();
  if(result.status<300 && result.status>=200){
    alert(resultJson.message);
  }
  else{
    alert(resultJson.error);
  }
}


