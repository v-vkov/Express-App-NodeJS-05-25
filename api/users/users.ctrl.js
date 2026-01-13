
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../../models/users');

const emailService = require('../../services/resend');

const getUserById = async (req, res) => {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
       return res.status(404).json({ error: `User with id ${userId} not found` });
    }

    return res.status(200).json({ data: user });
};

const updateUser = (req, res) => {
    res.json({ data: `User updated` });
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
       return res.status(404).json({ error: `User with id ${userId} not found` });
    }

    await UserModel.deleteOne({ _id: userId });

    return res.status(200).json({ data : `User deleted` });
};

const signUp = async (req, res) => {
    const { email, password, name, phone } = req.body;

    const isExitingUser = await UserModel.findOne({ email: email }).select('-password');

    if (isExitingUser) {
        return res.status(400).json({ error: `Email already in use` });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({    
        name: name,
        email: email,
        phone: phone,
        password: hash
    });

    // send welcome email
    const data = await emailService.sendEmail(
        'Acme <onboarding@resend.dev>',
        ['rambambam72@gmail.com'],
        'Welcome To Vika shop',
        '<strong>Welcome to Vika Shop</strong>'
    );

    console.log('Email responce:', data);

    return res.status(201).json({ data: newUser });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email }); 

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
    getUserById,
    updateUser,
    deleteUser,
    signUp,
    login,
    logout
};