const pool = require('../config/dbConfig');

class Order {
    static async create(total) {
        const [result] = await pool.query('INSERT INTO orders (total) VALUES (?)', [total]);
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM orders');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, data) {
        const [result] = await pool.query('UPDATE orders SET ? WHERE id = ?', [data, id]);
        if (result.affectedRows === 0) {
            throw new Error('Order not found');
        }
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM orders WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error('Order not found');
        }
    }
}

module.exports = Order;
