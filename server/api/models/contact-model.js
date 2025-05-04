import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   
    trim: true,
    },
    email: {    
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    message: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);