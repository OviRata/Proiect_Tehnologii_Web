
const getOrdinalOfProduct=(product)=>{

  productsJson=localStorage.getItem('cartProducts');
  products = JSON.parse(productsJson);
  let result = 0;


  for(let i = 0; i<products.length; i++){
    if(products[i].name===product.name && products[i].price===product.price){
      result=i;
      return result;
    }
  }
  result=products.length;
  return result;
}


const removeFromProducts=(name, price)=>{
  productsJson=localStorage.getItem('cartProducts');
  products = JSON.parse(productsJson);

  let productCountsJson = localStorage.getItem('cartProductsCount');
  let productCounts = JSON.parse(productCountsJson);

  let removed=false;
  newProducts = [];
  newProductCounts=[];
  console.log(name);
  console.log(price);
  for(let i in products){
    console.log(price);
    console.log(products.at(i).price);
    if(removed===false && products.at(i).name===name && parseFloat(products.at(i).price)===parseFloat(price) ){
      removed=true;
    }
    else{
      newProducts.push(products.at(i))
      newProductCounts.push( productCounts.at(i) );
    }

  }
  console.log(products);
  console.log(newProducts);
  localStorage.setItem('cartProducts', JSON.stringify(newProducts));
  localStorage.setItem('cartProductsCount', JSON.stringify(newProductCounts) )
}


function initializeAll(){

  var productsJson = localStorage.getItem("cartProducts");
  let products=null;

  if(productsJson){
    products=JSON.parse(productsJson);
  }

  console.log(products);
  if(products===undefined || !products){
    products=[];
  }
  let productsCountJson  = localStorage.getItem("cartProductsCount");
 let productsCount;
  if(productsCountJson){
    productsCount=JSON.parse(productsCountJson);
  }
  else{
    productsCount=[];
  }

  var shoppingCart = document.querySelector('.shopping-cart');

  let currentNumber = -1;

  products.forEach(function (product) {
    currentNumber++;
    var item = document.createElement('div');
    item.classList.add('item');

    var imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    var image = document.createElement('img');
    image.src = './product-display/flowers/'+product.imageName;
    image.addEventListener('click', function () {
      var productUrl = baseURL+'/product.html';
      window.location.href = baseURL+"/product.html";
    });

    //console.log( 'product.html?product=' + encodeURIComponent(JSON.stringify(product)) );

    imageDiv.appendChild(image);
    item.appendChild(imageDiv);

    var descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description');
    var nameSpan = document.createElement('span');
    nameSpan.textContent = product.name;
    nameSpan.setAttribute('id', 'span name '+currentNumber);

    var priceSpan = document.createElement('span');
    priceSpan.classList.add('price');
    priceSpan.textContent = parseInt(product.price).toFixed(2);
    priceSpan.setAttribute('id', 'span price '+currentNumber);

    descriptionDiv.appendChild(nameSpan);
    descriptionDiv.appendChild(priceSpan);
    item.appendChild(descriptionDiv);

    var quantityDiv = document.createElement('div');
    quantityDiv.classList.add('quantity');
    var plusBtn = document.createElement('button');
    plusBtn.classList.add('plus-btn');
    plusBtn.textContent = '+';

    plusBtn.addEventListener('click',

      ()=>{
        var input = plusBtn.nextElementSibling;
        var currentValue = parseInt(input.value);

        input.value = currentValue + 1;
        productsCount[  getOrdinalOfProduct(product) ]=productsCount[ getOrdinalOfProduct(product) ]+1;
        localStorage.setItem('cartProductsCount',JSON.stringify(productsCount));
        updateTotalPrice(plusBtn.closest('.item'));
        updateTotalCost();
      }

      )


    var quantityInput = document.createElement('input');
    quantityInput.type = 'text';
    quantityInput.value = productsCount.at(currentNumber);
    quantityInput.addEventListener('input', function () {
      updateTotalPrice(item);
      if (parseInt(quantityInput.value) <= 0) {
        removeItem(item);
      }
    });
    var minusBtn = document.createElement('button');
    minusBtn.classList.add('minus-btn');
    minusBtn.textContent = '-';
    minusBtn.addEventListener('click', function () {
      var input = quantityInput;
      var currentValue = parseInt(input.value);
      if (currentValue > 1) {
        input.value = currentValue - 1;
        productsCount[ getOrdinalOfProduct(product) ]=productsCount[ getOrdinalOfProduct(product) ]-1;
        localStorage.setItem('cartProductsCount',JSON.stringify(productsCount));
        updateTotalPrice(item);
      } else {
        removeItem(item);
        let name=nameSpan.textContent;
        let price=priceSpan.textContent;
        removeFromProducts(name, price);
      }
    });
    quantityDiv.appendChild(plusBtn);
    quantityDiv.appendChild(quantityInput);
    quantityDiv.appendChild(minusBtn);
    item.appendChild(quantityDiv);

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', function () {

      removeItem(item);
      let name=nameSpan.textContent;
      let price=priceSpan.textContent;
      removeFromProducts(name, price);

    });
    item.appendChild(deleteBtn);


    var totalPriceDiv = document.createElement('div');
    totalPriceDiv.classList.add('total-price');
    totalPriceDiv.textContent = parseInt(product.price).toFixed(2);
    item.appendChild(totalPriceDiv);

    shoppingCart.appendChild(item);
    updateTotalPrice(item);
  });

  var totalCostValue = document.getElementById('total-cost-value');


  function updateTotalCost()
{
  var totalCost = 0;
  var items = document.querySelectorAll('.item');
  items.forEach(function (item) {
    var totalPrice = parseFloat(item.querySelector('.total-price').textContent);
    totalCost += totalPrice;
  });
  totalCostValue.textContent = totalCost.toFixed(2);
}

function updateTotalPrice(item) {
  var quantity = parseInt(item.querySelector('.quantity input').value);
  var price = parseFloat(item.querySelector('.price').textContent);
  var totalPrice = quantity * price;
  item.querySelector('.total-price').textContent = totalPrice.toFixed(2);
}

function removeItem(item) {
  var itemName = item.querySelector('.description span:first-child').textContent;
  var confirmRemove = confirm("Are you sure you want to remove '" + itemName + "' from the cart?");
  if (confirmRemove) {
    item.parentNode.removeChild(item);
    updateTotalCost();
    alert("Item '" + itemName + "' has been removed from the cart.");
  }
}





var removeButtons = document.querySelectorAll('.delete-btn');
removeButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    updateTotalCost();
  });
});

updateTotalCost();

}
