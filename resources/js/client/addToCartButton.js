const addToCart = async ()=>{
  let productName = document.getElementById("product-name").innerHTML;
  let productPrice = document.getElementById("product-price").innerHTML;

  productPrice=productPrice.split(' ')[1];
  console.log(productPrice);
  console.log(productName);
  let products = await getSearchFlowers();
  let product = null;
  console.log(products);
  for(let i in products){
    if(products.at(i).name===productName && parseFloat(products.at(i).price)===parseFloat(productPrice) ){
      product=products.at(i);
      break;
    }
  }

  cartProductsJson = localStorage.getItem("cartProducts");
  cartProductsCountJson = localStorage.getItem("cartProductsCount");
  let cartProducts;
  let cartProductsCount;
  if(cartProductsJson) {
    cartProducts = JSON.parse(cartProductsJson);
  }
  else{
    cartProducts=[];
  }

  if(cartProductsCountJson){
    cartProductsCount=JSON.parse(cartProductsCountJson);
  }
  else{
    cartProductsCount=[];
  }

  for(let i in cartProducts){
    if( cartProducts.at(i).name===product.name && cartProducts.at(i).price===product.price  ){
      cartProductsCount[i]=cartProductsCount[i]+1;
      localStorage.setItem('cartProductsCount', JSON.stringify(cartProductsCount));
      return ;
    }
  }

  console.log(cartProducts);
  cartProducts.push(product);
  console.log(cartProducts);
  cartProductsCount.push(1);
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts) );
  localStorage.setItem("cartProductsCount", JSON.stringify(cartProductsCount) );

}
