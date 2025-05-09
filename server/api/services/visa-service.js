import axios from 'axios';
import express from "express"
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.VISA_API_KEY;
if (!apiKey) {
    console.error("VISA_API_KEY muhit o'zgaruvchisi mavjud emas");
    process.exit(1); 
}

const url = 'https://sandbox.api.visa.com/vrdp/v1/visaReceiverDirectedPayouts';

axios.post(url, {
    data: 'your_data_here' 
}, {
    headers: {
        'X-Pay-Token': apiKey,
        'Content-Type': 'application/json',
    }
})
.then(response => {
    console.log('API javobi:', response.data); 
})
.catch(error => {
    if (error.response) {
        console.error('API javobi xatosi:', error.response.data);
    } else if (error.request) {
        console.error('API so‘rovi xatosi:', error.request);
    } else {
        console.error('API xato xabari:', error.message);
    }
});


const router = express.Router()


export default router