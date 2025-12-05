const { randomUUID } = require('crypto');
const crypto = require('crypto')

const users = [
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'John Smith' },
    { id: 4, name: 'Jane Smith' },
    { id: 5, name: 'John Doe' },
    { id: 6, name: 'Jane Doe' },
    { id: 7, name: 'John Smith' },
    { id: 8, name: 'Jane Smith' }
]


const getUsers = (req, res) => {
    const apiKey = crypto.randomBytes(32).toString('hex')
    console.log(apiKey)
    return res.status(200).json({ data: users }); 
};

const getUserById = (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id.toString() === userId.toString());

    if (!user) {
       return res.status(404).json({ error: `User with id ${userId} not found` });
    }

    return res.status(200).json({ data: user });
};

const getUserBooks = (req, res) => {
    res.send('User books list ');
};

const createUser = (req, res) => { 
    const { name } = req.body;

    const newUser = {
        id: randomUUID(),
        name: name
    }

    users.push(newUser);

    return res.status(201).json({ data: newUser });
};

const updateUser = (req, res) => {
    res.json({ data: `User updated` });
};

const deleteUser = (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id.toString() === userId.toString());

    if (!user) {
       return res.status(404).json({ error: `User with id ${userId} not found` });
    }

    users = users.filter(user => user.id.toString() !== userId.toString());

    res.status(200).json({ data: `User deleted` });
};

module.exports = {
    getUsers,
    getUserById,
    getUserBooks,
    createUser,
    updateUser,
    deleteUser
};