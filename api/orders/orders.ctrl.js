const OrderModel = require('../../models/orders');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// get orders
const getOrders = (req, res) => {
    return res.status(200).json({ data: 'Orders list' });
};

// get order by id
const getOrderById = (req, res) => {
    return res.status(200).json({ data: 'Order by id' });
};

// create order
const createOrder = (req, res) => {
    return res.status(200).json({ data: 'Order created' });
};

const testOrders = async (req, res) => {

    const result = []
    // const result = await OrderModel.create({
    //     userId: '6945976581089d6df9a4cfb9',
    //     products: ['6945976581089d6df9a4cfb9', '6945976581089d6df9a4cfb9', '6945976581089d6df9a4cfb9'],
    //     totalPrice: 1000,
    //     status: 'cancelled'
    //     // scheduleDate: new Date()
    // });

    // const result = new OrderModel({
    //     userId: '6945976581089d6df9a4cfb9',
    //     products: ['6945976581089d6df9a4cfb9', '6945976581089d6df9a4cfb9', '6945976581089d6df9a4cfb9'],
    //     totalPrice: 850,
    //     status: 'shipped',
    //     scheduleDate: new Date()
    // });

    // await result.save()

    // const result = await OrderModel.insertOne({
    //     userId: '6945976581089d6df9a4cfb9',
    //     products: ['6945976581089d6df9a4cfb9', '6945976581089d6df9a4cfb9', '6945976581089d6df9a4cfb9'],
    //     totalPrice: 850,
    //     status: 'shipped',
    //     scheduleDate: new Date()
    // });

    // $nor $not 
    // const result = await OrderModel.find({
    //     $nor: [ 
    //         {status: 'delivered'}, 
    //         {$and: [{isActive: true}, {status: 'shipped'}] },
    //         {$and: [{isActive: false}, {status: 'completed'}] },
    //     ]
    // }) // []

    // const result = await OrderModel.findOne({_id: new ObjectId('69459e69d4d5c464f73c8f91')}) // {} found 5 = returned 1 

    // const result = await OrderModel.findById('69459e69d4d5c464f73c8f91') // {}
    
    return res.status(200).json({ data: result });
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    testOrders
};