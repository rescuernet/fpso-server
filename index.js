require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./router/auth-router');
const adminNewsRouter = require('./router/admin/admin-news-router');
const adminCompRouter = require('./router/admin/admin-comp-router');
const adminCalendarPlanRouter = require('./router/admin/admin-calendar-plan-router');
const adminTeamRouter = require('./router/admin/admin-team-router');
const adminRusadaRouter = require('./router/admin/admin-rusada-router');
const adminJudgesRouter = require('./router/admin/admin-judges-router');
const adminOtherRouter = require('./router/admin/admin-other-router');
const adminReferenceBooksRouter = require('./router/admin/admin-reference-books-router');
const adminAboutUsRouter = require('./router/admin/admin-about-us-router');
const uiNewsRouter = require('./router/ui/ui-news-router');
const uiCompRouter = require('./router/ui/ui-comp-router');
const uiCalendarPlanRouter = require('./router/ui/ui-calendar-plan-router');
const uiTeamRouter = require('./router/ui/ui-team-router');
const uiRusadaRouter = require('./router/ui/ui-rusada-router');
const uiJudgesRouter = require('./router/ui/ui-judges-router');
const uiAboutUsRouter = require('./router/ui/ui-about-us-router');
const errorMiddleware = require('./middlewares/error-middleware');
const bodyParser = require("body-parser");
const fs = require("fs");
const Const = require('./const-keys/const')

const PORT = Const.SERVER_PORT || 5000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('static'));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin: Const.CLIENT_URL
}));
app.use('/api', authRouter);
app.use('/api', adminNewsRouter);
app.use('/api', adminCompRouter);
app.use('/api', adminCalendarPlanRouter);
app.use('/api', adminTeamRouter);
app.use('/api', adminRusadaRouter);
app.use('/api', adminJudgesRouter);
app.use('/api', adminOtherRouter);
app.use('/api', adminReferenceBooksRouter);
app.use('/api', adminAboutUsRouter);
app.use('/api', uiNewsRouter);
app.use('/api', uiCompRouter);
app.use('/api', uiCalendarPlanRouter);
app.use('/api', uiTeamRouter);
app.use('/api', uiRusadaRouter);
app.use('/api', uiJudgesRouter);
app.use('/api', uiAboutUsRouter);

app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(Const.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT,() => {
            console.log(`Server started on port ${PORT}`)
        });
    } catch (e) {
        console.log(e);
    }
}

start();