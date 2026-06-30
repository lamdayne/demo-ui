import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

export const register = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password, phone, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, name, email, phone, role, photo, dob, city, country`,
      [name, email, hashedPassword, phone || null, role || 'user']
    );

    const user = result.rows[0];
    const token = generateToken(user.id, user.email, user.role);

    res.status(201).json({
      success: true,
      message: 'Registered successfully',
      token,
      user
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user.id, user.email, user.role);

    // Remove password hash from response
    delete user.password;

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, dob, city, country, photo, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching profile' });
  }
};

export const updateProfile = async (req, res) => {
  const { name, phone, dob, city, country, photo } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users 
       SET name = COALESCE($1, name),
           phone = COALESCE($2, phone),
           dob = COALESCE($3, dob),
           city = COALESCE($4, city),
           country = COALESCE($5, country),
           photo = COALESCE($6, photo)
       WHERE id = $7
       RETURNING id, name, email, phone, dob, city, country, photo, role`,
      [name, phone, dob, city, country, photo, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Server error updating profile' });
  }
};

export const changePassword = async (req, res) => {
  const { current_password, new_password } = req.body;

  try {
    const userRes = await pool.query('SELECT password FROM users WHERE id = $1', [req.user.id]);
    if (userRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = userRes.rows[0];
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect current password' });
    }

    const hashedNewPassword = await bcrypt.hash(new_password, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedNewPassword, req.user.id]);

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ success: false, message: 'Server error changing password' });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, id DESC',
      [req.user.id]
    );
    res.json({ success: true, addresses: result.rows });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving addresses' });
  }
};

export const addAddress = async (req, res) => {
  const { recipient, street, city, country, phone, is_default, label } = req.body;

  try {
    if (is_default) {
      await pool.query('UPDATE addresses SET is_default = false WHERE user_id = $1', [req.user.id]);
    }

    const result = await pool.query(
      `INSERT INTO addresses (user_id, recipient, street, city, country, phone, is_default, label)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [req.user.id, recipient, street, city, country, phone, is_default || false, label || 'Home']
    );

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      address: result.rows[0]
    });
  } catch (error) {
    console.error('Add address error:', error);
    res.status(500).json({ success: false, message: 'Server error adding address' });
  }
};

export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const { recipient, street, city, country, phone, is_default, label } = req.body;

  try {
    if (is_default) {
      await pool.query('UPDATE addresses SET is_default = false WHERE user_id = $1', [req.user.id]);
    }

    const result = await pool.query(
      `UPDATE addresses 
       SET recipient = COALESCE($1, recipient),
           street = COALESCE($2, street),
           city = COALESCE($3, city),
           country = COALESCE($4, country),
           phone = COALESCE($5, phone),
           is_default = COALESCE($6, is_default),
           label = COALESCE($7, label)
       WHERE id = $8 AND user_id = $9
       RETURNING *`,
      [recipient, street, city, country, phone, is_default, label, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    res.json({
      success: true,
      message: 'Address updated successfully',
      address: result.rows[0]
    });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({ success: false, message: 'Server error updating address' });
  }
};

export const deleteAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM addresses WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    res.json({ success: true, message: 'Address deleted successfully', id });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting address' });
  }
};
