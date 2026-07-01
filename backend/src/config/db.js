import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

export const initDb = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Create Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        dob VARCHAR(20),
        city VARCHAR(100),
        country VARCHAR(100),
        photo VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Create Producers Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS producers (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        name VARCHAR(100) NOT NULL,
        location VARCHAR(255),
        description TEXT,
        history TEXT,
        image_url VARCHAR(255),
        verified BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Create Products Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        producer_id INTEGER REFERENCES producers(id) ON DELETE SET NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(12, 2) NOT NULL,
        category VARCHAR(50),
        image_url VARCHAR(255),
        rating DECIMAL(3,2) DEFAULT 5.0,
        reviews_count INTEGER DEFAULT 0,
        specifications JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Create Batches Table (Traceability)
    await client.query(`
      CREATE TABLE IF NOT EXISTS batches (
        id VARCHAR(50) PRIMARY KEY,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        harvest_date DATE,
        location VARCHAR(255),
        species_source VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Verified',
        lab_report_url VARCHAR(255),
        water_content DECIMAL(4,2),
        hmf_content DECIMAL(5,2),
        diastase_activity DECIMAL(4,2),
        adulteration_test VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 5. Create Orders Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        total_price DECIMAL(12,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        shipping_address JSONB,
        payment_method VARCHAR(50),
        transaction_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 6. Create Order Items Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
        batch_id VARCHAR(50) REFERENCES batches(id) ON DELETE SET NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL(12,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Create Wishlist Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS wishlists (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id)
      )
    `);

    // 8. Create Addresses Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        recipient VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        is_default BOOLEAN DEFAULT FALSE,
        label VARCHAR(50) DEFAULT 'Home',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 9. Create Support Tickets Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS support_tickets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        subject VARCHAR(150),
        message TEXT NOT NULL,
        category VARCHAR(50) DEFAULT 'General',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 10. Create Notifications Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(150) NOT NULL,
        content TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed default users if users table is empty
    const usersCount = await client.query('SELECT COUNT(*) FROM users');
    if (parseInt(usersCount.rows[0].count) === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      // Default User
      const userRes = await client.query(`
        INSERT INTO users (name, email, password, phone, dob, city, country, role)
        VALUES ('Nguyen Van An', 'an.nguyen@example.demo', $1, '+84 912 345 678', '15/08/1988', 'Ho Chi Minh City', 'Vietnam', 'user')
        RETURNING id
      `, [hashedPassword]);

      const mainUserId = userRes.rows[0].id;

      // Default Producer User
      const prodUserRes = await client.query(`
        INSERT INTO users (name, email, password, phone, dob, city, country, role)
        VALUES ('U Minh Bee Farm Manager', 'producer@example.demo', $1, '+84 987 654 321', '01/01/1980', 'Ca Mau', 'Vietnam', 'producer')
        RETURNING id
      `, [hashedPassword]);

      const producerUserId = prodUserRes.rows[0].id;

      // Seed default producers
      const prodRes = await client.query(`
        INSERT INTO producers (user_id, name, location, description, history, image_url)
        VALUES (
          $1, 
          'U Minh Bee Farm', 
          'U Minh Biosphere Wetlands, Ca Mau, Vietnam', 
          'Cooperative bee farm producing organic wild-foraged forest honey.', 
          'Established in 2012 by Ca Mau local bee hunters to build stable livelihoods while preserving Ca Mau ecosystems.', 
          'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=400'
        )
        RETURNING id
      `, [producerUserId]);

      const farmProducerId = prodRes.rows[0].id;

      const coopRes = await client.query(`
        INSERT INTO producers (name, location, description, history, image_url)
        VALUES (
          'Ben Tre Fruit Co-op', 
          'Mo Cay Nam, Ben Tre, Vietnam', 
          'Community agricultural group certified for GAP-compliant pomelo harvesting.', 
          'Formed in 2015 with over 45 family farms practicing chemical-free farming.', 
          'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=400'
        )
        RETURNING id
      `);

      const riceRes = await client.query(`
        INSERT INTO producers (name, location, description, history, image_url)
        VALUES (
          'Soc Trang Rice Co-op', 
          'My Xuyen, Soc Trang, Vietnam', 
          'Award winning cooperative for ST25 high purity grain standard.', 
          'Dedicated to low-irrigation techniques and clean delta soil management.', 
          'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400'
        )
        RETURNING id
      `);

      // Seed default products
      const p1 = await client.query(`
        INSERT INTO products (producer_id, name, description, price, category, image_url, rating, reviews_count, specifications)
        VALUES (
          $1,
          'U Minh Forest Wild Honey 500 ml',
          'Sourced from the deep biosphere reserve of U Minh. Mellow floral notes and high purity testing.',
          229000,
          'Honey',
          'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=300',
          4.8,
          128,
          '{"size": "500 ml", "origin": "Ca Mau", "packaging": "Glass Jar"}'::jsonb
        )
        RETURNING id
      `, [farmProducerId]);

      const p2 = await client.query(`
        INSERT INTO products (producer_id, name, description, price, category, image_url, rating, reviews_count, specifications)
        VALUES (
          $1,
          'ST25 Premium Rice 2 kg',
          'Premium fragrant rice from Soc Trang, awarded worlds best rice standard.',
          139000,
          'Rice',
          'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300',
          4.9,
          94,
          '{"weight": "2 kg", "origin": "Soc Trang", "packaging": "Vacuum Pack"}'::jsonb
        )
        RETURNING id
      `, [riceRes.rows[0].id]);

      const p3 = await client.query(`
        INSERT INTO products (producer_id, name, description, price, category, image_url, rating, reviews_count, specifications)
        VALUES (
          $1,
          'Ben Tre Green Pomelo 1 kg',
          'Juicy, pink-fleshed green pomelo grown organic-GAP compliant.',
          79000,
          'Fruit',
          'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=300',
          4.6,
          45,
          '{"weight": "1 kg", "origin": "Ben Tre", "packaging": "Net Bag"}'::jsonb
        )
        RETURNING id
      `, [coopRes.rows[0].id]);

      // Seed default batches for traceability
      await client.query(`
        INSERT INTO batches (id, product_id, harvest_date, location, species_source, status, water_content, hmf_content, diastase_activity, adulteration_test)
        VALUES (
          'LOT-UMH-2605-001',
          $1,
          '2026-05-19',
          'U Minh Forest, Ca Mau, Vietnam',
          'Melaleuca (Tram)',
          'Passed / Verified',
          18.5,
          12.0,
          15.2,
          'Negative / Pure'
        )
      `, [p1.rows[0].id]);

      await client.query(`
        INSERT INTO batches (id, product_id, harvest_date, location, species_source, status, water_content, hmf_content, diastase_activity, adulteration_test)
        VALUES (
          'LOT-ST25-2605-002',
          $1,
          '2026-05-05',
          'My Xuyen Field, Soc Trang, Vietnam',
          'ST25 Fragrant Grain',
          'Passed / Verified',
          14.2,
          8.0,
          10.5,
          'Negative / Pure'
        )
      `, [p2.rows[0].id]);

      // Seed default address for primary user
      await client.query(`
        INSERT INTO addresses (user_id, recipient, street, city, country, phone, is_default, label)
        VALUES ($1, 'Nguyen Van An', '123 Le Loi Street, District 1', 'Ho Chi Minh City', 'Vietnam', '+84 912 345 678', true, 'Home')
      `, [mainUserId]);

      // Seed default wishlist item
      await client.query(`
        INSERT INTO wishlists (user_id, product_id)
        VALUES ($1, $2)
      `, [mainUserId, p1.rows[0].id]);

      // Seed default notifications
      await client.query(`
        INSERT INTO notifications (user_id, title, content)
        VALUES ($1, 'Welcome to Green Trace!', 'Thank you for registering. You can search products, trace batches, and order food cleanly.')
      `, [mainUserId]);

      await client.query(`
        INSERT INTO notifications (user_id, title, content)
        VALUES ($1, 'Order #GT-2026-0519-001 Delivered', 'Your order containing Wild Honey has been successfully delivered by Green Trace Express.')
      `, [mainUserId]);

      console.log('Database tables created and seeded successfully!');
    }

    // Ensure coupons table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount_type VARCHAR(20) DEFAULT 'percentage',
        discount_value DECIMAL(10, 2) NOT NULL,
        min_order_value DECIMAL(10, 2) DEFAULT 0.0,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed default coupons
    const couponsCount = await client.query('SELECT COUNT(*) FROM coupons');
    if (parseInt(couponsCount.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO coupons (code, discount_type, discount_value, min_order_value)
        VALUES 
          ('GREENTRACE10', 'percentage', 10.00, 100000.00),
          ('SAVE50K', 'fixed', 50000.00, 200000.00)
      `);
      console.log('Seeded default coupons successfully!');
    }

    // Ensure default admin account exists
    const adminCheck = await client.query("SELECT COUNT(*) FROM users WHERE role = 'admin'");
    if (parseInt(adminCheck.rows[0].count) === 0) {
      const adminPasswordHash = await bcrypt.hash('adminpassword', 10);
      await client.query(`
        INSERT INTO users (name, email, password, phone, dob, city, country, role)
        VALUES ('System Administrator', 'admin@greentrace.com', $1, '+84 999 999 999', '01/01/1990', 'Ha Noi', 'Vietnam', 'admin')
      `, [adminPasswordHash]);
      console.log('Default Admin Account created: admin@greentrace.com / adminpassword');
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Failed to initialize database schema:', error);
    throw error;
  } finally {
    client.release();
  }
};

export default pool;
