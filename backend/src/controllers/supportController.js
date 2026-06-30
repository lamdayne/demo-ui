import pool from '../config/db.js';

export const createTicket = async (req, res) => {
  const { name, email, subject, message, category } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO support_tickets (name, email, subject, message, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, subject || 'General Query', message, category || 'General']
    );

    res.status(201).json({
      success: true,
      message: 'Support ticket submitted successfully. We will contact you soon.',
      ticket: result.rows[0]
    });
  } catch (error) {
    console.error('Create support ticket error:', error);
    res.status(500).json({ success: false, message: 'Server error submitting support ticket' });
  }
};
