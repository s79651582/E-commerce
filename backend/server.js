const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require('cors');
const dbConnection = require("./config/database");
const ApiError = require("./utility/apiError");
const globalError = require("./midelewares/errorMidleware");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

dotenv.config( {path: 'config.env'} );

const app = express();

app.set('query parser', 'extended');


// connection with DB
dbConnection();


// connect front-end to backend
//app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// بدلاً من app.options('*', cors());
// 2. حل مشكلة الـ Preflight بدون استخدام النجمة التي تسبب الخطأ
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
});


// Middelwares
app.use( express.json() );
app.use( express.static( path.join(__dirname , 'uploads') ) );

if(process.env.NODE_ENV === 'development'){
    app.use( morgan("dev") );
    console.log( `mode: ${process.env.NODE_ENV}` );   // print requistes and responses on server
}


// Routes
app.use('/api/v1/categories' , categoryRoute);
app.use('/api/v1/subcategories' , subCategoryRoute);
app.use('/api/v1/brands' , brandRoute);
app.use('/api/v1/products' , productRoute);
app.use('/api/v1/users' , userRoute);
app.use('/api/v1/auth' , authRoute);


// error in url ('/api/v1/categories')
app.use( (req , res , next)=>{
  // create error
  //const errors = new Error(`Can't find this route: ${req.originalUrl}`);
  //errors.statusCode = 404;
  //next( errors );  // send errors.message to next function (global error handling mideleware)

  next( new ApiError(`message: Can't find this route: ${req.originalUrl}` , 400) );
});


// global error handling mideleware (within express)
app.use( globalError );


const PORT = process.env.PORT  || 8000 ;
app.listen( PORT , ()=>{
    console.log('app running');
})


// global error handling mideleware (without express -> as error in DB connection)
// lestener(  'event type '     ,  callback function() )
process.on('unhandledRejection' , (err)=>{
    console.error( `unhandledRejection Error: ${err.name} | ${err.message}` );
    // 1.close server (to excution all processes)
    server.close( ()=>{
        console.error('Shutting down......');

        // 2.close app (stop runnig app)
        process.exit(1);
    })
});