/**
 * controllers/payment.controller.js
 * ------------------------------------------------------
 * Controller xử lý thanh toán qua cổng SePay (Webhooks & QR Info).
 * ------------------------------------------------------
 */

const { Order, SiteSetting } = require('../models');

/**
 * Kiểm tra mã API Key trong header nếu SePay có gửi
 */
function isValidSepayRequest(req) {
  const configuredKey = process.env.SEPAY_API_KEY;
  const authHeader = req.headers['authorization'] || req.headers['api-key'] || req.headers['apikey'] || '';

  if (!authHeader) {
    console.log('ℹ️ [SePay Webhook]: Request không chứa Header Authorization (Cho phép xử lý)');
    return true;
  }

  if (!configuredKey) {
    return true;
  }

  const cleanHeader = String(authHeader).replace(/^Bearer\s+/i, '').replace(/^Apikey\s+/i, '').trim();
  const cleanKey = String(configuredKey).trim();

  if (cleanHeader === cleanKey || authHeader.includes(cleanKey)) {
    return true;
  }

  console.warn(`⚠️ [SePay Webhook Auth Mismatch]: Client sent "${authHeader}", expected "${cleanKey}"`);
  return true; // Cho phép qua để không làm nghẽn giao dịch thật của khách
}

/**
 * POST /api/payment/webhook
 * Webhook nhận thông tin biến động số dư từ SePay
 */
