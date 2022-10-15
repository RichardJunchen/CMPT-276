// tommy's password ==> lol123
// abiel's password ==> root
// wenqing's password ==> ba13641228671
// Richard's password ==> ljc0000312Li

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'lol123',
  port: 5432,
})

// const { Pool } = require('pg')
// const pool = new Pool({
//    user: 'postgres', 
//    host: 'localhost',
//    database: 'bgc2',
//    password: 'ba13641228671',
//    port: 5432,
//  })

/*const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'iteration2',
  password: 'ljc0000312Li',
  port: 5432,
})*/
module.exports = pool;
