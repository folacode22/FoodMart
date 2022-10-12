const Flutterwave = require("flutterwave-node-v3");
const key = require('./keys')
const flutterwave = new Flutterwave({
flutterwave_secret_key:[key.flutterwave.secret_key],
  flutterwave_public_key:[key.flutterwave.public_key],
  flutterwave_encryption_key:[key.flutterwave.encryption_key]

})

// const chargeCardFunction = async(req,res){
//     let data ={
//         amount : 100,
//         currency: 'NGN',
//         card_number : '',
//     }
// }