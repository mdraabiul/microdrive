import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  cFile: String,
  name: String,
  type: String,
  size: Number,
  userId: String,
  createdAt: Number,
});

const File = mongoose.model("File", fileSchema);

export default File;
