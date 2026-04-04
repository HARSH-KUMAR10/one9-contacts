const authService = require('../services/authService');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const requestOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email || !isValidEmail(email)) {
      res.status(400);
      throw new Error('Please provide a valid email address');
    }
    
    const otp = generateOtp();
    
    await authService.storeOtp(email.toLowerCase(), otp);
    
    const message = `Your one-time password (OTP) is: ${otp}. It expires in 5 minutes.`;
    
    await sendEmail({
      to: email,
      subject: 'Your Login OTP',
      text: message,
      html: `<p>Your one-time password (OTP) is: <strong>${otp}</strong>.<br/>It expires in 5 minutes.</p>`
    });
    
    res.status(200).json({ message: 'OTP sent to email successfully' });
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !isValidEmail(email)) {
      res.status(400);
      throw new Error('Please provide a valid email address');
    }
    
    if (!otp) {
      res.status(400);
      throw new Error('Please provide an OTP');
    }
    
    const isValid = await authService.verifyOtpRecord(email.toLowerCase(), otp);
    
    if (!isValid) {
      res.status(401);
      throw new Error('Invalid or expired OTP');
    }
    
    // OTP is valid, single-use rule: delete it
    await authService.deleteOtpRecord(email.toLowerCase());
    
    // Find or create user
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      user = await User.create({ email: email.toLowerCase() });
    }
    
    // Generate JWT containing userId (named id for compatibility)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
    
    res.status(200).json({
      _id: user._id,
      email: user.email,
      token
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requestOtp,
  verifyOtp
};
