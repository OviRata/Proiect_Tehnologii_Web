
var products = [
  { name: "Iridarium", image: "/img/iridarium.jpg", price: "$10.00", description: "Description of Product 1"  },
  { name: "Lalele", image: "/img/lalele.jpg", price: "$15.00", description: "Description of Product 1"  },
  { name: "Hortesia", image: "/img/hortesia.jpg", price: "$26.00" , description: "Description of Product 1" },
  { name: "Limba mielului", image: "/img/limba_mielului_2.jpg", price: "$12.00", description: "Description of Product 1"  },

];

function createProductCard(product) {
  console.log(product);
  // debug purposes only
  var card = document.createElement('div');
  card.classList.add('product-card');

  var image = document.createElement('img');
  image.src = product.image;
  image.alt = product.name;

  var info = document.createElement('div');
  info.classList.add('product-info');

  var title = document.createElement('div');
  title.classList.add('product-title');
  title.textContent = product.name;

  var price = document.createElement('div');
  price.classList.add('product-price');
  price.textContent = product.price;

  var button = document.createElement('a');
  button.textContent = 'View Details';
  button.classList.add('view-details');
  button.href = 'product.html?product=' + encodeURIComponent(JSON.stringify(product));
  button.target = '_blank';

  info.appendChild(title);
  info.appendChild(price);
  info.appendChild(button);

  card.appendChild(image);
  card.appendChild(info);

  return card;
}


function addProductCards() {
  // debug purpose only
  console.log("Adding product cards...");
  var grid = document.getElementById('product-grid');
  products.forEach(function(product) {
    var card = createProductCard(product);
    grid.appendChild(card);
  });
}
function viewProductDetails(product) {
  console.log("Viewing details for:", product.name);
  var productPageContainer = document.getElementById('product-page-container');

  productPageContainer.innerHTML = '';

  var productPage = document.createElement('div');
  productPage.classList.add('product-page');

  var productName = document.createElement('h2');
  productName.textContent = product.name;

  var productImage = document.createElement('img');
  productImage.src = product.image;
  productImage.alt = product.name;

  var productPrice = document.createElement('p');
  productPrice.textContent = 'Price: ' + product.price;

  var productDescription = document.createElement('p');
  productDescription.textContent = product.description;

  var addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.classList.add('add-to-cart');
  addToCartButton.addEventListener('click', function() {
    addToCart(product);
  });


  productPage.appendChild(productName);
  productPage.appendChild(productImage);
  productPage.appendChild(productPrice);
  productPage.appendChild(productDescription);
  productPage.appendChild(addToCartButton);

  productPageContainer.appendChild(productPage);
}

function addToCart(product) {
  // debug purpose only
  // [!] Need to add product adding logic
  console.log('Product added to cart:', product.name);
}


document.addEventListener('DOMContentLoaded', addProductCards);
