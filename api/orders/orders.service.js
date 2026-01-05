const OrdersModel = require('../../models/orders');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
        .lean();

    return orders;
}

const getOrdersAnalytics = async (userId) => {

    // const aggregatedData = await OrdersModel.aggregate([
    //     {
    //         $match: {
    //             userId: new ObjectId(userId)
    //           }
    //     },
    //     {
    //         $group: {
    //             _id: '$userId',
    //             firstOrder: {
    //               $first: '$$ROOT'
    //             },
    //             averagePrice: {
    //               $avg: '$totalPrice'
    //             },
    //             totalOrdersSum: {
    //               $sum: '$totalPrice'
    //             },
    //             orderIds: {
    //               $push: '$_id'
    //             }
    //         }
    //     },
    //     { 
    //         $match: {
    //             averagePrice: { $gt: 100 }
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             userId: '$_id',
    //             firstOrder: 1,
    //             averagePrice: 1,
    //             totalOrdersSum: 1,
    //             orderIds: 1
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: 'users',
    //             localField: 'userId',
    //             foreignField: '_id',
    //             as: 'user'
    //         }
    //     }, 
    //     {
    //         $unwind: '$user'
    //     }
    // ])

    const aggregatedData = await OrdersModel.aggregate()
        .match({
            userId: new ObjectId(userId)
        })
        .group({
            _id: '$userId',
            firstOrder: { $first: '$$ROOT' },
            averagePrice: { $avg: '$totalPrice' },
            totalOrdersSum: { $sum: '$totalPrice' },
        })
        .match({
            averagePrice: { $gt: 100 }
        })
        .project({
            _id: 0,
            userId: '$_id',
            firstOrder: 1,
            averagePrice: 1,
            totalOrdersSum: 1,
        })
        .lookup({
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
        })
        .unwind('$user')

    return aggregatedData;
}

const getOrderById = async (orderId) => {
    const order = await OrdersModel.findById(orderId);

    // const orderObjectId = order._id;
    // console.log('orderId', orderObjectId);
    // console.log('isValid', ObjectId.isValid(orderObjectId));
    // console.log('timestamp', orderObjectId.getTimestamp());

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
    getOrdersAnalytics,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}