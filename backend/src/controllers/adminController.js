import pool from '../config/db.js';

// Get admin dashboard stats
export const getAdminStats = async (req, res) => {
  try {
    const usersCount = await pool.query("SELECT COUNT(*) FROM users");
    const producersCount = await pool.query("SELECT COUNT(*) FROM producers");
    const productsCount = await pool.query("SELECT COUNT(*) FROM products");
    const ordersCount = await pool.query("SELECT COUNT(*) FROM orders");
    const revenueSum = await pool.query("SELECT SUM(total_price) FROM orders WHERE status != 'Cancelled'");

    // Daily registrations in the past 7 days
    const dailyUsersRes = await pool.query(`
      SELECT TO_CHAR(created_at, 'YYYY-MM-DD') as date, COUNT(*)::integer as count
      FROM users
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY TO_CHAR(created_at, 'YYYY-MM-DD')
      ORDER BY date ASC
    `);

    // Daily orders in the past 7 days
    const dailyOrdersRes = await pool.query(`
      SELECT TO_CHAR(created_at, 'YYYY-MM-DD') as date, COUNT(*)::integer as count
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY TO_CHAR(created_at, 'YYYY-MM-DD')
      ORDER BY date ASC
    `);

    res.json({
      success: true,
      stats: {
        totalUsers: parseInt(usersCount.rows[0].count),
        totalProducers: parseInt(producersCount.rows[0].count),
        totalProducts: parseInt(productsCount.rows[0].count),
        totalOrders: parseInt(ordersCount.rows[0].count),
        totalRevenue: parseFloat(revenueSum.rows[0].sum || 0),
        dailyUsers: dailyUsersRes.rows,
        dailyOrders: dailyOrdersRes.rows
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving stats' });
  }
};

// Users management
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, phone, city, country, role, created_at FROM users ORDER BY id DESC");
    res.json({ success: true, users: result.rows });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving users' });
  }
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const result = await pool.query("UPDATE users SET role = $1 WHERE id = $2 RETURNING id, role", [role, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User role updated successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ success: false, message: 'Server error updating user role' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully', id });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting user' });
  }
};

// Producers management
export const getProducers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.email as user_email, u.phone as user_phone 
      FROM producers p
      LEFT JOIN users u ON p.user_id = u.id
      ORDER BY p.id DESC
    `);
    res.json({ success: true, producers: result.rows });
  } catch (error) {
    console.error('Get producers error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving producers' });
  }
};

export const verifyProducer = async (req, res) => {
  const { id } = req.params;
  const { verified } = req.body;
  try {
    const result = await pool.query("UPDATE producers SET verified = $1 WHERE id = $2 RETURNING *", [verified, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Producer not found' });
    }
    res.json({ success: true, message: 'Producer status updated', producer: result.rows[0] });
  } catch (error) {
    console.error('Verify producer error:', error);
    res.status(500).json({ success: false, message: 'Server error updating producer verification' });
  }
};

// Orders management
export const getOrders = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*, u.name as user_name, u.email as user_email 
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);
    
    // Fetch items for each order
    const orders = result.rows;
    for (let order of orders) {
      const itemsResult = await pool.query(`
        SELECT oi.*, p.name as product_name, p.image_url 
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = $1
      `, [order.id]);
      order.items = itemsResult.rows;
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query("UPDATE orders SET status = $1 WHERE id = $2 RETURNING *", [status, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, message: 'Order status updated', order: result.rows[0] });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ success: false, message: 'Server error updating order status' });
  }
};

// Coupons management
export const getCoupons = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM coupons ORDER BY created_at DESC");
    res.json({ success: true, coupons: result.rows });
  } catch (error) {
    console.error('Get coupons error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving coupons' });
  }
};

export const createCoupon = async (req, res) => {
  const { code, discount_type, discount_value, min_order_value } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO coupons (code, discount_type, discount_value, min_order_value)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [code.toUpperCase(), discount_type, discount_value, min_order_value || 0]
    );
    res.status(201).json({ success: true, message: 'Coupon created successfully', coupon: result.rows[0] });
  } catch (error) {
    console.error('Create coupon error:', error);
    if (error.code === '23505') {
      return res.status(400).json({ success: false, message: 'Coupon code already exists' });
    }
    res.status(500).json({ success: false, message: 'Server error creating coupon' });
  }
};

export const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM coupons WHERE id = $1 RETURNING id", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    res.json({ success: true, message: 'Coupon deleted successfully', id });
  } catch (error) {
    console.error('Delete coupon error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting coupon' });
  }
};

// Validate coupon (public/user action)
export const validateCoupon = async (req, res) => {
  const { code } = req.params;
  const { order_value } = req.query;
  try {
    const result = await pool.query("SELECT * FROM coupons WHERE code = $1 AND active = true", [code.toUpperCase()]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Invalid or inactive discount code' });
    }
    const coupon = result.rows[0];
    if (order_value && parseFloat(order_value) < parseFloat(coupon.min_order_value)) {
      return res.status(400).json({ 
        success: false, 
        message: `This coupon requires a minimum order value of ${parseFloat(coupon.min_order_value).toLocaleString()} VND` 
      });
    }
    res.json({ success: true, coupon });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({ success: false, message: 'Server error validating coupon' });
  }
};
