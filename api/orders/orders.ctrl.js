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

module.exports = {
    getOrders,
    getOrderById,
    createOrder
};