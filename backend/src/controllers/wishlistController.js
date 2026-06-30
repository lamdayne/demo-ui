import pool from '../config/db.js';

export const getWishlist = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT w.id as wishlist_item_id, p.*, pr.name as producer_name 
       FROM wishlists w
       JOIN products p ON w.product_id = p.id
       LEFT JOIN producers pr ON p.producer_id = pr.id
       WHERE w.user_id = $1
       ORDER BY w.created_at DESC`,
      [req.user.id]
    );

    res.json({ success: true, wishlist: result.rows });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving wishlist' });
  }
};

export const addToWishlist = async (req, res) => {
  const { product_id } = req.body;

  if (!product_id) {
    return res.status(400).json({ success: false, message: 'Product ID is required' });
  }

  try {
    // Check if already in wishlist
    const checkRes = await pool.query(
      'SELECT id FROM wishlists WHERE user_id = $1 AND product_id = $2',
      [req.user.id, product_id]
    );

    if (checkRes.rows.length > 0) {
      return res.status(200).json({ success: true, message: 'Product is already in wishlist' });
    }

    const result = await pool.query(
      `INSERT INTO wishlists (user_id, product_id)
       VALUES ($1, $2)
       RETURNING *`,
      [req.user.id, product_id]
    );

    res.status(201).json({
      success: true,
      message: 'Added to wishlist successfully',
      wishlist_item: result.rows[0]
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ success: false, message: 'Server error adding to wishlist' });
  }
};

export const removeFromWishlist = async (req, res) => {
  const { id } = req.params; // product_id

  try {
    const result = await pool.query(
      'DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2 RETURNING *',
      [req.user.id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found in wishlist' });
    }

    res.json({ success: true, message: 'Removed from wishlist successfully', product_id: id });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ success: false, message: 'Server error removing from wishlist' });
  }
};
