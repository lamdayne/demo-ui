import pool from '../config/db.js';

export const getProducts = async (req, res) => {
  const { category, search } = req.query;

  try {
    let queryText = `
      SELECT p.*, pr.name as producer_name, pr.location as producer_location 
      FROM products p
      LEFT JOIN producers pr ON p.producer_id = pr.id
    `;
    const queryParams = [];

    const conditions = [];
    if (category) {
      queryParams.push(category);
      conditions.push(`p.category = $${queryParams.length}`);
    }

    if (search) {
      queryParams.push(`%${search}%`);
      conditions.push(`(p.name ILIKE $${queryParams.length} OR p.description ILIKE $${queryParams.length})`);
    }

    if (conditions.length > 0) {
      queryText += ' WHERE ' + conditions.join(' AND ');
    }

    queryText += ' ORDER BY p.id DESC';

    const result = await pool.query(queryText, queryParams);
    res.json({ success: true, products: result.rows });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving products' });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const productResult = await pool.query(
      `SELECT p.*, pr.name as producer_name, pr.location as producer_location, pr.description as producer_description, pr.image_url as producer_image 
       FROM products p
       LEFT JOIN producers pr ON p.producer_id = pr.id
       WHERE p.id = $1`,
      [id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const product = productResult.rows[0];

    // Fetch batches associated with this product
    const batchesResult = await pool.query(
      'SELECT * FROM batches WHERE product_id = $1 ORDER BY harvest_date DESC',
      [id]
    );

    product.batches = batchesResult.rows;

    res.json({ success: true, product });
  } catch (error) {
    console.error('Get product details error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving product details' });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, category, image_url, specifications } = req.body;

  try {
    // If producer, get their producer record
    let producerId = null;
    if (req.user.role === 'producer') {
      const producerRes = await pool.query('SELECT id FROM producers WHERE user_id = $1', [req.user.id]);
      if (producerRes.rows.length > 0) {
        producerId = producerRes.rows[0].id;
      } else {
        return res.status(400).json({ success: false, message: 'Producer account not fully onboarded yet' });
      }
    } else if (req.body.producer_id) {
      // Admin can specify producer id
      producerId = req.body.producer_id;
    }

    const result = await pool.query(
      `INSERT INTO products (producer_id, name, description, price, category, image_url, specifications)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [producerId, name, description, price, category, image_url, JSON.stringify(specifications || {})]
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: result.rows[0]
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ success: false, message: 'Server error creating product' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Check ownership if user is producer
    if (req.user.role === 'producer') {
      const productCheck = await pool.query(
        `SELECT p.id FROM products p 
         JOIN producers pr ON p.producer_id = pr.id 
         WHERE p.id = $1 AND pr.user_id = $2`,
        [id, req.user.id]
      );
      if (productCheck.rows.length === 0) {
        return res.status(403).json({ success: false, message: 'Not authorized to delete this product' });
      }
    }

    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully', id });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting product' });
  }
};
