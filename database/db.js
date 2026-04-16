const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://cr7xkunal:lollodon@cluster0.tz4y4ua.mongodb.net/Capstoneproject")

const emotionsschema=mongoose.Schema({
     "gender":String,
     "emotion":String,
     "filePath":String,
     "agegroup":String
})

const languageSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  languages: {
    type: Map,
    of: String,
    required: true
  }
});

const emotions = mongoose.model("emotions",emotionsschema);
const languages = mongoose.model("languages", languageSchema);


module.exports={emotions,languages};
