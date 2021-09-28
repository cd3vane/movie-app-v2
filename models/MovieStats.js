const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieStatsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  likes: [
    {
      movieId: {
        type: String,
        required: true
      }
    }
  ],
  watched: [
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
  ],
  watchlist: [
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
  ],
  lists: [
    {
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
    }
  ]
});

module.exports = MovieStats = mongoose.model('moviestats', MovieStatsSchema);
