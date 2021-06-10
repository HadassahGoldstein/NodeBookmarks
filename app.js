require('dotenv').config();

const express=require('express');
const api=require('./api');
const {setupAuth} =require('./auth');
const session = require('express-session');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'LITRules!',
    resave: false,
    saveUninitialized: false
}));


app.use((req, res, next) => {
    const original = res.json;
    res.json = function (obj) {
        if (obj) {
            delete obj.PasswordHash;
        }
        original.call(this, obj);
    }
    next();
});

setupAuth(app);

app.use('/api', api);

app.listen(4000, () => console.log('server started'));