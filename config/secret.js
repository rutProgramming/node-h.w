require('dotenv').config();

exports.config = {
    userDb: process.env.USER_DB,
    db_connection: process.env.DB_CONNECTION,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    
};