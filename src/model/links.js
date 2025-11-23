import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  lastClicked: { type: Date, default: null }
}, { timestamps: true });

const Link = mongoose.model("Link", LinkSchema);
export default Link;
