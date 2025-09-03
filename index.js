const nodemailer = require('nodemailer');

/**
 * GitHub 工具演示 - 邮件发送功能
 * 这是一个简单的邮件发送示例，展示了如何使用 nodemailer 库
 */

// 创建邮件传输配置
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // 使用 STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// 发送邮件函数
const sendEmail = async (to, subject, text, html) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('邮件发送成功:', result.messageId);
    return result;
  } catch (error) {
    console.error('邮件发送失败:', error);
    throw error;
  }
};

// 示例用法
const main = async () => {
  console.log('🚀 GitHub 工具演示项目启动');
  console.log('📧 这是一个邮件功能演示');
  
  // 如果提供了环境变量，则尝试发送测试邮件
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.TEST_EMAIL) {
    try {
      await sendEmail(
        process.env.TEST_EMAIL,
        '🎉 GitHub 工具演示项目',
        '这是来自 GitHub 工具演示项目的测试邮件！',
        '<h1>🎉 GitHub 工具演示项目</h1><p>这是来自 <strong>GitHub 工具演示项目</strong> 的测试邮件！</p>'
      );
    } catch (error) {
      console.log('邮件发送测试跳过（需要配置环境变量）');
    }
  } else {
    console.log('💡 提示：设置环境变量 EMAIL_USER, EMAIL_PASS, TEST_EMAIL 来测试邮件发送功能');
  }
};

// 导出函数供其他模块使用
module.exports = {
  sendEmail,
  createTransporter
};

// 如果直接运行此文件
if (require.main === module) {
  main();
}