const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false}));

// Only for dev
// app.get('/', (req,res) => res.send('API running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    // app.use(express.static('client/build'));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname), 'client', 'build','index');
    // });
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
