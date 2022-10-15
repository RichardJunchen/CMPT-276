const { query } = require('express');
const pg = require('../db/postgresql');

const userModelControls = {
    getUserRole : (email) => {
    console.log(email);
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * from users WHERE email = '${email}'`)
            .then((res, err) => {
            if (err) {
                reject(err);
            }
            console.log(res.rows);
            resolve(res.rows);
        });
    });
    },

    async getAlluser(){
        return await pg.query(`SELECT * FROM users`)
    },
    async getUserByID(user_id) {
        return await pg.query(`SELECT * FROM users where user_id = '${user_id}'`);
    },
    async getUserByEmail(email) {
        return await pg.query(`SELECT * FROM users where email = '${email}'`);
    }
}
module.exports = userModelControls;