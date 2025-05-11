import mongoose from "mongoose";

const LoadSchema = new mongoose.Schema({
        clerkId: { type: String, required: true },
        title: {type:String, required:true},
        description: {type:String},
        contact: {type:String,required:true},
        price: {type:Number, required:true},
        images: [],
        location: {
            from: {
                city: {type:String, required:true},
                code:{type:String},
                coordinates: { lat: {type:Number}, lng: {type:Number} },
            },
            to: {
                city:{type:String, required:true},
                code:{type:String},
                coordinates: { lat: {type:Number}, lng: {type:Number} },
            },
        },
        weight: {
            number: {type:Number,required:true},
            type: {type:String, default:"kg"}
        },
        fridge: {type:Boolean, default:false},
        connentor: {
           driver: {
                    clerkId :{ type:String},
                    firstName :  { type:String},
                    lastName : { type:String},
                    fullName:{type:String},
                    email: { type:String},
                    imageUrl:{ type:String},
                    id:{type:String},
                    date: {type:Date}
                },
        },
         connections: [
           {
                driver: {
                    clerkId :{ type:String},
                    firstName :  { type:String},
                    lastName : { type:String},
                    fullName:{type:String},
                    email: { type:String},
                    imageUrl:{ type:String},
                },
                date: {type:Date, default:Date.now}
            },
        ]
},{
    timestamps:true
})

export default mongoose.model("Load", LoadSchema)