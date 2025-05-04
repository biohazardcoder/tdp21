import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images: [{ type: String }], 
    link: {
        type: String,
        required: true,
        trim: true,
    },
},{ timestamps: true });
export default mongoose.model('Partner', partnerSchema);