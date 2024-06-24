const noNoPaths=[
  "/authentification",
  "/controllers" ,
  "/db",
  "/server.js",
  "/whitelist.js"
]
let blackListedPaths=noNoPaths.map(value => value.toLowerCase());

function blackListed(str){
  for (var path of blackListedPaths)
    if(str.startsWith(path))
      return true;
  return false;
}

module .exports={blackListedPaths, blackListed};
