import dotenv from "dotenv";
import ImageKit from "imagekit";
dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

export default imagekit;





// import ImageKit from "imagekit";

// var ImageKit = require("imagekit");

// var imagekit = new ImageKit({
//     publicKey : process.env.IMAGE_KIT_PUBLIC_KEY,
//     privateKey : process.env.IMAGE_KIT_PRIVATE_KEY,
//     urlEndpoint : process.env.IMAGE_KIT_URL_ENDPOINT
// });

// export default imagekit;
// // This code initializes the ImageKit SDK with the public and private keys, and the URL endpoint.