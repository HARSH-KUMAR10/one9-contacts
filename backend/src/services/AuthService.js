import { User, OTP } from "../models/User.js";
import { logger } from "../logger/index.js";
import crypto from "crypto";

const BYPASS_OTP = process.env.OTP_BYPASS === "true";
const BYPASS_OTP_CODE = "123456";

const generateOTP = () => {
  if (BYPASS_OTP) {
    return BYPASS_OTP_CODE;
  }
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export class AuthService {
  async requestOTP(email) {
    try {
      email = email.toLowerCase().trim();

      // Check if user exists, if not create
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ email });
        await user.save();
        logger.info("New user created", { email });
      }

      // Generate OTP
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Delete existing OTP for this email
      await OTP.deleteOne({ email });

      // Create new OTP
      const otpDoc = new OTP({
        email,
        otp,
        expiresAt,
      });

      await otpDoc.save();
      logger.info("OTP generated", { email, expiresAt, bypass: BYPASS_OTP });

      return {
        success: true,
        email,
        otpLength: 6,
        expiresIn: 600, // 10 minutes in seconds
        // otpCode is only returned in bypass mode so the controller can log/skip email
        otpCode: BYPASS_OTP ? BYPASS_OTP_CODE : undefined,
        bypass: BYPASS_OTP,
      };
    } catch (error) {
      logger.error("Error requesting OTP", { error: error.message });
      throw new Error(`Failed to generate OTP: ${error.message}`);
    }
  }

  async verifyOTP(email, otp) {
    try {
      email = email.toLowerCase().trim();

      // Find OTP
      const otpDoc = await OTP.findOne({ email });

      if (!otpDoc) {
        return {
          success: false,
          message: "OTP expired or not found",
        };
      }

      // Check expiry
      if (new Date() > otpDoc.expiresAt) {
        await OTP.deleteOne({ email });
        return {
          success: false,
          message: "OTP expired",
        };
      }

      // Check attempts
      if (otpDoc.attempts >= otpDoc.maxAttempts) {
        await OTP.deleteOne({ email });
        return {
          success: false,
          message: "Maximum attempts exceeded. Request new OTP.",
        };
      }

      // Verify OTP
      const isBypassValid = BYPASS_OTP && otp === BYPASS_OTP_CODE;
      
      if (otpDoc.otp !== otp && !isBypassValid) {
        otpDoc.attempts += 1;
        await otpDoc.save();
        return {
          success: false,
          message: "Invalid OTP",
          attemptsRemaining: otpDoc.maxAttempts - otpDoc.attempts,
        };
      }

      // OTP verified, update user
      const user = await User.findOneAndUpdate(
        { email },
        { isVerified: true, lastLogin: new Date() },
        { new: true },
      );

      // Delete OTP
      await OTP.deleteOne({ email });

      logger.info("User verified via OTP", { email });

      // Generate session token
      const token = generateToken();

      return {
        success: true,
        user: {
          _id: user._id,
          email: user.email,
          isVerified: user.isVerified,
        },
        token,
        message: "Login successful",
      };
    } catch (error) {
      logger.error("Error verifying OTP", { error: error.message });
      throw new Error(`Failed to verify OTP: ${error.message}`);
    }
  }

  async getCurrentUser(userId) {
    try {
      const user = await User.findById(userId);
      if (!user || !user.isActive) {
        return null;
      }
      return user;
    } catch (error) {
      logger.error("Error fetching user", { error: error.message });
      return null;
    }
  }

  async logout(email) {
    try {
      await User.updateOne({ email }, { lastLogin: new Date() });
      logger.info("User logged out", { email });
      return { success: true };
    } catch (error) {
      logger.error("Error logging out", { error: error.message });
      throw error;
    }
  }
}

export const authService = new AuthService();
