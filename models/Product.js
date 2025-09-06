import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String] },
    size: { type: String },
    category: { type: String },
    tags: { type: [String] },
    sku: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    description: { type: String },
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
  },
});

export default mongoose.model("Product", productSchema);
