const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const MovieStats = require('../../models/MovieStats');

// @route    POST api/movie
// @desc     Initialized Movie Stats
// @access   Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select('-password');

    const newMovieStats = new MovieStats({
      user: req.user.id,
      likes: [],
      watched: [],
      watchlist: [],
      lists: []
    });

    const movieStats = await newMovieStats.save();

    res.json(movieStats);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route    POST api/movie/lists
// @desc     Create new custom list
// @access   Private
router.post(
  '/lists',
  auth,
  check('name', 'Name is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const movieStats = await MovieStats.findOne({
        user: req.user.id
      }).populate('user', ['lists']);
      const newList = {
        name: req.body.name,
        description: req.body.description
      };

      movieStats.lists.unshift(newList);

      await movieStats.save();

      res.json(movieStats);
    } catch (err) {
      console.error(err.message);
      res.status(400).json('Server error');
    }
  }
);

// @route    GET api/movie/lists
// @desc     Get all lists
// @access   Private
router.get('/lists', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const movieStats = await MovieStats.findOne({ user: req.user.id }).populate(
      'user',
      ['lists']
    );

    if (!movieStats) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(movieStats.lists);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route    GET api/movie/lists/:list_id
// @desc     Get list by id
// @access   Private
router.get('/lists/:list_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const movieStats = await MovieStats.findOne({ user: req.user.id }).populate(
      'user',
      ['lists']
    );

    const list = movieStats.lists.find(
      (list) => list.id === req.params.list_id
    );

    if (!list) {
      return res.status(400).json({ msg: 'There is no such list' });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route    PUT api/movie/lists
// @desc     Add movie to a list
// @access   Private
router.put(
  '/lists/:list_id',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('movieId', 'MovieId is required').notEmpty(),
  check('poster_path', 'Poster path is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const movieStats = await MovieStats.findOne({
        user: req.user.id
      }).populate('user', ['lists']);

      const list = movieStats.lists.find(
        (list) => list.id === req.params.list_id
      );

      if (!list) {
        return res.status(400).json({ msg: 'There is no such list' });
      }

      list.movies.unshift(req.body);

      await movieStats.save();

      res.json(movieStats.lists);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/movie
// @desc     Get all movie stats
// @access   Private
router.get('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const movieStats = await MovieStats.findOne({ user: req.user.id }).populate(
      'user',
      ['watchlist']
    );

    if (!movieStats) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(movieStats);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route    PUT api/movie/watchlist
// @desc     Add movie to watchlist
// @access   Private
router.put(
  '/watchlist',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('movieId', 'MovieId is required').notEmpty(),
  check('poster_path', 'Poster path is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const movieStats = await MovieStats.findOne({
        user: req.user.id
      }).populate('user', ['watchlist']);

      if (!movieStats) {
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });
      }
      movieStats.watchlist.unshift(req.body);

      await movieStats.save();

      res.json(movieStats);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/movie/watchlist/:movie_id
// @desc     Add movie to watchlist
// @access   Private
router.delete('/watchlist/:movie_id', auth, async (req, res) => {
  try {
    const UserStats = await MovieStats.findOne({ user: req.user.id }).populate(
      'user',
      ['watchlist']
    );
    UserStats.watchlist = UserStats.watchlist.filter(
      (movie) => movie.movieId.toString() !== req.params.movie_id
    );
    await UserStats.save();
    return res.status(200).json(UserStats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT api/movie/watchlist
// @desc     Add movie to watchlist
// @access   Private
router.put(
  '/watched',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('movieId', 'MovieId is required').notEmpty(),
  check('poster_path', 'Poster path is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const movieStats = await MovieStats.findOne({
        user: req.user.id
      }).populate('user', ['watched']);

      if (!movieStats) {
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });
      }
      movieStats.watched.unshift(req.body);

      await movieStats.save();

      res.json(movieStats);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/movie/watchlist/:movie_id
// @desc     Add movie to watchlist
// @access   Private
router.delete('/watched/:movie_id', auth, async (req, res) => {
  try {
    const UserStats = await MovieStats.findOne({ user: req.user.id }).populate(
      'user',
      ['watched']
    );
    UserStats.watched = UserStats.watched.filter(
      (movie) => movie.movieId.toString() !== req.params.movie_id
    );
    await UserStats.save();
    return res.status(200).json(UserStats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT api/movie/watchlist
// @desc     Add movie to watchlist
// @access   Private
router.put(
  '/like',
  auth,
  check('movieId', 'MovieId is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const movieStats = await MovieStats.findOne({
        user: req.user.id
      }).populate('user', ['likes']);

      if (!movieStats) {
        return res
          .status(400)
          .json({ msg: 'There are no stats for this user' });
      }
      movieStats.likes.unshift(req.body);

      await movieStats.save();

      res.json(movieStats);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/movie/watchlist/:movie_id
// @desc     Add movie to watchlist
// @access   Private
router.put('/unlike/:movie_id', auth, async (req, res) => {
  try {
    const UserStats = await MovieStats.findOne({ user: req.user.id }).populate(
      'user',
      ['likes']
    );
    UserStats.likes = UserStats.likes.filter(
      (movie) => movie.movieId.toString() !== req.params.movie_id
    );
    await UserStats.save();
    return res.status(200).json(UserStats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
