const OrdersModel = require('../../models/orders');

const getOrdersList = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 100;

    const orders = await OrdersModel.find()
        .populate({
            path: 'products',
            select: 'name price image',
        })
        .populate({
            path: 'userId',
            select: 'name email'
        })
        .sort({ createdAt: -1 }) // 1: ascending, -1: descending
        .skip((page-1) * limit)
        .limit(limit)

    return orders;
}

const getOrderById = async (orderId) => {
    const order = await OrdersModel.findById(orderId);

    return order;
}

const createOrder = async (orderData) => {
    const newOrder = await OrdersModel.create(orderData);

    return newOrder;
}

const updateOrder = async (orderId, orderData) => {
    const order = await OrdersModel.findByIdAndUpdate(orderId, {$set: orderData}, {new: true});

    return order;
}

const deleteOrder = (orderId) => {
    return OrdersModel.findByIdAndDelete(orderId);
}

module.exports = {
    getOrdersList,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}