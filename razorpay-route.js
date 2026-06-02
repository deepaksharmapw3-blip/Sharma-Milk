const crypto = require('crypto');

// POST /payment/create-order
async function createPaymentOrder(req, res) {
  try {
    const Razorpay = require('razorpay');
    const KEY_ID = process.env.RAZORPAY_KEY_ID;
    const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

    console.log('💳 Payment request body:', JSON.stringify(req.body));
    console.log('💳 KEY_ID:', KEY_ID);

    if (!KEY_ID || !KEY_SECRET) {
      return res.status(500).json({ error: 'Razorpay keys not configured in .env' });
    }

    const { amount, orderId } = req.body;
    if (!amount || !orderId) {
      return res.status(400).json({ error: 'amount and orderId are required' });
    }

    const razorpay = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency: 'INR',
      receipt: `rcpt_${String(orderId).slice(-8)}`,
      notes: { shopOrderId: orderId },
    });

    console.log('✅ Razorpay order created:', razorpayOrder.id);
    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: KEY_ID,
    });
  } catch (err) {
    console.error('❌ Razorpay error:', err?.error || err.message);
    res.status(500).json({ error: err?.error?.description || err.message || 'Payment failed' });
  }
}

// POST /payment/verify
async function verifyPayment(req, res) {
  try {
    const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shopOrderId } = req.body;

    console.log('🔐 Verifying payment:', razorpay_payment_id);

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment verification fields' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Payment verification failed' });
    }

    const db = require('./database');
    await db.Order.findByIdAndUpdate(shopOrderId, {
      $set: { status: 'confirmed', paymentId: razorpay_payment_id, paymentStatus: 'paid' },
    });

    console.log('✅ Payment verified:', shopOrderId);
    res.json({ success: true, paymentId: razorpay_payment_id });
  } catch (err) {
    console.error('❌ Verify error:', err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createPaymentOrder, verifyPayment };
