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

async function seedOrders(sweets) {
  if (sweets.length === 0) return;
  const existingOrders = await db.Order.find();
  if (existingOrders.length > 0) {
    console.log('Orders already seeded.');
    return;
  }

  const mockOrders = [
    {
      _id: '64bf3de514a6bb4979e2c601',
      items: [
        {
          sweetId: sweets[0]._id || sweets[0].id,
          name: sweets[0].name,
          quantity: 2,
          price: sweets[0].price,
        }
      ],
      customerName: 'Rahul Kumar',
      customerEmail: 'rahul@example.com',
      total: sweets[0].price * 2,
      status: 'pending',
    },
    {
      _id: '64bf3de514a6bb4979e2c602',
      items: [
        {
          sweetId: sweets[1]._id || sweets[1].id,
          name: sweets[1].name,
          quantity: 1,
          price: sweets[1].price,
        }
      ],
      customerName: 'Priya Sharma',
      customerEmail: 'priya@example.com',
      total: sweets[1].price,
      status: 'preparing',
    },
    {
      _id: '64bf3de514a6bb4979e2c603',
      items: [
        {
          sweetId: sweets[2]._id || sweets[2].id,
          name: sweets[2].name,
          quantity: 3,
          price: sweets[2].price,
        }
      ],
      customerName: 'Amit Patel',
      customerEmail: 'amit@example.com',
      total: sweets[2].price * 3,
      status: 'shipped',
    },
    {
      _id: '64bf3de514a6bb4979e2c604',
      items: [
        {
          sweetId: sweets[0]._id || sweets[0].id,
          name: sweets[0].name,
          quantity: 1,
          price: sweets[0].price,
        },
        {
          sweetId: sweets[1]._id || sweets[1].id,
          name: sweets[1].name,
          quantity: 2,
          price: sweets[1].price,
        }
      ],
      customerName: 'Sneha Gupta',
      customerEmail: 'sneha@example.com',
      total: sweets[0].price + (sweets[1].price * 2),
      status: 'delivered',
    }
  ];

  for (const orderData of mockOrders) {
    const order = new db.Order(orderData);
    await order.save();
  }
  console.log('Seeded 4 mock orders.');
}

async function seed() {
  try {
    const existing = await db.Sweets.find();
    const existingNames = new Set(existing.map((item) => item.name));
    const toSeed = seedSweets.filter((sweet) => !existingNames.has(sweet.name));

    if (toSeed.length > 0) {
      const saved = [];
      for (const sweetData of toSeed) {
        const sweet = new db.Sweets(sweetData);
        const created = await sweet.save();
        saved.push(created);
      }
      console.log(`Seeded ${saved.length} new sweets.`);
    } else {
      console.log('All seed sweets already exist. No new sweets added.');
    }

    const allSweets = await db.Sweets.find();
    await seedOrders(allSweets);
  } catch (error) {
    console.error('Failed to seed database:', error.message);
    process.exit(1);
  }
}

seed();
