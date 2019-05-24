//jshint esversion:6
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const expressLayouts = require("express-ejs-layouts");

//<----------------------Routes-------------------------->//
const indexRouter = require('./routes/index');

//This fetches the product model and makes it available here
const Product = require('./models/product');

const app = express();

//Connect to the mongoDb using mongoose
mongoose.connect("mongodb://localhost:27017/shopping", {
    useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


//<----------------------View Engines-------------------------->//
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

//<----------------------Middleware--------------------------->//

//To use express layouts
app.use(expressLayouts);

app.use(bodyParser.urlencoded({
    extended: true
}));

//this tells us that all of our static files are in the public folder
app.use(express.static("public"));

//This tells the root page to use the indexRouter (above)
app.use('/', indexRouter);



// app.get('/', function (req, res) {
//     Product.find({},
//         function (err, foundProducts) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.render('home', {
//                     products: foundProducts
//                 });
//             }
//         }
//     );
// });

app.listen(process.env.PORT || 3000, function () {
    console.log("Server has started successfully!");
});