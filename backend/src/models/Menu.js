const pool = require('../config/dbConfig');

class Menu {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM menu');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM menu WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const result = await pool.query('INSERT INTO menu SET ?', data);
    return result[0].insertId;
  }

  static async update(id, data) {
    await pool.query('UPDATE menu SET ? WHERE id = ?', [data, id]);
  }

  static async delete(id) {
    await pool.query('DELETE FROM menu WHERE id = ?', [id]);
  }
}

module.exports = Menu;
