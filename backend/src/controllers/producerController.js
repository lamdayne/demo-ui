import pool from '../config/db.js';

export const getProducers = async (req, res) => {
  const { location } = req.query;

  try {
    let queryText = 'SELECT * FROM producers';
    const queryParams = [];

    if (location) {
      queryParams.push(`%${location}%`);
      queryText += ' WHERE location ILIKE $1';
    }

    queryText += ' ORDER BY id DESC';

    const result = await pool.query(queryText, queryParams);
    res.json({ success: true, producers: result.rows });
  } catch (error) {
    console.error('Get producers error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving producers' });
  }
};

export const getProducerById = async (req, res) => {
  const { id } = req.params;

  try {
    const producerRes = await pool.query('SELECT * FROM producers WHERE id = $1', [id]);
    if (producerRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Producer not found' });
    }

    const producer = producerRes.rows[0];

    // Fetch products belonging to this producer
    const productsRes = await pool.query('SELECT * FROM products WHERE producer_id = $1 ORDER BY id DESC', [id]);
    producer.products = productsRes.rows;

    res.json({ success: true, producer });
  } catch (error) {
    console.error('Get producer detail error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving producer details' });
  }
};

export const onboardProducer = async (req, res) => {
  const { name, location, description, history, image_url } = req.body;

  try {
    // Check if user is already onboarded as a producer
    const checkRes = await pool.query('SELECT * FROM producers WHERE user_id = $1', [req.user.id]);
    if (checkRes.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User is already onboarded as a producer', producer: checkRes.rows[0] });
    }

    // Insert new producer
    const result = await pool.query(
      `INSERT INTO producers (user_id, name, location, description, history, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [req.user.id, name, location, description, history, image_url]
    );

    // Update user role to producer
    await pool.query("UPDATE users SET role = 'producer' WHERE id = $1", [req.user.id]);

    res.status(201).json({
      success: true,
      message: 'Producer onboarded successfully',
      producer: result.rows[0]
    });
  } catch (error) {
    console.error('Onboard producer error:', error);
    res.status(500).json({ success: false, message: 'Server error during producer onboarding' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const producerRes = await pool.query('SELECT id FROM producers WHERE user_id = $1', [req.user.id]);
    if (producerRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Producer profile not found for this account' });
    }
    const producerId = producerRes.rows[0].id;

    // Active products count
    const productsCountRes = await pool.query('SELECT COUNT(*) FROM products WHERE producer_id = $1', [producerId]);
    const activeProducts = parseInt(productsCountRes.rows[0].count);

    // Active batches count
    const batchesCountRes = await pool.query(
      'SELECT COUNT(*) FROM batches b JOIN products p ON b.product_id = p.id WHERE p.producer_id = $1',
      [producerId]
    );
    const activeBatches = parseInt(batchesCountRes.rows[0].count);

    // Revenue and order counts
    const salesRes = await pool.query(
      `SELECT COALESCE(SUM(oi.price * oi.quantity), 0) as total_sales, 
              COUNT(DISTINCT oi.order_id) as total_orders
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE p.producer_id = $1`,
      [producerId]
    );
    const totalSales = parseFloat(salesRes.rows[0].total_sales);
    const totalOrders = parseInt(salesRes.rows[0].total_orders);

    // Recent items sold
    const recentOrdersRes = await pool.query(
      `SELECT oi.id, o.id as order_id, o.status, o.created_at, p.name as product_name, 
              oi.quantity, oi.price, u.name as customer_name
       FROM order_items oi
       JOIN orders o ON oi.order_id = o.id
       JOIN products p ON oi.product_id = p.id
       JOIN users u ON o.user_id = u.id
       WHERE p.producer_id = $1
       ORDER BY o.created_at DESC
       LIMIT 5`,
      [producerId]
    );

    // Chart representation
    const salesChartData = [
      { label: 'Jan', value: Math.round(totalSales * 0.15) },
      { label: 'Feb', value: Math.round(totalSales * 0.20) },
      { label: 'Mar', value: Math.round(totalSales * 0.10) },
      { label: 'Apr', value: Math.round(totalSales * 0.25) },
      { label: 'May', value: Math.round(totalSales * 0.30) },
      { label: 'Jun', value: totalSales }
    ];

    res.json({
      success: true,
      stats: {
        totalSales,
        totalOrders,
        activeProducts,
        activeBatches,
        recentOrders: recentOrdersRes.rows,
        salesChartData
      }
    });
  } catch (error) {
    console.error('Get producer dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving dashboard statistics' });
  }
};

export const updateProducerProfile = async (req, res) => {
  const { name, location, description, history, image_url } = req.body;

  try {
    const result = await pool.query(
      `UPDATE producers 
       SET name = $1, location = $2, description = $3, history = $4, image_url = $5
       WHERE user_id = $6
       RETURNING *`,
      [name, location, description, history, image_url, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Producer profile not found' });
    }

    res.json({
      success: true,
      message: 'Producer profile updated successfully',
      producer: result.rows[0]
    });
  } catch (error) {
    console.error('Update producer profile error:', error);
    res.status(500).json({ success: false, message: 'Server error updating producer profile' });
  }
};
