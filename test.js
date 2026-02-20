require('dotenv').config();
const mongoose = require("mongoose");

 // certifique-se que .env está correto
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado ao MongoDB com sucesso!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar:", err.message);
  });
