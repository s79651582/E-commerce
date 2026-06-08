const mongoose = require("mongoose");

// DB connection
const dbConnection = ()=>{
    mongoose.connect( process.env.DB_URL ).then( (conn)=>{
        console.log( `Database connection: ${conn.connection.host}` );
    });
    /*
    .catch( (err)=>{
        console.error( `Database error: ${err}` );
        process.exit(1);
    });
    */
}

module.exports = dbConnection;