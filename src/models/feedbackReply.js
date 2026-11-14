import mongoose from 'mongoose';

const feedbackReplySchema = new mongoose.Schema({
    feedbackLink: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackLink', required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional if anonymous replies are allowed
    message: { type: String, required: true, maxlength: 2000 }
}, { timestamps: true });

// For fast "replies for this link, newest first"
feedbackReplySchema.index({ feedbackLink: 1, createdAt: -1 });

export default mongoose.model('FeedbackReply', feedbackReplySchema);
