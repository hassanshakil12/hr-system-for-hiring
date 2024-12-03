import bcrypt from "bcrypt";
import OTP from "../models/otp.model.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const hashOtp = async (otp) => {
  return await bcrypt.hash(otp, 12);
};

const saveOtp = async (email, otp, entityType) => {
  const hashedOtp = hashOtp(otp);

  await OTP.create({ email, otp: hashedOtp, entityType });
};

const verifyOtp = async (email, otp, entityType) => {
  const record = await OTP.findOne({ email, entityType });
  if (!record) {
    return { success: false, message: "OTP not found or expired" };
  }

  const hashedInputOtp = hashOtp(otp);

  try {
    const isOtpEqual = await bcrypt.compare(record.otp, hashedInputOtp);
    if (!isOtpEqual) {
      return { success: false, message: "Invalid OTP" };
    }

    await OTP.deleteOne({ email });
    await OTP.save();
    return { success: true, message: "OTP Successfully Verified" };
  } catch (err) {
    console.error(err);
  }
};

export {
    generateOtp,
    hashOtp,
    saveOtp,
    verifyOtp
}