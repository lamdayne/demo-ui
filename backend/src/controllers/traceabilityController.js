import pool from '../config/db.js';

export const getBatchById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT b.*, p.name as product_name, p.image_url as product_image, p.price as product_price, 
              pr.name as producer_name, pr.location as producer_location, pr.image_url as producer_image 
       FROM batches b
       JOIN products p ON b.product_id = p.id
       LEFT JOIN producers pr ON p.producer_id = pr.id
       WHERE b.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Batch not found. Please verify the Batch ID.' });
    }

    res.json({ success: true, batch: result.rows[0] });
  } catch (error) {
    console.error('Get batch details error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving batch traceability details' });
  }
};

export const createBatch = async (req, res) => {
  const { id, product_id, harvest_date, location, species_source, status, water_content, hmf_content, diastase_activity, adulteration_test } = req.body;

  try {
    // If producer, verify they own the product
    if (req.user.role === 'producer') {
      const productCheck = await pool.query(
        `SELECT p.id FROM products p 
         JOIN producers pr ON p.producer_id = pr.id 
         WHERE p.id = $1 AND pr.user_id = $2`,
        [product_id, req.user.id]
      );
      if (productCheck.rows.length === 0) {
        return res.status(403).json({ success: false, message: 'Not authorized to create batches for this product' });
      }
    }

    const checkBatch = await pool.query('SELECT id FROM batches WHERE id = $1', [id]);
    if (checkBatch.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Batch ID already exists' });
    }

    const result = await pool.query(
      `INSERT INTO batches (id, product_id, harvest_date, location, species_source, status, water_content, hmf_content, diastase_activity, adulteration_test)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [id, product_id, harvest_date, location, species_source, status || 'Verified', water_content || null, hmf_content || null, diastase_activity || null, adulteration_test || 'Negative / Pure']
    );

    res.status(201).json({
      success: true,
      message: 'Traceability batch record created successfully',
      batch: result.rows[0]
    });
  } catch (error) {
    console.error('Create batch error:', error);
    res.status(500).json({ success: false, message: 'Server error creating batch record' });
  }
};
