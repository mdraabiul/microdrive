import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  cFile: String,
  name: {
    type: String,
    unique: true,
    require: true,
  },
  type: String,
  size: Number,
  userId: String,
  createdAt: Number,
});

const File = mongoose.model("File", fileSchema);

export default File;
