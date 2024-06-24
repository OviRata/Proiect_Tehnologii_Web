function createUserCard(user) {
  console.log(user);
  // debug purposes only
  var card = document.createElement('div');
  card.classList.add('product-card');

  var image = document.createElement('img');
  image.src = './display/userDisplay/defaultUser.png';
  image.alt = user.name;

  var info = document.createElement('div');
  info.classList.add('product-info');

  var title = document.createElement('div');
  title.classList.add('product-title');
  title.textContent = user.username;

  var userID = document.createElement('div');
  userID.classList.add('product-price');
  userID.textContent = user._id;

  var button = document.createElement('a');
  button.textContent = 'View Details';
  button.classList.add('view-details');
  button.href = 'userInfo.html';
  button.target = '_blank';

  // console.log(  'product.html?product=' + encodeURIComponent(JSON.stringify(product)) );
  // console.log( JSON.stringify(product) );

  button.onclick=function(){
    localStorage.setItem("futureJSON", JSON.stringify(user) );
    //gotoPage("product.html");
  }

  info.appendChild(title);
  info.appendChild(userID);
  info.appendChild(button);

  card.appendChild(image);
  card.appendChild(info);

  return card;
}
