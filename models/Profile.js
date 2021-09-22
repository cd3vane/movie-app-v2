const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },
  location: {
    type: String
  },
  watchlist: [
    {
      title: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      },
      poster: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
