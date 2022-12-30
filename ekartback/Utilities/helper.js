const eKartModel = require('../Model/eKartSchema')

exports.GenerateUserId = async() => {
    const userData = await eKartModel.users.find({},{_id : 0 , _v:0});
    console.log(userData)
    let len = userData.length+1;
    len = len.toString();
    const id = 'U10' + len;
    return id;
}

exports.updateCart = async (username) => {
    const cartData = await eKartModel.cart.findOne({ username: username })
    console.log(cartData)
    if (!cartData) {
        console.log("No Data in the cart")
    }
    else {
        let totalPrice = 0   
        let totalDeliveryCharge = 0   
        cartData.items = cartData.items.filter(item => item.quantity > 0)   
        for (let item of cartData.items) {
            totalPrice += item.cost * item.quantity
            totalDeliveryCharge += item.deliveryCharge * item.quantity

        }
        cartData.totalPrice = totalPrice 
        cartData.totalDeliveryCharge = totalDeliveryCharge  
        cartData.grandTotal = totalPrice + totalDeliveryCharge
        await cartData.save()
    }
}