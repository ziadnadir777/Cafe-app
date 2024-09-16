const pool = require('../config/dbConfig');

class Zone {
    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM zones WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Zone;
