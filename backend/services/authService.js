const Otp = require('../models/Otp');

const authService = {
  storeOtp: async (email, otp) => {
    // 5 minutes expiration
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    
    // Invalidate prior OTPs for this email by deleting them
    await Otp.deleteMany({ email });
    
    const otpRecord = new Otp({
      email,
      otp,
      expiresAt
    });
    
    await otpRecord.save();
    return otpRecord;
  },
  
  verifyOtpRecord: async (email, otp) => {
    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return false;
    }
    
    if (record.expiresAt < new Date()) {
      return false;
    }
    
    return true;
  },
  
  deleteOtpRecord: async (email) => {
    await Otp.deleteMany({ email });
  }
};

module.exports = authService;
