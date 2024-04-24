import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 100,
  },
  isbn: String,
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  coverImage:{
    type:String,
    default:""
  },
  images: [String],
  pagesNumber: Number,
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
  isAvailable: Boolean,
});

const Book = mongoose.model('Book',bookSchema);

export default Book;