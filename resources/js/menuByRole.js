function hideElement( element ){
  if(element===null)return;
  element.style.display="none";
}


function hideForClient(){
    //document.getElementById("");
  hideElement(document.getElementById("list-mygarden"));

  hideElement(document.getElementById("list-mygarden1"));
}

function hideForVendor(){
  hideElement(document.getElementById("list-mycart"));
  hideElement(document.getElementById("list-search"));

  hideElement(document.getElementById("add-to-cart"));

  hideElement(document.getElementById("list-mycart1"));
  hideElement(document.getElementById("list-search1"));
}

function hideForNotLogged(){
  hideElement(document.getElementById("list-mycart"));
  hideElement(document.getElementById("list-mygarden"));


  hideElement(document.getElementById("add-to-cart"));

  hideElement(document.getElementById("list-mycart1"));
  hideElement(document.getElementById("list-mygarden1"));
}


function hideForAdmin(){
  hideElement( document.getElementById('list-mycart') );
  hideElement(document.getElementById("list-search"));
  hideElement(document.getElementById("list-mygarden"));

  hideElement(document.getElementById("add-to-cart"));

  hideElement( document.getElementById('list-mycart1') );
  hideElement(document.getElementById("list-search1"));
  hideElement(document.getElementById("list-mygarden1"));
}

function hideForRole(role){
  console.log("hiding for "+globalRole);
  if(role==="client"){
    hideForClient();
  }
  if(role==="vendor"){
    hideForVendor();
  }
  if(role==="notlogged") {
    hideForNotLogged();
  }

  if(role==='admin'){
    hideForAdmin();
  }

}


// document.addEventListener(onload, ()=>{hideForRole(globalRole)} );
// hideForRole(globalRole)

