require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
bodyParser = require('body-parser');
const port = process.env.PORT || 4000; 
const path = require('path');
var cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useFindAndModify: false,
  useCreateIndex: true
})

// setting access api from
// var corsOptions = {
//   origin: "http://localhost:3000"
// };

global.__basedir = __dirname;
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log("connected to database"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(cors()) 


var routeAdminAccount = require('./api/route/AdminAccountRoute');
var routeAdminBillProduct = require('./api/route/AdminBillProductRoute')
var routeAdminBillRoute = require('./api/route/AdminBillRoute')
var routeAdminCategoryRoute = require('./api/route/AdminCategoryRoute')
var routeAdminCommentRoute = require('./api/route/AdminCommentRoute')
var routeAdminCouponRoute = require('./api/route/AdminCouponRoute')
var routeAdminProductRoute = require('./api/route/AdminProductRoute')
var routeAdminReviewRoute = require('./api/route/AdminReviewRoute')
var routeAdminUserRoute = require('./api/route/AdminUserRoute')
var routeClientRoute = require('./api/route/ClientRoute')
var routeCommonRoute = require('./api/route/CommonRoute')
var routeMemberRoute = require('./api/route/MemberRoute')
routeAdminBillProduct(app)
routeAdminAccount(app)
routeAdminBillRoute(app)
routeAdminCategoryRoute(app)
routeAdminCommentRoute(app)
routeAdminCouponRoute(app)
routeAdminProductRoute(app)
routeAdminReviewRoute(app)
routeAdminUserRoute(app)
routeClientRoute(app)
routeCommonRoute(app)
routeMemberRoute(app)

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port, () => console.log("server started in port "+port))