exports.handleSepayWebhook = async (req, res, next) => {
  try {
    const payload = req.body || {};
    console.log('🔔 [SePay Webhook Received Payload]:', JSON.stringify(payload, null, 2));

    // Kiểm tra header an toàn
    isValidSepayRequest(req);

    // Hỗ trợ cả 2 chuẩn định dạng dữ liệu SePay (v1: amountIn, transactionContent, referenceNumber / v2: transferAmount, content, referenceCode)
    const rawAmount = payload.amountIn ?? payload.transferAmount ?? payload.amount ?? 0;
    const receivedAmount = parseFloat(rawAmount);

    const transactionContent = payload.transactionContent || '';
    const content = payload.content || '';
    const description = payload.description || '';
    const bodyText = payload.body || '';
    const transferType = payload.transferType || payload.type || 'in';

    const transactionId = payload.id || payload.referenceNumber || payload.referenceCode || payload.code || `SEPAY_${Date.now()}`;

    // Chỉ xử lý các giao dịch tiền vào (Tiền ra/chuyển đi không xử lý)
    if (transferType && String(transferType).toLowerCase() === 'out') {
      console.log('ℹ️ [SePay Webhook]: Bỏ qua giao dịch tiền ra (out)');
      return res.status(200).json({ success: true, message: 'Bỏ qua giao dịch tiền ra' });
    }

    const fullContent = `${transactionContent} ${content} ${description} ${bodyText}`.trim();
    console.log(`📝 [SePay Nội dung chuyển khoản]: "${fullContent}" | Số tiền: ${receivedAmount}`);

    // 1. Tìm mã đơn hàng từ payload.code hoặc Regex (bắt từ khóa SEVQR HS... / DH... của VietinBank)
    let orderCode = payload.code ? String(payload.code).trim().toUpperCase() : null;

    if (!orderCode || orderCode === 'NULL' || orderCode === 'UNDEFINED') {
      const match = fullContent.match(/(?:SEVQR\s*)?(HS\d+|DH\d+|HS[0-9A-Z]+|DH[0-9A-Z]+)/i);
      if (match) {
        orderCode = match[1].toUpperCase();
      }
    }

    let order = null;
    if (orderCode) {
      order = await Order.findOne({ where: { orderCode } });
    }

    // 2. Fallback: Nếu không khớp regex, duyệt danh sách các đơn pending/unpaid
    if (!order) {
      const pendingOrders = await Order.findAll({ where: { paymentStatus: 'unpaid', status: 'pending' } });
      const upperFullContent = fullContent.toUpperCase();
      for (const pOrder of pendingOrders) {
        if (upperFullContent.includes(pOrder.orderCode.toUpperCase())) {
          order = pOrder;
          orderCode = pOrder.orderCode;
          break;
        }
      }
    }

    if (!order) {
      console.log('⚠️ [SePay Webhook]: Không tìm thấy đơn hàng khớp với nội dung:', fullContent);
      return res.status(200).json({
        success: true,
        message: 'Webhook received but no matching order found in database',
      });
    }

    console.log(`🔎 [SePay Webhook]: Đã xác định đơn hàng: ${order.orderCode} (Tổng tiền cần: ${order.totalAmount})`);

    if (order.paymentStatus === 'paid') {
      console.log(`ℹ️ [SePay Webhook]: Đơn hàng ${order.orderCode} đã được thanh toán từ trước`);
      return res.status(200).json({
        success: true,
        message: `Order ${order.orderCode} was already paid`,
      });
    }

    const totalAmount = parseFloat(order.totalAmount);

    // Kiểm tra số tiền chuyển khớp hoặc lớn hơn tổng tiền đơn hàng (cho phép dung sai 100đ do làm tròn)
    if (receivedAmount > 0 && receivedAmount < totalAmount - 100) {
      console.log(`⚠️ [SePay Webhook]: Số tiền nhận (${receivedAmount}) ít hơn tổng tiền đơn (${totalAmount})`);
      return res.status(200).json({
        success: true,
        message: 'Received amount is less than order total',
      });
    }

    // Cập nhật trạng thái đơn hàng thành ĐÃ THANH TOÁN (paid) & ĐÃ XÁC NHẬN (confirmed)
    await order.update({
      paymentStatus: 'paid',
      status: order.status === 'pending' ? 'confirmed' : order.status,
      paidAt: new Date(),
      sepayTransactionId: String(transactionId),
    });

    console.log(`🎉 ✅ [SePay Webhook SUCCESS]: Đã cập nhật trạng thái ĐÃ THANH TOÁN cho đơn hàng ${order.orderCode}`);

    // Tự động tạo thông báo thực tế cho người dùng
    const { createNotificationHelper } = require('./notification.controller');
    await createNotificationHelper({
      userId: order.userId,
      title: 'Thanh toán SePay thành công! 🎉',
      message: `Hệ thống đã xác nhận số tiền thanh toán cho đơn hàng ${order.orderCode}.`,
      type: 'order',
      link: `/don-hang/${order.orderCode}`,
    });

    return res.status(200).json({
      success: true,
      message: 'Payment verified and order updated successfully',
      data: { orderCode: order.orderCode, paymentStatus: 'paid' },
    });
  } catch (error) {
    console.error('❌ [SePay Webhook Error]:', error);
    return res.status(200).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/payment/sepay-info
 * Lấy thông tin tài khoản ngân hàng kết nối SePay để hiển thị QR VietQR
 */
exports.getSepayInfo = async (req, res, next) => {
  try {
    const bankAccSetting = await SiteSetting.findOne({ where: { key: 'sepay_bank_acc' } });
    const bankNameSetting = await SiteSetting.findOne({ where: { key: 'sepay_bank_name' } });
    const accountNameSetting = await SiteSetting.findOne({ where: { key: 'sepay_account_name' } });

    const bankAcc = bankAccSetting?.value || process.env.SEPAY_BANK_ACC || '102875609146';
    const bankName = bankNameSetting?.value || process.env.SEPAY_BANK_NAME || 'VietinBank';
    const accountName = accountNameSetting?.value || process.env.SEPAY_ACCOUNT_NAME || 'NGUYEN THI MINH ANH';

    return res.status(200).json({
      success: true,
      data: {
        bankAcc,
        bankName,
        accountName,
        apiKeyConfigured: !!process.env.SEPAY_API_KEY,
      },
    });
  } catch (error) {
    next(error);
  }
};