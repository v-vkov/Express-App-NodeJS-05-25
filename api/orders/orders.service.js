const OrdersModel = require('../../models/orders');

const getOrdersList = async (query) => {
    const orders = await OrdersModel.find(query);

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