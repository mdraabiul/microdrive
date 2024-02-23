import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  cFile: String,
  name: String,
  type: String,
  size: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", fileSchema);

export default File;
