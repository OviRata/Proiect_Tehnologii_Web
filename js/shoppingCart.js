
function initializeAll(){

  var products = [
    {userID: 2, name: "Iridarium", image: "/img/iridarium.jpg", price: 10.00, description: "Description of Product 1"},
    {userID: 1, name: "Lalele", image: "/img/lalele.jpg", price: 15.00, description: "Description of Product 1"},
    {userID: 0, name: "Hortesia", image: "/img/hortesia.jpg", price: 26.00, description: "Description of Product 1"},
    {
      userID: 0,
      name: "Limba mielului",
      image: "/img/limba_mielului_2.jpg",
      price: 12.00,
      description: "Description of Product 1"
    },
  ];

  var shoppingCart = document.querySelector('.shopping-cart');

  products.forEach(function (product) {
    var item = document.createElement('div');
    item.classList.add('item');

    var imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    var image = document.createElement('img');
    image.src = product.image;
    image.addEventListener('click', function () {
      var productUrl = 'product.html?product=' + encodeURIComponent(JSON.stringify(product));
      window.location.href = productUrl;
    });
    imageDiv.appendChild(image);
    item.appendChild(imageDiv);

    var descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description');
    var nameSpan = document.createElement('span');
    nameSpan.textContent = product.name;
    var priceSpan = document.createElement('span');
    priceSpan.classList.add('price');
    priceSpan.textContent = product.price.toFixed(2);
    descriptionDiv.appendChild(nameSpan);
    descriptionDiv.appendChild(priceSpan);
    item.appendChild(descriptionDiv);

    var quantityDiv = document.createElement('div');
    quantityDiv.classList.add('quantity');
    var plusBtn = document.createElement('button');
    plusBtn.classList.add('plus-btn');
    plusBtn.textContent = '+';
    var quantityInput = document.createElement('input');
    quantityInput.type = 'text';
    quantityInput.value = '1';
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
        updateTotalPrice(item);
      } else {
        removeItem(item);
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
    });
    item.appendChild(deleteBtn);

    var totalPriceDiv = document.createElement('div');
    totalPriceDiv.classList.add('total-price');
    totalPriceDiv.textContent = product.price.toFixed(2);
    item.appendChild(totalPriceDiv);

    shoppingCart.appendChild(item);
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

var plusButtons = document.querySelectorAll('.plus-btn');
plusButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var input = button.nextElementSibling;
    var currentValue = parseInt(input.value);
    input.value = currentValue + 1;
    updateTotalPrice(button.closest('.item'));
    updateTotalCost();
  });
});

var minusButtons = document.querySelectorAll('.minus-btn');
minusButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var input = button.previousElementSibling;
    var currentValue = parseInt(input.value);
    if (currentValue > 1) {
      input.value = currentValue - 1;
      updateTotalPrice(button.closest('.item'));
      updateTotalCost();
    } else {
      removeItem(button.closest('.item'));
    }
  });
});

var removeButtons = document.querySelectorAll('.delete-btn');
removeButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    removeItem(button.closest('.item'));
    updateTotalCost();
  });
});

updateTotalCost();

}
