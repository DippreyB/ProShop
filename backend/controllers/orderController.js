import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'


//@desc     Create New Order
//@route    POST /api/orders
//@access   private
const addOrderItems = asyncHandler(async (req, res)  => {
    console.log(req.body)
    const {orderItems, shippingAddress, paymentMethod,itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
    
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('no order items...')
        return
    }
    else{
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod,
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice,

        })
        console.log(order)
        const createdOrder = await order.save()
        console.log('Order Created')
        res.status(201).json(createdOrder)
    }
} )

export {addOrderItems}