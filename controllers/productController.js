const Product = require('../db/model/Product');
const User = require('../db/model/User');
const {sendJson} = require("../utilities");

const formidable = require('formidable');
const fs = require('fs');

const getUserByUsername= async (username)=>{
  return User.findOne({username:username}).exec();
}



const createNewImageFilePath= async ()=>{
  for(let i=1; ;i++){
    let name = 'flower'+i+'.jpg'
    let newFilePath = './product-display/flowers/'+name;
    if( fs.existsSync(newFilePath) ){
      continue;
    }
    else{
      return name;
    }
  }
}


const createProduct = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files)=>{
    if(err){
      return sendJson(res, 500, {error:"error parsing form data"});
    }


    const oldpath = files.image[0].filepath;
    //const newpath = path.join('./img',files.image.filename);

    let imageName = await createNewImageFilePath();
    console.log(files.image[0]);
    let src = (files.image[0]).filepath;
    console.log(src);
    let buffer = fs.readFileSync(src);
    console.log('buffer read');
    console.log(imageName);
    fs.writeFile("./product-display/flowers/"+imageName, buffer, (err) => {
      console.error(err)
    })

    const name = fields.name[0];
    const price = fields.price[0];
    const temperature=fields.temperature[0];
    const soil=fields.soil[0];
    const humidity=fields.humidity[0];
    const water=fields.water[0];
    const description=fields.description[0];
    const stage = fields.stage[0];

    const tokenUser = req.user;
    console.log(tokenUser);
    const user = await getUserByUsername(tokenUser.username);

    console.log(user);

    result = await Product.create({
      "userID":user._id,
      "name":name,
      "price":price,
      "temperature":temperature,
      "imageName":imageName,
      "soil":soil,
      "humidity":humidity,
      "water":water,
      "stage":stage,
      "description":description
    });


    return sendJson(res, 203, {message:"Product created!"});

  } );
}



const getAllProductsOfUser = async (req, res) =>{
  if( !req?.user?.username ){
    return sendJson(res, 400, {error:"Bad request"});
  }
  const user = await User.findOne({username:req.user.username});
  console.log(req.user);
  console.log(user);
  if(!user){
    return sendJson(res, 409, {error:"User not found"});
  }
  console.log(user._id);
  const products = await Product.find( {userID:user._id} ).exec();

  console.log(products);

  sendJson( res, 203, {products: products, message:'products sent' } );
}

const getAllProducts = async (req, res) => {
  if(!req?.user?.username) {
    return sendJson(res, 409, {error: "Bad request"});
  }
  const user = await User.findOne({username:req.user.username});
  if(!user){
    return sendJson(res, 409, {error:"User not found"});
  }
  const products = await Product.find().exec();
  console.log(products);
  sendJson(res,203,{products:products, message:'products sent'});
}

const deleteProduct = async (req, res) => {
  if(!req?.user?.username) {
    return sendJson(res, 409, {error: "Bad request"});
  }
  const user = await User.findOne({username:req.user.username});
  if(!user){
    return sendJson(res, 409, {error:"User not found"});
  }
  productName = req.headers['name'];
  productStage = req.headers['stage'];

  const flowers = await Product.find( {name:productName, stage:productStage} ).exec();
  for(let i in flowers){
    let imageName = flowers.at(i).imageName;
    console.log(flowers.at(i));
    console.log('unlinking: '+'./product-display/flowers/'+imageName);
    try {
      fs.unlinkSync('./product-display/flowers/' + imageName,

        function (err) {
          if (err) throw err;
          console.log('File deleted!');
        }

        );
    }
    catch(err){
      console.log(err);
    }
  }

  const result = await Product.deleteMany( {name:productName, stage:productStage} ).exec();
  sendJson(res, 200, {message:"Products with given name and stage have been deleted"});
}

module.exports = {getAllProductsOfUser, createProduct, getAllProducts, deleteProduct}
