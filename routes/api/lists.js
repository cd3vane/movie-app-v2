const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Lists = require('../../models/Lists');

// @route    POST api/lists/
// @desc     Create new custom list
// @access   Private
router.post(
  '/',
  auth,
  check('name', 'Name is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newList = new Lists({
        user: req.user.id,
        name: req.body.name,
        description: req.body.description
      });

      list = await newList.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(400).json('Server error');
    }
  }
);

// @route    GET api/lists
// @desc     Get all lists
// @access   Private
router.get('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const lists = await Lists.find();

    if (!lists) {
      return res.status(400).json({ msg: 'There are no lists for this user' });
    }
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route    GET api/lists/:user_id
// @desc     Get all lists by user
// @access   Private
router.get('/user/:user_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const lists = await Lists.find({ user: req.params.user_id });

    if (!lists) {
      return res.status(400).json({ msg: 'There are no lists for this user' });
    }
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route    GET api/lists/:list_id
// @desc     Get list by id
// @access   Private
router.get('/list/:list_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const list = await Lists.findOne({ _id: req.params.list_id });

    if (!list) {
      return res.status(400).json({ msg: 'There is no such list' });
    }

    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route    PUT api/lists/list/:list_id
// @desc     Add movie to a list
// @access   Private
router.put(
  '/list/:list_id',
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
      const list = await Lists.findById(req.params.list_id);

      if (!list) {
        return res.status(400).json({ msg: 'There is no such list' });
      }

      if (list.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      list.movies.unshift(req.body);

      await list.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    Delete api/lists/list/:list_id/movie/:movie_id
// @desc     Delete a movie from a list
// @access   Private
router.delete('/list/:list_id/:movie_id', auth, async (req, res) => {
  try {
    const list = await Lists.findById(req.params.list_id);

    // Get comment from review
    const movie = list.movies.find(
      (movie) => movie.movieId === req.params.movie_id
    );

    // Make sure comment exists
    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = list.movies
      .map((movie) => movie.movieId)
      .indexOf(req.params.movie_id);

    list.movies.splice(removeIndex, 1);

    await list.save();

    res.json(list.movies);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route    DELETE api/lists/:list_id
// @desc     Delete a list
// @access   Private
router.delete('/:list_id', auth, async (req, res) => {
  try {
    const list = await Lists.findById({ _id: req.params.list_id }).populate(
      'user',
      'name'
    );

    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }

    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (
      list.name === 'Watchlist' ||
      list.name === 'Watched' ||
      list.name === 'Liked'
    ) {
      return res.status(401).json({ msg: 'Default lists cannot be deleted' });
    }

    await list.remove();

    res.json({ msg: 'List deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(400).json('Server error');
  }
});

module.exports = router;
