const cloudinary = require("../utils/cloudinary");
const { product } = require("../models");
const db = require("../models");

const User = db.user;
const Product = db.product;
const Cart = db.cart;
const Order = db.order;
const Op = db.Sequelize.Op;

exports.createProduct = async (req, res) => {
  //   const id = req.param.googleId
  //   const user = await User.find({googleId: id})
  //   if(user.role !== "admin"){
  //       return res.status(401).json({message:'Not authorized'});
  //  }
  const { productName, quantity, price, productStatus } = req.body;
  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      productName,
      // productImage: result.secure_url,
      quantity,
      price,
      productStatus,
    };
    const Item = await Product.create(data);
    return res.status(201).json(Item).save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.bulkProduct = async (req, res) => {
  const id = req.param.socialID;
  const user = await User.findOne({ socialID: id });
  if (user.role !== "admin") {
    return res.status(401).json({ message: "Not authorized" });
  }
  const { productName, productImage, quantity, price } = req.body;
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      productName,
      productImage: result.secure_url,
      quantity,
      price,
    };
    const Item = await Product.bulkCreate(data);
    return res.status(201).json(Item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.viewProduct = async (req, res) => {
  const name = req.params.productName;
  try {
    const item = await product.find(name);
    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};

exports.viewAllProduct = async (req, res) => {
  try {

    const stuffs = await Product.findAll()
    return res.status(200).json({ count: stuffs.lenght, data: stuffs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const item = await Product.findByPK(productId).populate("socialID");
    const dataInfo = {
      count: item.length,
      item,
    };
    return res.status(200).json(dataInfo);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
}; //ToDO

exports.createCart = async (req, res) => {
  try {
    const cart = req.body;
    const name = req.params.name;
    const item = await Product.findByid(name);
    //  const q = product.update(item);
    if (Product.quantity < 0) {
      Product.quantity === 0;
      await Product.save();
      return res.status(404).json({
        message: "item Not Available",
      });
    }

    const itemCart = Cart.create(item);
    return res.status(201).json(itemCart);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const viewCart = await Cart.find();
    const dataInfo = {
      count: `${Cart.quantity.length} about to purchase  `,
      viewCart,
    };
    let sum = 0;
    for (let i = 0; i < Cart.price.length; i += 1) {
      sum += Cart.price[i];
    }
    const total = console.log(sum);
    return res.status(200).json({
      dataInfo,
      total,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};

// ///////////////////////////////////////////////////////////////////////////

exports.getProduct = (userId, product) => {
  return Product.find({
    name: product.productName,
    userId: userId,
  })

    .then((product) => {
      return res.status(200).json(product);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ error: error.message, message: "internal server error" });
    });
};

// exports.getCart = async (req,res) =>{
//     req.user.getCart()
//     .then(cart =>{
//       return cart.getProduct();

//     })
//     .then(products =>{
// return res.status(200).json(products)
//     })
//     .catch((error)=> {
//      return res
//        .status(500)
//        .json({ error: error.message, message: "internal server error" });
//   })
// }

// exports.postCart = async (req,res) =>{
//     const productId = req.params.productid;
//     let fetchedCart;
//     let new = 1;
//     req.user
//     .getCart()
//     .then(cart =>{
//         fetchedCart =cart
//         return cart.getProduct({
//             where:{
//                 id: productId
//             }
//         })
//     })
//     .then (products => {
//         let product;
//         if(products.length > 0){
//             product = products[0]
//         }
//         if(product) {
//             const old = product.c
//         }
//     })
// }

// exports.postCart = async (req,res) =>{
//     const id = req.params.id;
//     const cart = await pet. findOneAndUpdate(
//         {id},
//         {allAvailable: -1},
//         {new:true},

//     );

// }
