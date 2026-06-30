import pool from '../config/db.js';

export const createOrder = async (req, res) => {
  const { total_price, shipping_address, payment_method, transaction_id, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'No items in order' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Insert into orders table
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_price, status, shipping_address, payment_method, transaction_id)
       VALUES ($1, $2, 'Pending', $3, $4, $5)
       RETURNING *`,
      [req.user.id, total_price, JSON.stringify(shipping_address), payment_method, transaction_id || null]
    );

    const order = orderResult.rows[0];

    // 2. Insert items into order_items table
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, batch_id, quantity, price)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, item.product_id, item.batch_id || null, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error placing order' });
  } finally {
    client.release();
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const ordersResult = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC',
      [req.user.id]
    );

    const orders = ordersResult.rows;

    // Fetch items for each order
    for (const order of orders) {
      const itemsResult = await pool.query(
        `SELECT oi.*, p.name as product_name, p.image_url as product_image, p.category as product_category 
         FROM order_items oi
         LEFT JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [order.id]
      );
      order.items = itemsResult.rows;
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving orders' });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const order = orderResult.rows[0];

    const itemsResult = await pool.query(
      `SELECT oi.*, p.name as product_name, p.image_url as product_image, p.category as product_category, pr.name as producer_name
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       LEFT JOIN producers pr ON p.producer_id = pr.id
       WHERE oi.order_id = $1`,
      [id]
    );

    order.items = itemsResult.rows;

    res.json({ success: true, order });
  } catch (error) {
    console.error('Get order details error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving order details' });
  }
};
