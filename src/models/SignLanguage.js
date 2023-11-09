const { default: mongoose } = require("mongoose");

const signLanguageSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  type: String,
  images: {
    type: Array,
    default: [],
  },
  video: {
    type: String,
  },
});

const SignLanguage = mongoose.model("SignLanguage", signLanguageSchema);

module.exports = SignLanguage;
