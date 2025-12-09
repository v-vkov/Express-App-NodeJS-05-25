const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // 8080 5000 3001
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./api/index.router');

const morgan = require('morgan');

// Middleware
app.use(morgan('dev')); // log requests to the console
app.use(express.json()); // parse json body
app.use(express.urlencoded({ extended: true })); // parse url encoded body
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api', indexRouter);

app.get('/', (req, res) => {
    const data = {
        title: 'Express',
        users: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' },
            { id: 3, name: 'John Smith' },
            { id: 4, name: 'Jane Smith' }
        ]
    }
    return res.render('index', data);
});

// Error handling middleware
app.use((err, req, res, next) => {
    const error = (err && (err.message || err.toString())) || 'Something went wrong!';
    const statusCode = (err && (err.statusCode || err.status)) || 500; // Internal Server Error
    return res.status(statusCode).json({ error, code: statusCode });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});