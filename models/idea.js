const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
  material: String,
  ideas: [String],
  videoLinks: [String],
});

const Idea = mongoose.model("Idea", ideaSchema);
module.exports = Idea;
