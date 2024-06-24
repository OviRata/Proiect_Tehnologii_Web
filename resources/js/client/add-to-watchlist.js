document.addEventListener('DOMContentLoaded', () => {
  const addToFavButton = document.getElementById('add-to-fav');

  addToFavButton.addEventListener('click', addToFavorites);
});

function addToFavorites() {
  const productData = {
    productName : document.getElementById("product-name").innerHTML,
    productPrice : document.getElementById("product-price").innerHTML
  };

  let favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];

  favorites.push(productData);

  sessionStorage.setItem('favorites', JSON.stringify(favorites));

  alert('Product added to favorites!');
}
