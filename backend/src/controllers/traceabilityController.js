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

export const getBatches = async (req, res) => {
  try {
    let queryText = `
      SELECT b.*, p.name as product_name, p.image_url as product_image
      FROM batches b
      JOIN products p ON b.product_id = p.id
    `;
    const queryParams = [];

    // If user is producer, restrict to their products
    if (req.user && req.user.role === 'producer') {
      const producerRes = await pool.query('SELECT id FROM producers WHERE user_id = $1', [req.user.id]);
      if (producerRes.rows.length === 0) {
        return res.json({ success: true, batches: [] });
      }
      queryParams.push(producerRes.rows[0].id);
      queryText += ` WHERE p.producer_id = $${queryParams.length}`;
    } else if (req.query.producer_id) {
      queryParams.push(req.query.producer_id);
      queryText += ` WHERE p.producer_id = $${queryParams.length}`;
    }

    queryText += ' ORDER BY b.harvest_date DESC';

    const result = await pool.query(queryText, queryParams);
    res.json({ success: true, batches: result.rows });
  } catch (error) {
    console.error('Get batches error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving batch list' });
  }
};

export const updateBatch = async (req, res) => {
  const { id } = req.params;
  const { harvest_date, location, species_source, status, water_content, hmf_content, diastase_activity, adulteration_test } = req.body;

  try {
    // If producer, verify ownership
    if (req.user.role === 'producer') {
      const checkRes = await pool.query(
        `SELECT b.id FROM batches b 
         JOIN products p ON b.product_id = p.id
         JOIN producers pr ON p.producer_id = pr.id
         WHERE b.id = $1 AND pr.user_id = $2`,
        [id, req.user.id]
      );
      if (checkRes.rows.length === 0) {
        return res.status(403).json({ success: false, message: 'Not authorized to update this batch' });
      }
    }

    const result = await pool.query(
      `UPDATE batches 
       SET harvest_date = $1, location = $2, species_source = $3, status = $4, 
           water_content = $5, hmf_content = $6, diastase_activity = $7, adulteration_test = $8
       WHERE id = $9
       RETURNING *`,
      [harvest_date, location, species_source, status, water_content || null, hmf_content || null, diastase_activity || null, adulteration_test, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Batch not found' });
    }

    res.json({ success: true, message: 'Batch updated successfully', batch: result.rows[0] });
  } catch (error) {
    console.error('Update batch error:', error);
    res.status(500).json({ success: false, message: 'Server error updating batch' });
  }
};

export const deleteBatch = async (req, res) => {
  const { id } = req.params;

  try {
    // If producer, verify ownership
    if (req.user.role === 'producer') {
      const checkRes = await pool.query(
        `SELECT b.id FROM batches b 
         JOIN products p ON b.product_id = p.id
         JOIN producers pr ON p.producer_id = pr.id
         WHERE b.id = $1 AND pr.user_id = $2`,
        [id, req.user.id]
      );
      if (checkRes.rows.length === 0) {
        return res.status(403).json({ success: false, message: 'Not authorized to delete this batch' });
      }
    }

    const result = await pool.query('DELETE FROM batches WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Batch not found' });
    }

    res.json({ success: true, message: 'Batch deleted successfully', id });
  } catch (error) {
    console.error('Delete batch error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting batch' });
  }
};
