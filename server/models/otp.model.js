import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    entityType: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.model("OTP", otpSchema)