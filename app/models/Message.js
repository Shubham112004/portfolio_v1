// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    subject: String,
    message: {
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
