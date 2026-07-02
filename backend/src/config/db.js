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

    // Seed default users if users table is empty or check if new farms exist
    const yenNhiCheck = await client.query("SELECT COUNT(*) FROM producers WHERE name = 'Yen Nhi Farm'");
    if (parseInt(yenNhiCheck.rows[0].count) === 0) {
      console.log('Resetting database and seeding the requested 5 farms...');
      
      // Clean start for seed database
      await client.query('TRUNCATE TABLE order_items, orders, wishlists, batches, products, producers CASCADE');

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
        VALUES ('Thuy Hanh Farm Manager', 'producer@example.demo', $1, '+84 987 654 321', '01/01/1980', 'Ho Chi Minh City', 'Vietnam', 'producer')
        RETURNING id
      `, [hashedPassword]);

      const producerUserId = prodUserRes.rows[0].id;

      // Seed default address for primary user
      await client.query(`
        INSERT INTO addresses (user_id, recipient, street, city, country, phone, is_default, label)
        VALUES ($1, 'Nguyen Van An', '123 Le Loi Street, District 1', 'Ho Chi Minh City', 'Vietnam', '+84 912 345 678', true, 'Home')
      `, [mainUserId]);

      // Seed default producers
      // 1. YEN NHI FARM — Ninh Thuận
      const f1 = await client.query(`
        INSERT INTO producers (name, location, description, history, image_url)
        VALUES (
          'Yen Nhi Farm', 
          'Ninh Thuận, Vietnam', 
          'Specializing in grapes, jujubes, asparagus and coastal delicacies from Ninh Thuan province.', 
          'Established in Ninh Thuan, Yen Nhi Farm is a pioneer in grape cultivation and high-quality local specialities.', 
          'https://images.unsplash.com/photo-1530079037460-5de57d8bfc0e?auto=format&fit=crop&q=80&w=400'
        )
        RETURNING id
      `);
      const f1Id = f1.rows[0].id;

      // 2. NGOC HIEU FARM — Bà Rịa–Vũng Tàu
      const f2 = await client.query(`
        INSERT INTO producers (name, location, description, history, image_url)
        VALUES (
          'Ngoc Hieu Farm', 
          'Bà Rịa–Vũng Tàu, Vietnam', 
          'Grown in coastal soils, offering premium pomelo, guava, greenhouse melon, fresh seafood, and organic meats.', 
          'Formed with a passion for clean agriculture, combining premium greenhouse fruits with fresh local seafood.', 
          'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=400'
        )
        RETURNING id
      `);
      const f2Id = f2.rows[0].id;

      // 3. CAM NHUNG FARM — Trà Vinh
      const f3 = await client.query(`
        INSERT INTO producers (name, location, description, history, image_url)
        VALUES (
          'Cam Nhung Farm', 
          'Trà Vinh, Vietnam', 
          'Wax coconut, young coconut, Tra Vinh sweet potatoes, ST24 fragrant rice and specialty Khmer ingredients.', 
          'Cẩm Nhung Farm brings Tra Vinh heritage coconut and Khmer-style ingredients directly to urban families.', 
          'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=400'
        )
        RETURNING id
      `);
      const f3Id = f3.rows[0].id;

      // 4. BICH TUYEN FARM — Tiền Giang
      const f4 = await client.query(`
        INSERT INTO producers (name, location, description, history, image_url)
        VALUES (
          'Bich Tuyen Farm', 
          'Tiền Giang, Vietnam', 
          'Famous tropical fruits of Mekong Delta including Hoa Loc mango, Ri6 durian, and star apples.', 
          'Rooted in the lush soil of Tien Giang, delivering certified organic-GAP tropical fruits.', 
          'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=400'
        )
        RETURNING id
      `);
      const f4Id = f4.rows[0].id;

      // 5. THUY HANH FARM — TP. Hồ Chí Minh
      const f5 = await client.query(`
        INSERT INTO producers (user_id, name, location, description, history, image_url)
        VALUES (
          $1, 
          'Thuy Hanh Farm', 
          'Ho Chi Minh City, Vietnam', 
          'Urban hydroponic greens and fresh everyday food for city households.', 
          'Est. 2018. 7+ Years of Urban Farming Experience, delivering hydroponic vegetables, herbs, salad kits, eggs and cleaned chicken.', 
          'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400'
        )
        RETURNING id
      `, [producerUserId]);
      const f5Id = f5.rows[0].id;

      const addProd = async (farmId, name, price, cat, img, size, batchCode) => {
        const p = await client.query(`
          INSERT INTO products (producer_id, name, description, price, category, image_url, rating, reviews_count, specifications)
          VALUES ($1, $2, $3, $4, $5, $6, 4.8, 50, $7::jsonb)
          RETURNING id
        `, [farmId, name, `Sản phẩm sạch chất lượng cao ${name} từ trang trại của chúng tôi.`, price, cat, img, JSON.stringify({ size, origin: 'Vietnam' })]);
        const pId = p.rows[0].id;
        
        await client.query(`
          INSERT INTO batches (id, product_id, harvest_date, location, species_source, status, water_content, hmf_content, diastase_activity, adulteration_test)
          VALUES ($1, $2, '2026-07-01', 'Farm Fields', $3, 'Passed / Verified', 14.5, 8.0, 10.5, 'Negative / Pure')
        `, [batchCode, pId, name]);
        return pId;
      };

      // Seed products & batches for Yen Nhi Farm
      const thuyHanhP1 = await addProd(f1Id, 'Nho xanh Ninh Thuận', 99000, 'Fruits', 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=300', '1 kg', 'YNF-GRG-260701-01');
      await addProd(f1Id, 'Nho đỏ Ninh Thuận', 79000, 'Fruits', 'https://images.unsplash.com/photo-1508747703725-719ae25db3e4?auto=format&fit=crop&q=80&w=300', '1 kg', 'YNF-RGR-260701-01');
      await addProd(f1Id, 'Táo xanh Ninh Thuận', 49000, 'Fruits', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300', '1 kg', 'YNF-JJB-260701-01');
      await addProd(f1Id, 'Măng tây xanh', 69000, 'Vegetables', 'https://images.unsplash.com/photo-1515471204579-24b8759a0a56?auto=format&fit=crop&q=80&w=300', '500 g', 'YNF-ASP-260701-01');
      await addProd(f1Id, 'Tỏi Ninh Thuận', 59000, 'Vegetables', 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&q=80&w=300', '300 g', 'YNF-GAR-260701-01');
      await addProd(f1Id, 'Mật ong hoa rừng', 169000, 'Honey', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=300', '500 ml', 'YNF-HON-260701-01');
      await addProd(f1Id, 'Nho khô phơi nắng', 89000, 'Fruits', 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=300', '200 g', 'YNF-RAI-260701-01');
      await addProd(f1Id, 'Hộp quà Nắng Ninh Thuận', 459000, 'Bundles', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=300', '1 hộp', 'YNF-GFT-260701-01');
      await addProd(f1Id, 'Mực lá tươi Ninh Chữ', 189000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=300', '500 g', 'YNF-SQD-260701-01');
      await addProd(f1Id, 'Mực một nắng Ninh Chữ', 219000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=300', '300 g', 'YNF-ODS-260701-01');
      await addProd(f1Id, 'Cá cơm khô Ninh Thuận', 79000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300', '200 g', 'YNF-DAN-260701-01');
      await addProd(f1Id, 'Nước mắm cá cơm Phan Rang', 129000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300', '500 ml', 'YNF-FSA-260701-01');

      // Seed products & batches for Ngoc Hieu Farm
      await addProd(f2Id, 'Bưởi da xanh Vũng Tàu', 99000, 'Fruits', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=300', '1 trái, khoảng 1,2–1,5 kg', 'NHF-POM-260701-01');
      await addProd(f2Id, 'Ổi hồng Vũng Tàu', 59000, 'Fruits', 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=300', '1 kg', 'NHF-GUA-260701-01');
      await addProd(f2Id, 'Dưa lưới nhà màng', 129000, 'Fruits', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=300', '1 trái, khoảng 1,2–1,5 kg', 'NHF-MEL-260701-01');
      await addProd(f2Id, 'Tiêu đen nguyên hạt', 59000, 'Rice', 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&q=80&w=300', '150 g', 'NHF-PEP-260701-01');
      await addProd(f2Id, 'Hàu sữa tươi Long Sơn', 99000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=300', '1 kg', 'NHF-OYS-260701-01');
      await addProd(f2Id, 'Tôm sú tươi', 169000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=300', '500 g', 'NHF-PRW-260701-01');
      await addProd(f2Id, 'Mực lá tươi Vũng Tàu', 189000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=300', '500 g', 'NHF-SQD-260701-01');
      await addProd(f2Id, 'Cá thu tươi cắt khúc', 139000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=300', '500 g', 'NHF-MCK-260701-01');
      await addProd(f2Id, 'Mực một nắng Vũng Tàu', 219000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=300', '300 g', 'NHF-ODS-260701-01');
      await addProd(f2Id, 'Nước mắm cá cơm', 129000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300', '500 ml', 'NHF-FSA-260701-01');
      await addProd(f2Id, 'Gà ta sơ chế', 169000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=300', 'Khoảng 1 kg', 'NHF-CHK-260701-01');
      await addProd(f2Id, 'Thịt heo thăn mát', 109000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=300', '500 g', 'NHF-PRT-260701-01');

      // Seed products & batches for Cam Nhung Farm
      await addProd(f3Id, 'Dừa sáp Trà Vinh', 149000, 'Fruits', 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80&w=300', '1 trái', 'CNF-WCC-260701-01');
      await addProd(f3Id, 'Dừa xiêm tươi', 59000, 'Fruits', 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80&w=300', '2 trái', 'CNF-YCC-260701-01');
      await addProd(f3Id, 'Nước cốt dừa nguyên chất', 79000, 'Fruits', 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80&w=300', '500 ml', 'CNF-CCM-260701-01');
      await addProd(f3Id, 'Mật hoa dừa tự nhiên', 129000, 'Honey', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=300', '350 ml', 'CNF-CBN-260701-01');
      await addProd(f3Id, 'Kẹo dừa thủ công', 69000, 'Bundles', 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=300', '250 g', 'CNF-CDC-260701-01');
      await addProd(f3Id, 'Khoai lang mật Trà Vinh', 59000, 'Fruits', 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=300', '1 kg', 'CNF-SPT-260701-01');
      await addProd(f3Id, 'Chuối sứ chín cây', 39000, 'Fruits', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=300', '1 kg', 'CNF-BAN-260701-01');
      await addProd(f3Id, 'Hộp quà dừa Trà Vinh', 489000, 'Bundles', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=300', '1 hộp', 'CNF-GFT-260701-01');
      await addProd(f3Id, 'Gạo thơm ST24 Trà Vinh', 99000, 'Rice', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300', '2 kg', 'CNF-RIC-260701-01');
      await addProd(f3Id, 'Tôm khô Trà Vinh', 179000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=300', '200 g', 'CNF-DSH-260701-01');
      await addProd(f3Id, 'Khô cá lóc một nắng', 159000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=300', '400 g', 'CNF-SFI-260701-01');
      await addProd(f3Id, 'Mắm bò hóc Khmer', 89000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300', '250 g', 'CNF-FFP-260701-01');

      // Seed products & batches for Bich Tuyen Farm
      await addProd(f4Id, 'Xoài cát Hòa Lộc', 119000, 'Fruits', 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=300', '1 kg', 'BTF-MNG-260701-01');
      await addProd(f4Id, 'Sầu riêng Ri6', 109000, 'Fruits', 'https://images.unsplash.com/photo-1596702672322-26154b5dfd17?auto=format&fit=crop&q=80&w=300', 'Theo kg, khoảng 2–3 kg/trái', 'BTF-DUR-260701-01');
      await addProd(f4Id, 'Vú sữa Lò Rèn', 89000, 'Fruits', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300', '1 kg', 'BTF-STA-260701-01');
      await addProd(f4Id, 'Khóm Tân Phước', 49000, 'Fruits', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=300', '1 trái, khoảng 1–1,5 kg', 'BTF-PIN-260701-01');
      await addProd(f4Id, 'Chôm chôm Tiền Giang', 59000, 'Fruits', 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=300', '1 kg', 'BTF-RAM-260701-01');
      await addProd(f4Id, 'Mít Thái nguyên trái', 49000, 'Fruits', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=300', 'Theo kg', 'BTF-JAC-260701-01');
      await addProd(f4Id, 'Thanh long ruột đỏ', 49000, 'Fruits', 'https://images.unsplash.com/photo-1527325679968-230d55e00b0b?auto=format&fit=crop&q=80&w=300', '1 kg', 'BTF-DGF-260701-01');
      await addProd(f4Id, 'Hộp quà trái cây Tiền Giang', 549000, 'Bundles', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=300', '1 hộp', 'BTF-GFT-260701-01');
      await addProd(f4Id, 'Xoài sấy dẻo', 99000, 'Fruits', 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=300', '200 g', 'BTF-SDM-260701-01');
      await addProd(f4Id, 'Mít sấy chân không', 89000, 'Fruits', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=300', '200 g', 'BTF-VDJ-260701-01');
      await addProd(f4Id, 'Mật ong hoa vườn', 169000, 'Honey', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=300', '500 ml', 'BTF-HON-260701-01');
      await addProd(f4Id, 'Muối ớt chấm trái cây', 49000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300', '150 g', 'BTF-FCS-260701-01');

      // Seed products & batches for Thuy Hanh Farm
      await addProd(f5Id, 'Xà lách Butterhead', 39000, 'Vegetables', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=300', '300 g', 'THF-BHL-260701-01');
      await addProd(f5Id, 'Cải bó xôi non', 35000, 'Vegetables', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=300', '250 g', 'THF-BSP-260701-01');
      await addProd(f5Id, 'Cải kale tươi', 39000, 'Vegetables', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=300', '300 g', 'THF-KAL-260701-01');
      await addProd(f5Id, 'Rau mầm tổng hợp', 35000, 'Vegetables', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=300', '100 g', 'THF-MCG-260701-01');
      await addProd(f5Id, 'Cà chua bi', 45000, 'Vegetables', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=300', '500 g', 'THF-TOM-260701-01');
      await addProd(f5Id, 'Bộ rau gia vị tươi', 39000, 'Vegetables', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=300', '200 g', 'THF-HER-260701-01');
      await addProd(f5Id, 'Hộp rau thủy canh theo tuần', 219000, 'Bundles', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=300', '1 hộp', 'THF-WVB-260701-01');
      await addProd(f5Id, 'Bộ salad trộn tiện lợi', 99000, 'Vegetables', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=300', '1 bộ', 'THF-SAL-260701-01');
      await addProd(f5Id, 'Trứng gà farm', 42000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=300', '10 quả', 'THF-EGG-260701-01');
      await addProd(f5Id, 'Gà ta sơ chế', 169000, 'Meat & Eggs', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=300', 'Khoảng 1 kg', 'THF-CHK-260701-01');

      // Seed default notifications
      await client.query(`
        INSERT INTO notifications (user_id, title, content)
        VALUES ($1, 'Welcome to Green Trace!', 'Thank you for registering. You can search products, trace batches, and order food cleanly.')
      `, [mainUserId]);

      await client.query(`
        INSERT INTO wishlists (user_id, product_id)
        VALUES ($1, $2)
      `, [mainUserId, thuyHanhP1]);

      console.log('Database tables seeded successfully with 5 new farms!');
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
