const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  likes: [
    {
      movieId: {
        type: String,
        required: true
      },
      users: [
        {
          user: {
            type: Schema.Types.ObjectId
          }
        }
      ]
    }
  ],
  watchlist: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      title: {
        type: String,
        required: true
      },
      id: {
        type: Number,
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
  ],
  list: [
    {
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
          id: {
            type: Number,
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
    }
  ]
});

module.exports = Movie = mongoose.model('movie', MovieSchema);
