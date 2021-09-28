const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  movies: [
    {
      title: {
        type: String,
        required: true
      },
      movieId: {
        type: String,
        required: true
      },
      poster_path: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

module.exports = Lists = mongoose.model('lists', ListsSchema);
