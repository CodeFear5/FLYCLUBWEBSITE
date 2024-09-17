import mongoose from "mongoose";
const DataSchema = new mongoose.Schema({
  title: String,
  description: String,
  time: String,
  pdfFile: {
    data: Buffer,
    contentType: String,
    filePath: String, // Save file path to serve later
  },
});

const Data = mongoose.model('Data', DataSchema);
export default Data;