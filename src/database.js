const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(database);

pool.getConnection((error, connection)=>{
    if (error){
        throw error;
    }
    connection.release();
    console.log('Dabase is conect');
    return;
})

pool.query = promisify(pool.query);

module.exports = pool;
