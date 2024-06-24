document.addEventListener('DOMContentLoaded', async () => {
  const addToFavButton = document.getElementById('add-to-fav');

  addToFavButton.addEventListener('click', await addToFavorites);
});
function addToFavorites() {
  const productData = {
    productName: document.getElementById("product-name").innerHTML,
    productPrice: document.getElementById("product-price").innerHTML
  };
  console.log("de ce? "+localStorage.getItem('favorites'));
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  console.log("favorites before push " + JSON.stringify(favorites));
  favorites.push(productData);
  console.log("favorites after push " + JSON.stringify(favorites));
  console.log(productData);

  localStorage.setItem('favorites', JSON.stringify(favorites));

  alert('Product added to favorites!');
}
