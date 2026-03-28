import { authService } from "../services/AuthService.js";
import { logger } from "../logger/index.js";
import { sendResponse, sendError } from "../helpers/response.js";
import fetch from "node-fetch";

const MAIL_API_URL =
  process.env.MAIL_API_URL || "https://one9-mail-v2.onrender.com/api/v1";
const MAIL_API_KEY = process.env.MAIL_API_KEY || "";

export class AuthController {
  async requestOTP(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return sendError(res, 400, "Email is required");
      }

      // Request OTP
      const result = await authService.requestOTP(email);
      let emailSent = false;

      // --- OTP BYPASS MODE ---
      // Set OTP_BYPASS=true in .env to skip email and use fixed OTP 123456.
      // Set OTP_BYPASS=false (or remove it) to re-enable the real mailing flow.
      if (result.bypass) {
        logger.warn("[OTP_BYPASS] Bypass mode is ON. Fixed OTP 123456 is active. Email NOT sent.", { email });
        return sendResponse(res, 200, "OTP bypass mode active", {
          email: result.email,
          expiresIn: result.expiresIn,
          emailSent: false,
          bypass: true,
          warning: "OTP bypass is enabled (dev/maintenance mode). Use OTP: 123456",
        });
      }
      // --- END BYPASS MODE ---

      // Send OTP via email
      if (!MAIL_API_KEY) {
        logger.warn("MAIL_API_KEY not configured, OTP not sent via email");
        return sendResponse(res, 200, "OTP generated but email not configured", {
          email: result.email,
          expiresIn: result.expiresIn,
          emailSent: false,
          warning: "Email service is not configured. Please contact support.",
        });
      }

      try {
        const mailResponse = await fetch(`${MAIL_API_URL}/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": MAIL_API_KEY,
          },
          body: JSON.stringify({
            to: email,
            subject: "Your One9 Contact Login OTP",
            html: `
              <div style="font-family: Verdana, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background-color: #222; color: #ccc;">
                <h1 style="color: #2962ff; text-align: center;">Login Verification</h1>
                <p>Your One9 Contact login OTP is:</p>
                <div style="text-align: center; font-size: 32px; font-weight: bold; color: #2962ff; letter-spacing: 5px; margin: 30px 0;">
                  <code style="background-color: #333; padding: 20px; border-radius: 4px; display: inline-block;">
                    ${result.otpCode || "XXXXXX"}
                  </code>
                </div>
                <p style="text-align: center; color: #aaa; font-size: 14px;">
                  This OTP will expire in 10 minutes.
                </p>
                <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 30px;">
                  If you didn't request this, please ignore this email.
                </p>
              </div>
            `,
          }),
        });

        if (!mailResponse.ok) {
          logger.warn("Failed to send email", { status: mailResponse.status });
          // Email send failed but OTP is generated
          emailSent = false;
        } else {
          logger.info("OTP sent via email", { email });
          emailSent = true;
        }
      } catch (mailError) {
        logger.warn("Error sending email", { error: mailError.message });
        emailSent = false;
      }

      // Return response with email status
      if (emailSent) {
        sendResponse(res, 200, "OTP sent successfully", {
          email: result.email,
          expiresIn: result.expiresIn,
          emailSent: true,
        });
      } else {
        sendResponse(res, 200, "OTP generated but email delivery failed", {
          email: result.email,
          expiresIn: result.expiresIn,
          emailSent: false,
          warning: "We couldn't send the email. Please check the email address and try again.",
        });
      }
    } catch (error) {
      logger.error("Error requesting OTP", { error: error.message });
      sendError(res, 500, "Failed to request OTP");
    }
  }

  async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return sendError(res, 400, "Email and OTP are required");
      }

      const result = await authService.verifyOTP(email, otp);

      if (!result.success) {
        return sendResponse(res, 401, result.message, {
          attemptsRemaining: result.attemptsRemaining,
        });
      }

      // Set token in response header and cookie
      res.setHeader("Authorization", `Bearer ${result.token}`);
      res.cookie("auth_token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      sendResponse(res, 200, result.message, {
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      logger.error("Error verifying OTP", { error: error.message });
      sendError(res, 500, "Failed to verify OTP");
    }
  }

  async logout(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return sendError(res, 400, "Email is required");
      }

      await authService.logout(email);
      res.clearCookie("auth_token");

      sendResponse(res, 200, "Logged out successfully");
    } catch (error) {
      logger.error("Error logging out", { error: error.message });
      sendError(res, 500, "Failed to logout");
    }
  }

  async getMe(req, res) {
    try {
      const userId = req.user?._id || req.userId;

      if (!userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const user = await authService.getCurrentUser(userId);

      if (!user) {
        return sendError(res, 404, "User not found");
      }

      sendResponse(res, 200, "User retrieved successfully", {
        _id: user._id,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      });
    } catch (error) {
      logger.error("Error fetching current user", { error: error.message });
      sendError(res, 500, "Failed to fetch user");
    }
  }
}

export const authController = new AuthController();
