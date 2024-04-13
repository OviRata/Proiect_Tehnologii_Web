
//import { initializeProductGrid } from './products-grid';

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

document.addEventListener('DOMContentLoaded', function() {
  // Call the function to execute the code
  initializeProductGrid();

  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // Event listener for form submission
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get search query
    const query = searchInput.value.trim().toLowerCase();
    console.log(query);
    // Filter products based on search query
    const filteredProducts = products.filter(function(product) {
      return product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
    });

    // Display search results
    displaySearchResults(filteredProducts);
  });


  function displaySearchResults(results) {
    // Clear previous search results
    searchResults.innerHTML = '';

    // Check if there are any search results
    if (results.length === 0) {
      searchResults.innerHTML = '<p>No matching products found.</p>';
      return;
    }

    // Display each search result
    results.forEach(function(product) {
      const card = createProductCard(product);
      searchResults.appendChild(card);
    });
  }
});


function initializeProductGrid() {

  document.addEventListener('DOMContentLoaded', function() {
    addProductCards();
  });
}
