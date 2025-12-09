const { randomUUID } = require('crypto');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' }
]


const getUsers = (req, res) => {
    const userId = res.locals.userId;

    console.log('userId', userId);
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

    res.status(200).json({ data : `User deleted` });
};

const signUp = async (req, res) => {
    const { email, password, name, phone } = req.body;

    const user = users.find(user => user.email.toString() === email.toString());

    if (user) {
        return res.status(400).json({ error: `Email already in use` });
    }

    const hash = await bcrypt.hash(password, 10);

    console.log('hash', hash);

    const newUser = {
        id: randomUUID(),
        name: name,
        email: email,
        phone: phone,
        password: hash
    }

    users.push(newUser);

    return res.status(201).json({ data: newUser });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email.toString() === email.toString());

    if (!user) {
        return res.status(400).json({ error: `Invalid credentials` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ error: `Invalid credentials` });
    }

    const token = jwt.sign(
        {
            userId: user.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    )

    res.cookie('token', token, { 
        httpOnly: true, // only accessible by the server
        secure: false, // https only
        maxAge: 60*60*1000 // 1 hour in milliseconds
    });
    
    return res.status(200).json({ data: user });
}

const logout = (req, res) => {
    res.clearCookie('token', { 
        httpOnly: true, // only accessible by the server
        secure: false, // https only
        maxAge: 60*60*1000 // 1 hour in milliseconds
    });

    return res.status(200).json({ data: 'Logged out' });
}

module.exports = {
    getUsers,
    getUserById,
    getUserBooks,
    createUser,
    updateUser,
    deleteUser,
    signUp,
    login,
    logout
};