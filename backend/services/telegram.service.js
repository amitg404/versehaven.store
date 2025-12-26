/**
 * Telegram Notification Service
 * Sends order notifications to Telegram chat
 */

const https = require('https');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Send a message to Telegram
 * @param {string} message - The message to send (supports Markdown)
 */
async function sendTelegramMessage(message) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured');
    return false;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const data = JSON.stringify({
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: 'Markdown',
  });

  return new Promise((resolve) => {
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }, (res) => {
      res.on('data', () => {});
      res.on('end', () => resolve(res.statusCode === 200));
    });

    req.on('error', (err) => {
      console.error('Telegram notification failed:', err.message);
      resolve(false);
    });

    req.write(data);
    req.end();
  });
}

/**
 * Send order notification to Telegram
 * @param {Object} order - The order details
 */
async function notifyNewOrder(order) {
  const items = order.items.map(item => 
    `  📦 ${item.product?.title || item.title} x${item.quantity} - ₹${item.price}`
  ).join('\n');

  const message = `
🛒 *NEW ORDER!*

📋 *Order ID:* \`${order.id}\`
👤 *Customer:* ${order.user?.name || order.customerName || 'Guest'}
📧 *Email:* ${order.user?.email || order.customerEmail || 'N/A'}
📱 *Phone:* ${order.phone || 'N/A'}

📍 *Shipping Address:*
${order.shippingAddress || 'Not provided'}

🛍️ *Items:*
${items}

💰 *Total:* ₹${order.total}
💳 *Payment:* ${order.paymentStatus || 'Pending'}
📦 *Status:* ${order.status}

⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
`;

  return sendTelegramMessage(message);
}

/**
 * Send payment confirmation notification
 * @param {Object} order - The order details
 * @param {string} paymentId - Razorpay payment ID
 */
async function notifyPaymentReceived(order, paymentId) {
  const message = `
✅ *PAYMENT RECEIVED!*

📋 *Order ID:* \`${order.id}\`
💳 *Payment ID:* \`${paymentId}\`
💰 *Amount:* ₹${order.total}

👤 *Customer:* ${order.user?.name || order.customerName || 'Guest'}
`;

  return sendTelegramMessage(message);
}

module.exports = {
  sendTelegramMessage,
  notifyNewOrder,
  notifyPaymentReceived,
};
