// pages/api/razorpay OR app/api/razorpay/route.ts equivalent for Express
// Add these routes to your server.js

require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /payment/create-order
// Creates a Razorpay order before showing the UPI popup
async function createPaymentOrder(req, res) {
  const { amount, orderId } = req.body; // amount in rupees
  if (!amount || !orderId) {
    return res.status(400).json({ error: 'amount and orderId are required' });
  }
  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // convert to paise
      currency: 'INR',
      receipt: `receipt_${orderId}`,
      notes: { shopOrderId: orderId },
    });
    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('Razorpay order creation failed:', err);
    res.status(500).json({ error: err.message });
  }
}

// POST /payment/verify
// Verifies the payment signature after successful UPI payment
async function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shopOrderId } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing payment verification fields' });
  }
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, error: 'Payment verification failed' });
  }

  // Payment is genuine — update order status to confirmed
  try {
    const db = require('./database');
    await db.Order.findByIdAndUpdate(shopOrderId, {
      $set: {
        status: 'confirmed',
        paymentId: razorpay_payment_id,
        paymentStatus: 'paid',
      },
    });
    res.json({ success: true, paymentId: razorpay_payment_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createPaymentOrder, verifyPayment };
