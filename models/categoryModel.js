import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 100,
  },
  image:{
    type:String,
    default:""
  },
});

const Category = mongoose.model('Category', categorySchema)

export default Category