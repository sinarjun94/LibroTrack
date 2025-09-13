export function generateVerificationOtpEmailTemplate(otpCode) {
  return `
    <div style="font-family: 'Segoe UI', 'Roboto', sans-serif; max-width: 480px; margin: auto; background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #2c3e50; margin: 0;">📚 LibroTrack</h2>
      </div>
      <p style="font-size: 16px; color: #333;">
        Dear User,
      </p>
      <p style="font-size: 15px; color: #555;">
        Thank you for registering with <strong>LibroTrack</strong>. To complete your registration, please verify your email address using the OTP below:
      </p>
      <div style="text-align: center; margin: 24px 0;">
        <div style="display: inline-block; padding: 16px 32px; font-size: 24px; letter-spacing: 4px; font-weight: bold; color: #ffffff; background: #4CAF50; border-radius: 6px;">
          ${otpCode}
        </div>
      </div>
      <p style="font-size: 14px; color: #777;">
        This OTP is valid for <strong>15 minutes</strong>. If you did not request this verification, you can safely ignore this email.
      </p>
      <p style="font-size: 14px; color: #777;">
        Happy Reading,<br/>
        The LibroTrack Team
      </p>
      <div style="text-align: center; font-size: 12px; color: #bbb; margin-top: 20px;">
        © ${new Date().getFullYear()} LibroTrack
      </div>
    </div>
  `;
}

export const generateForgotPasswordEmailTemplate = (
  resetPasswordUrl,
  userName
) => {
  return `
    <div style="font-family: 'Segoe UI', 'Roboto', sans-serif; max-width: 480px; margin: auto; background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #2c3e50; margin: 0;">📚 LibroTrack</h2>
      </div>
      <p style="font-size: 16px; color: #333;">
        Hello ${userName || "User"},
      </p>
      <p style="font-size: 15px; color: #555;">
        We received a request to reset your password for your <strong>LibroTrack</strong> account.
      </p>
      <p style="font-size: 15px; color: #555;">
        Click the button below to reset your password. This link will expire in <strong>15 minutes</strong> for your security.
      </p>
      <div style="text-align: center; margin: 24px 0;">
        <a href="${resetPasswordUrl}" style="background-color: #4CAF50; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; color: #777;">
        If you did not request a password reset, please ignore this email. Your password will remain secure and unchanged.
      </p>
      <p style="font-size: 14px; color: #777;">
        Happy Reading,<br/>
        The LibroTrack Team
      </p>
      <div style="text-align: center; font-size: 12px; color: #bbb; margin-top: 20px;">
        © ${new Date().getFullYear()} LibroTrack
      </div>
    </div>
  `;
};
