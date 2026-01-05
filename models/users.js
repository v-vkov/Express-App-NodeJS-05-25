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

userSchema.index({ email: 1 });

userSchema.index({ 
    email: 1, 
    role: 1
}, { unique: true, partialFilterExpression: { role: { $ne: 'guest' } } });

// userSchema.index({
//     email: 1,
//     phone: 1
// }, { unique: true, partialFilterExpression: { phone: { $exists: true } } });

// userSchema.index({
//     name: 1,
// }, { unique: true, sparse: true });

module.exports = mongoose.model('User', userSchema, 'users');