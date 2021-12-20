require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./router/auth-router');
const adminNewsRouter = require('./router/admin/admin-news-router');
const adminCompRouter = require('./router/admin/admin-comp-router');
const adminOtherRouter = require('./router/admin/admin-other-router');
const uiNewsRouter = require('./router/ui/ui-news-router');
const uiCompRouter = require('./router/ui/ui-comp-router');
const errorMiddleware = require('./middlewares/error-middleware');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('static'));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL
}));
app.use('/api', authRouter);
app.use('/api', adminNewsRouter);
app.use('/api', adminCompRouter);
app.use('/api', adminOtherRouter);
app.use('/api', uiNewsRouter);
app.use('/api', uiCompRouter);

app.use(errorMiddleware);


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT,() => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();