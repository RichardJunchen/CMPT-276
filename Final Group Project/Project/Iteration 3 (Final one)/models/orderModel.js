const pool = require("../db/postgresql");

// FUNCTIONS 
// =========

// factor this function out into utils.js, use across model files
async function queryDB(q) {
    const client = await pool.connect()
    let res
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(q)
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res
}


// EXPORT SPECIALIZED QUERIES
// ==========================
const orderModelControls = {

    async getOrderByID(order_id) {
        return await queryDB(`SELECT * FROM orders where order_id = '${order_id}'`)
    },
    async getProductsByOrderID(order_id){
        return await queryDB(`
            SELECT * FROM (order_lines as A INNER JOIN product_details as B ON A.sku_id = B.sku_id)
            INNER JOIN products as C ON C.product_id = B.product_id
            WHERE A.order_id = '${order_id}'`
        )
    },
    async updateNewOrderStatus(order_id, location, request) {
        return await queryDB(`UPDATE orders SET status = 'submitted', date_submitted = NOW(), location = '${location}', request_type = '${request}' WHERE order_id = '${order_id}'`)
    },
    async getOrderByUserID(user_id) {
        return await queryDB(`SELECT order_id FROM orders INNER JOIN users on orders.requester_id = users.user_id where user_id = '${user_id}' and status = 'incomplete'`)
    },
    async getAllOrders() {
        return await queryDB(`SELECT * from orders order by date_submitted`)
    },
    async updateCurrentOrderStatus(order_id, status,fulfiller_id) {
        return await queryDB(`UPDATE orders SET status = '${status}', fulfiller_id = '${fulfiller_id}' WHERE order_id = '${order_id}'`)
    }
}

module.exports = orderModelControls;