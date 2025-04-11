const nodemailer = require("nodemailer");

// 1. Cấu hình transporter (dùng Gmail hoặc Mailtrap SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * 2. Hàm gửi email tổng quát
 * @param {Object} options
 * @param {string} options.to - Email người nhận
 * @param {string} options.subject - Tiêu đề email
 * @param {string} options.html - Nội dung HTML
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"TOEIC Gamification" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent to ${to}:`, info.messageId);
    return info;
  } catch (err) {
    console.error(`❌ Email failed to ${to}:`, err);
    throw err;
  }
};

/**
 * 3. Gửi email xác nhận đặt lại mật khẩu
 * @param {string} to - Email người dùng
 * @param {string} resetLink - Link frontend kèm token đặt lại mật khẩu
 */
const sendResetPasswordEmail = async (to, resetLink) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
      <h2 style="color: #1d4ed8;">TOEIC Gamification - Đặt lại mật khẩu</h2>
      <p>Chào bạn,</p>
      <p>Bạn vừa yêu cầu đặt lại mật khẩu. Nhấn vào nút bên dưới để tiến hành:</p>
      <a href="${resetLink}" style="
        display: inline-block;
        background-color: #1d4ed8;
        color: #ffffff;
        padding: 12px 20px;
        border-radius: 6px;
        text-decoration: none;
        margin: 20px 0;
      ">Đặt lại mật khẩu</a>
      <p>Liên kết này sẽ hết hạn sau 15 phút. Nếu không phải bạn yêu cầu, hãy bỏ qua email này.</p>
      <hr style="margin: 30px 0;" />
      <p style="font-size: 0.9em; color: #6b7280;">TOEIC Gamification - Rèn luyện mỗi ngày, tiến tới 990!</p>
    </div>
  `;

  return await sendEmail({
    to,
    subject: "🔐 Đặt lại mật khẩu TOEIC Gamification",
    html,
  });
};

module.exports = {
  sendEmail,
  sendResetPasswordEmail,
};
