const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String // Number String Boolean Object Array Date
    }, 
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true, // ' test@test.com ' => 'test@test.com',
        lowercase: true // 'Test@Test.Com ' => 'test@test.com'
    },
    password: { 
        type: String
    },
    phone: { 
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'guest'],
        default: 'user'
    }
})

module.exports = mongoose.model('User', userSchema, 'users');