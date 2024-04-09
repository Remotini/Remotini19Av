import mongoose from "mongoose";

const CorbeilleSchema = new mongoose.Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: "Rapport" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Corbeille = mongoose.model("Corbeille", CorbeilleSchema);
export default Corbeille;
