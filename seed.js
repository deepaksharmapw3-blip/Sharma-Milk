const db = require('./database');

const seedSweets = [
  {
    name: 'Vanilla Macaron',
    image: 'https://example.com/images/vanilla-macaron.jpg',
    price: 3.5,
    category: 'Macaron',
    description: 'Light almond cookie with a vanilla bean buttercream filling.',
  },
  {
    name: 'Chocolate Truffle',
    image: 'https://example.com/images/chocolate-truffle.jpg',
    price: 5.0,
    category: 'Truffle',
    description: 'Rich dark chocolate truffle with a creamy ganache center.',
  },
  {
    name: 'Rabri',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Rabri_%281%29.jpg',
    price: 600,
    category: 'Indian Sweet',
    description: 'Rabri is a rich and creamy dessert made by reducing milk to a thick, velvety consistency. It is flavored with cardamom, saffron, and nuts for an aromatic taste.',
  },
  {
    name: 'Berry Tart',
    image: 'https://example.com/images/berry-tart.jpg',
    price: 6.25,
    category: 'Tart',
    description: 'Fresh mixed berry tart with a crisp pastry shell.',
  },
];

async function seed() {
  try {
    const existing = await db.Sweets.find();
    const existingNames = new Set(existing.map((item) => item.name));
    const toSeed = seedSweets.filter((sweet) => !existingNames.has(sweet.name));

    if (toSeed.length === 0) {
      console.log('All seed sweets already exist. No new sweets added.');
      return;
    }

    const saved = [];
    for (const sweetData of toSeed) {
      const sweet = new db.Sweets(sweetData);
      const created = await sweet.save();
      saved.push(created);
    }

    console.log(`Seeded ${saved.length} new sweets.`);
    console.log(saved);
  } catch (error) {
    console.error('Failed to seed sweets:', error.message);
    process.exit(1);
  }
}

seed();
