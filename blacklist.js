const noNoPaths=[
  "/authentification/jwt.js",
  "/authentification/verifyToken.js",
  "/controllers" ,
  "/database",
  "/server.js",
  "/whitelist.js",
  "server.js",
  "blacklist.js",
  "/blacklist.js"
]
let blackListedPaths=noNoPaths.map(value => value.toLowerCase());

function blackListed(str){
  for (var path of blackListedPaths)
    if(str.startsWith(path))
      return true;
  return false;
}

module .exports={blackListedPaths, blackListed};
