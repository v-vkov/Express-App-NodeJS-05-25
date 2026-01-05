const OrderModel = require('../../models/orders');
const ordersService = require('./orders.service');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// get orders
const getOrders = async (req, res) => {
    const orders = await ordersService.getOrdersList(req.query);
    return res.status(200).json({ data: orders });
};

const ordersAnalytics = async (req, res) => {
    const userId = req.params.userId;
    const analytics = await ordersService.getOrdersAnalytics(userId);
    return res.status(200).json({ data: analytics });
};

// get order by id
const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    const order = await ordersService.getOrderById(orderId);
    return res.status(200).json({ data: order });
};

// create order
const createOrder = async (req, res) => {
    const orderData = req.body;
    const order = await ordersService.createOrder(orderData);
    return res.status(201).json({ data: order });
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
    ordersAnalytics,
    getOrderById,
    createOrder,
    testOrders
};