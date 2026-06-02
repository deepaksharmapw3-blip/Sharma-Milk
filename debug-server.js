require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/payment/create-order', async (req, res) => {
  console.log('RAW BODY:', req.body);
  console.log('AMOUNT:', req.body.amount);
  console.log('ORDER ID:', req.body.orderId);

  const KEY_ID = process.env.RAZORPAY_KEY_ID;
  const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
  console.log('KEY_ID:', KEY_ID);

  try {
    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });
    const order = await razorpay.orders.create({
      amount: Math.round(Number(req.body.amount) * 100),
      currency: 'INR',
      receipt: 'test_receipt',
    });
    console.log('SUCCESS:', order.id);
    res.json({ razorpayOrderId: order.id, amount: order.amount, currency: order.currency, keyId: KEY_ID });
  } catch (err) {
    console.error('ERROR:', err?.error || err.message);
    res.status(500).json({ error: err?.error?.description || err.message });
  }
});

app.listen(4001, () => console.log('Debug server on port 4001'));
