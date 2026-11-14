import mongoose from 'mongoose';

const feedbackLinkSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    description: String,
    slug: { type: String, unique: true, required: true }, // used in the shareable link
    isActive: { type: Boolean, default: false },
    replyCount: { type: Number, default: 0 } // denormalized counter
}, { timestamps: true });

export default mongoose.model('FeedbackLink', feedbackLinkSchema);
