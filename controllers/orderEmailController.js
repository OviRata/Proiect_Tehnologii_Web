const nodemailer = require('nodemailer');
const {sendJson, parseBody} = require("../utilities");
const User = require("../database/model/User");
const dotenv = require('dotenv');
dotenv.config();
function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "barabulaadia@gmail.com",
    pass: "ksnagduwekpnpqnd"
  }
});
const createHtmlContent= (orderDetails)=>{
  let htmlContent='';
  const total =financial(orderDetails.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0));

  const tableRows = orderDetails.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${financial(item.price)}</td>
    </tr>
  `).join('');
  htmlContent =`
    <h1>Thank you for your order!</h1>
    <p style="font-size: 14px;">Here are your order details:</p>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; font-size:16px;">Product Name</th>
          <th style="border: 1px solid #ddd; padding: 8px; font-size:16px;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 8px; font-size:16px;">Price</th>
        </tr>
      </thead>
      <tbody style="padding: 8px;font-size:14px;">
        ${tableRows}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="text-align: right; border: 1px solid #ddd; padding: 8px; font-size:16px;"><strong>Total:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px; font-size:16px;"><strong>$${financial(total)}</strong></td>
        </tr>
      </tfoot>
    </table>
  `;
  return htmlContent;
};

const sendOrderConfirmationEmail = (userEmail, orderDetails) => {
  let htmlContent=createHtmlContent(orderDetails);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Order Confirmation',
    html: htmlContent
     };
  console.log("the html is "+htmlContent);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
const handleOrderEmail = async (req, res) =>{

  try{
    let products = req.body.productsWithQuantity;
    let email=req.body.userEmail;

    ///Considering handleOrderEmail is called with verifyToken [!]
    if(!req?.user?.email){
      return sendJson(res, 409, {error:"bad request"});
    }
    user = await User.findOne({ email: req.user.email });
    if(!user){
      return sendJson(res, 409, {error:"User not found"});
    }
    if(user.email!==email){
      return sendJson(res, 401, {error:"Unauthorized user."});
    }

    if (!products || !email) {
      throw new Error('Products or user email missing in request.');
    }

    const debugDetails = products.map(product => {
      return `Product: ${product.name}, Quantity: ${product.quantity}, Price: ${product.price}`;
    }).join('\n');

    sendOrderConfirmationEmail(email, products);
    return sendJson(res, 200, { message: 'Email sent successfully' });
  }
  catch (err) {
    return sendJson(res, 404, {message: 'Error sending order details.'});
  }
}


module.exports = {sendOrderConfirmationEmail,handleOrderEmail};
