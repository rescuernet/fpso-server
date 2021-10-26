require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./router/auth-router');
const adminRouter = require('./router/admin-router');
const auiRouter = require('./router/ui-router');
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
app.use('/api', adminRouter);
app.use('/api', uiRouter);
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