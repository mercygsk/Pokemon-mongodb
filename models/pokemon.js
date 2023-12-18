const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
});

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

module.exports = Pokemon;