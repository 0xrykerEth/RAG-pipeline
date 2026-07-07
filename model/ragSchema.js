import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RagSchema = new Schema({
   document: {
        type: String,
        required: true
    },

    chunkNumber: {
        type: Number,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    embedding: {
        type: [Number],
        required: true
    }
})


export default RagSchema;