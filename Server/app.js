const express = require('express'), 
    mongoose = require('mongoose'),
    app = express(),
    session = require('express-session'),
    MongoStore = require('connect-mongo'),
    config = require('./config/config'),
    port = config.server.port,
    mainPage = require('./routes/mainPage');

let cors = require('cors');

mongoose.connect('mongodb://localhost:27017/myapp' , { useNewUrlParser: true });



app.use(cors());
app.use('/', mainPage);


app.use(session({
    store: MongoStore.create({
        //mongoUrl: 'mongodb://127.0.0.1/nodeStream',
        mongoUrl: 'mongodb://localhost:27017/myapp', 
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }),
    secret: config.server.secret,
    maxAge : Date().now + (60 * 1000 * 30),
    resave : true,
    saveUninitialized : false,
}));


app.listen(port, () => console.log(`App listening on ${port}!`));
