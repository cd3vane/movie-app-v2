const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
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
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
