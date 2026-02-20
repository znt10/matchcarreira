import mongoose from "mongoose"

const FavoritoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  vagaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vaga",
    required: true
  }
})

export default mongoose.models.Favorito || mongoose.model("Favorito", FavoritoSchema)