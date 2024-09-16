// src/models/User.js
const pool = require('../config/dbConfig');

class User {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM users');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(username, email, password, role = 'waiter') {  // Default role is 'waiter'
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role]
    );
    return result;
  }
}

module.exports = User;
