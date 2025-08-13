require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

app.use(express.json());

app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products WHERE is_deleted = 0';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send('เกิดข้อผิดพลาด');
    res.json(results);
  });
});

app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ? AND is_deleted = 0';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send('เกิดข้อผิดพลาด');
    res.json(results[0] || {});
  });
});

// ค้นหาสินค้าตามคำค้น
app.get('/products/search/:keyword', (req, res) => {
  const keyword = `%${req.params.keyword}%`;
  const sql = 'SELECT * FROM products WHERE name LIKE ? AND is_deleted = 0';
  db.query(sql, [keyword], (err, results) => {
    if (err) return res.status(500).send('เกิดข้อผิดพลาด');
    res.json(results);
  });
});

app.post('/products', (req, res) => {
    const { name, price, discount, review_count, image_url } = req.body;
    db.query('INSERT INTO products (name, price, discount, review_count, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, price, discount, review_count, image_url],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, massage: 'Product created successfully' });
      }
    );
})

app.put('/products/:id', (req, res) => {
  const { name, price, discount, review_count, image_url } = req.body;
  db.query(
    'UPDATE products SET name = ?, price = ?, discount = ?, review_count = ?, image_url = ? WHERE id = ?',
    [name, price, discount, review_count, image_url, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Product update'});
    }
  );
});

app.delete('/products/:id', (req, res) => {
  db.query(
    'UPDATE products SET is_deleted = 1 WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Product soft-deleted' });
    }
  );
});

app.put('/products/restore/:id', (req, res) => {
  db.query(
    'UPDATE products SET is_deleted = 0 WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Product restored'});
    }
  );
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
