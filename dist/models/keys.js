import mongoose, { Schema } from 'mongoose';
const KeysSchema = new Schema({
    keys: { type: [String], required: true },
    current: { type: Number, required: true, default: 0 },
    next: { type: Number, required: true, default: 1 }
}, {
    timestamps: true
});
export default mongoose.model('Keys', KeysSchema);
//# sourceMappingURL=keys.js.map