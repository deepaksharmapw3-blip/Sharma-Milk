require('dotenv').config();
const Razorpay = require('razorpay');

const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

console.log('KEY_ID:', KEY_ID);
console.log('KEY_SECRET length:', KEY_SECRET?.length);

const razorpay = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });

razorpay.orders.create({
  amount: 50000, // ₹500 in paise
  currency: 'INR',
  receipt: 'test_receipt_1',
}).then((order) => {
  console.log('✅ Razorpay test SUCCESS:', order.id);
}).catch((err) => {
  console.error('❌ Razorpay test FAILED:');
  console.error('Message:', err.message);
  console.error('Error:', JSON.stringify(err?.error || err, null, 2));
});
