require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'fallback-data.json');

let useMongoose = false;

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
    useMongoose = true;
});

async function connectToDatabase() {
    try {
        // Use env variable so this works in production/cloud too
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweets-shop';
        await mongoose.connect(uri);
    } catch (error) {
        console.warn('MongoDB unavailable, using in-memory fallback.');
        console.warn(error.message);
    }
}

connectToDatabase();

const sweetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    category: String,
    inventory: { type: Number, default: 0 },
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
    items: [
        {
            sweetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sweets', required: true },
            name: String,
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true },
        },
    ],
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    total: { type: Number, required: true, default: 0 },
    status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'preparing', 'on_the_way', 'delivered'] },
}, { timestamps: true });

const SweetsModel = mongoose.models.Sweets || mongoose.model('Sweets', sweetSchema);
const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);

const initialFallbackData = { sweets: [], orders: [] };
let fallbackData = initialFallbackData;

function loadFallbackData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const raw = fs.readFileSync(DATA_FILE, 'utf8');
            const parsed = JSON.parse(raw);
            if (parsed.sweets) {
                parsed.sweets = parsed.sweets.map((s) => ({
                    ...s,
                    createdAt: s.createdAt ? new Date(s.createdAt) : new Date(),
                    updatedAt: s.updatedAt ? new Date(s.updatedAt) : new Date(),
                }));
            }
            if (parsed.orders) {
                parsed.orders = parsed.orders.map((o) => ({
                    ...o,
                    createdAt: o.createdAt ? new Date(o.createdAt) : new Date(),
                    updatedAt: o.updatedAt ? new Date(o.updatedAt) : new Date(),
                }));
            }
            fallbackData = parsed;
            return;
        }
    } catch (err) {
        console.warn('Failed to load fallback data file:', err.message);
    }
    fallbackData = initialFallbackData;
}

function saveFallbackData() {
    try {
        const toSave = JSON.parse(JSON.stringify(fallbackData, (k, v) => {
            if (v instanceof Date) return v.toISOString();
            return v;
        }));
        fs.writeFileSync(DATA_FILE, JSON.stringify(toSave, null, 2), 'utf8');
    } catch (err) {
        console.warn('Failed to save fallback data file:', err.message);
    }
}

loadFallbackData();

function createFallbackModel(collection) {
    return class {
        constructor(data) {
            Object.assign(this, data);
            this._id = this._id || String(Date.now() + Math.random());
            this.createdAt = this.createdAt || new Date();
            this.updatedAt = this.updatedAt || new Date();
        }

        async save() {
            this.updatedAt = new Date();
            const idx = fallbackData[collection].findIndex((item) => item._id === this._id);
            if (idx !== -1) {
                fallbackData[collection][idx] = this;
            } else {
                fallbackData[collection].push(this);
            }
            saveFallbackData();
            return this;
        }

        static async find() {
            return fallbackData[collection];
        }

        static async findById(id) {
            return fallbackData[collection].find((item) => String(item._id) === String(id) || item.id === id) || null;
        }

        static async findByIdAndUpdate(id, update) {
            const idx = fallbackData[collection].findIndex((item) => String(item._id) === String(id) || item.id === id);
            if (idx === -1) return null;
            fallbackData[collection][idx] = { ...fallbackData[collection][idx], ...update.$set, updatedAt: new Date() };
            saveFallbackData();
            return fallbackData[collection][idx];
        }

        static async findByIdAndDelete(id) {
            const idx = fallbackData[collection].findIndex((item) => String(item._id) === String(id) || item.id === id);
            if (idx === -1) return null;
            const [removed] = fallbackData[collection].splice(idx, 1);
            saveFallbackData();
            return removed;
        }
    };
}

const FallbackSweets = createFallbackModel('sweets');
const FallbackOrder = createFallbackModel('orders');

const fallbackModels = {
    Sweets: FallbackSweets,
    Order: FallbackOrder,
};

const proxyHandler = {
    get(target, prop) {
        if (useMongoose && mongoose.models[prop]) {
            return mongoose.models[prop];
        }
        return fallbackModels[prop];
    },
};

const database = new Proxy({}, proxyHandler);

module.exports = database;
