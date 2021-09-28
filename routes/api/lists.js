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
      const lists = await Lists.findOne({
        user: req.user.id
      });
      const newLists = {
        name: req.body.name,
        description: req.body.description
      };

      lists.lists.unshift(newLists);

      await lists.save();

      res.json(lists);
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
    const lists = await Lists.find({});

    if (!lists) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
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
router.get('/:list_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const list = await Lists.findOne({ _id: req.params.list_id });

    if (!list) {
      return res.status(400).json({ msg: 'There is no such list' });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route    PUT api/lists/:list_id
// @desc     Add movie to a list
// @access   Private
router.put(
  '/:list_id',
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
      const list = await Lists.findOne({ _id: req.params.list_id });

      if (!list) {
        return res.status(400).json({ msg: 'There is no such list' });
      }

      list.movies.unshift(req.body);

      await lists.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
