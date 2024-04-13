
//import { initializeProductGrid } from './products-grid';

var products = [
  { name: "Iridarium", image: "/img/iridarium.jpg", price: "$10.00", description: "Description of Product 1"  },
  { name: "Lalele", image: "/img/lalele.jpg", price: "$15.00", description: "Description of Product 1"  },
  { name: "Hortesia", image: "/img/hortesia.jpg", price: "$26.00" , description: "Description of Product 1" },
  { name: "Limba mielului", image: "/img/limba_mielului_2.jpg", price: "$12.00", description: "Description of Product 1"  },

];
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
