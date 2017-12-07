require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.DATABASE_URL);

let jepretSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  image: String,
  imageurl: String,
  caption: String,
  love: []
});

let Jepret = mongoose.model('Jepret', jepretSchema);

module.exports = Jepret;
