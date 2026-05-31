require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweets-shop';

const seedProducts = [
  {
    name: 'Kaju Katli',
    description: 'Premium cashew fudge with a delicate silver leaf topping. Made with pure desi ghee and hand-rolled to perfection.',
    price: 650,
    image: 'https://images.unsplash.com/photo-1666190094762-2fae0da07874?w=600&h=450&fit=crop&q=90',
    category: 'Barfi & Katli',
    weight: '500g',
    deliveryTime: '45 min',
    rating: 4.9,
    reviews: 248,
    badge: 'Bestseller',
    festiveTag: '🪔 Diwali Special',
    inStock: true,
    inventory: 50,
  },
  {
    name: 'Motichoor Ladoo',
    description: 'Tiny golden beads of gram flour fried and bound with sugar syrup. Fragrant with cardamom and garnished with pistachios.',
    price: 420,
    image: 'https://images.unsplash.com/photo-1643297551340-10f2a67e1c6c?w=600&h=450&fit=crop&q=90',
    category: 'Ladoo',
    weight: '500g',
    deliveryTime: '40 min',
    rating: 4.8,
    reviews: 182,
    badge: 'Popular',
    festiveTag: '',
    inStock: true,
    inventory: 80,
  },
  {
    name: 'Rasgulla',
    description: 'Soft, spongy Bengali cottage cheese dumplings soaked in light sugar syrup. Melt-in-your-mouth delicate sweetness.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1601303516361-f5f42298c870?w=600&h=450&fit=crop&q=90',
    category: 'Bengali Sweets',
    weight: '500g',
    deliveryTime: '35 min',
    rating: 4.7,
    reviews: 156,
    badge: 'Fresh Daily',
    festiveTag: '',
    inStock: true,
    inventory: 60,
  },
  {
    name: 'Rabri',
    description: 'Rich and creamy slow-cooked milk dessert layered with malai and flavored with cardamom, saffron, and chopped nuts.',
    price: 600,
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Rabri_%281%29.jpg',
    category: 'Milk Sweets',
    weight: '400g',
    deliveryTime: '50 min',
    rating: 4.8,
    reviews: 134,
    badge: 'Chef\'s Special',
    festiveTag: '',
    inStock: true,
    inventory: 40,
  },
  {
    name: 'Gulab Jamun',
    description: 'Soft khoya dumplings deep fried to golden perfection and soaked in rose-flavored sugar syrup. A timeless classic.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&h=450&fit=crop&q=90',
    category: 'Milk Sweets',
    weight: '500g',
    deliveryTime: '30 min',
    rating: 4.9,
    reviews: 310,
    badge: 'All-time Favourite',
    festiveTag: '',
    inStock: true,
    inventory: 100,
  },
  {
    name: 'Besan Barfi',
    description: 'Golden gram flour fudge slow-cooked in pure ghee with cardamom. Rich, dense, and irresistibly fragrant.',
    price: 480,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&h=450&fit=crop&q=90',
    category: 'Barfi & Katli',
    weight: '500g',
    deliveryTime: '45 min',
    rating: 4.6,
    reviews: 98,
    badge: 'New',
    festiveTag: '🎁 Gift Box',
    inStock: true,
    inventory: 45,
  },
  {
    name: 'Boondi Ladoo',
    description: 'Classic gram flour droplets fried and bound with jaggery syrup, cardamom, and dry fruits into perfect round balls.',
    price: 360,
    image: 'https://images.unsplash.com/photo-1666191472513-6d89f18ba167?w=600&h=450&fit=crop&q=90',
    category: 'Ladoo',
    weight: '500g',
    deliveryTime: '40 min',
    rating: 4.7,
    reviews: 122,
    badge: 'Traditional',
    festiveTag: '🟡 Ganesh Chaturthi',
    inStock: true,
    inventory: 70,
  },
  {
    name: 'Sandesh',
    description: 'Delicate Bengali sweet made from freshly curdled chenna, lightly sweetened and flavored with saffron and cardamom.',
    price: 440,
    image: 'https://images.unsplash.com/photo-1601303516361-f5f42298c870?w=600&h=450&fit=crop&q=90',
    category: 'Bengali Sweets',
    weight: '400g',
    deliveryTime: '35 min',
    rating: 4.6,
    reviews: 87,
    badge: 'Heritage',
    festiveTag: '',
    inStock: true,
    inventory: 35,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const existing = await Product.find();
    const existingNames = new Set(existing.map((p) => p.name));
    const toSeed = seedProducts.filter((p) => !existingNames.has(p.name));

    if (toSeed.length > 0) {
      await Product.insertMany(toSeed);
      console.log(`✅ Seeded ${toSeed.length} products into the products collection`);
    } else {
      console.log('ℹ️  All products already exist — nothing to seed');
    }

    console.log(`📦 Total products in DB: ${await Product.countDocuments()}`);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
