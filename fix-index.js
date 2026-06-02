require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweets-shop';

async function fixIndex() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('orders');

    // List all indexes
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes.map(i => i.name));

    // Drop the problematic orderNumber index if it exists
    const hasOrderNumberIndex = indexes.some(i => i.name === 'orderNumber_1');
    if (hasOrderNumberIndex) {
      await collection.dropIndex('orderNumber_1');
      console.log('✅ Dropped orderNumber_1 index');
    } else {
      console.log('ℹ️  orderNumber_1 index not found — nothing to drop');
    }

    // List indexes after fix
    const updatedIndexes = await collection.indexes();
    console.log('Indexes after fix:', updatedIndexes.map(i => i.name));

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Done!');
  }
}

fixIndex();
