const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Review = require('../../models/Review');

// @route    POST api/reviews/:movieId
// @desc     Add movie to watchlist
// @access   Private
router.post(
  '/:movie_id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newReview = new Review({
        text: req.body.text,
        movieId: req.params.movie_id,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const review = await newReview.save();

      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(400).json('Server error');
    }
  }
);

// @route  GET api/reviews/user/:user_id
// @desc   Get all reviews from one user
// @access Private
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.user_id }).sort({
      date: -1
    });

    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route  GET api/reviews/movie/:movie_id
// @desc   Get all reviews for one movie
// @access Private
router.get('/movie/:movie_id', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movie_id }).sort({
      likes: -1
    });

    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route  GET api/reviews/:review_id
// @desc   Get all reviews by one user
// @access Private
router.get('/:review_id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.review_id);

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route  DELETE api/reviews/:review_id
// @desc   Delete post by id
// @access Private
router.delete('/:review_id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.review_id);

    if (!review) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await review.remove();

    res.json({ msg: 'Review deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(400).json('Server error');
  }
});

// @route  PUT api/reviews/like/:id
// @desc   Like a post
// @access Private
router.put('/like/:review_id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.review_id);

    // Check if review has been liked by user
    if (
      review.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Review already liked' });
    }

    review.likes.unshift({ user: req.user.id });

    await review.save();

    res.json(review.likes);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route  PUT api/reviews/unlike/:id
// @desc   Unlike a review
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // Check if review has been liked by user
    if (
      review.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Review has not yet been liked' });
    }

    // Get the remove index
    const removeIndex = review.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    review.likes.splice(removeIndex, 1);

    await review.save();

    res.json(review.likes);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// @route  POST api/reviews/comment/:id
// @desc   Comment on a post
// @access Private
router.post(
  '/comment/:review_id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const review = await Review.findById(req.params.review_id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(400).json('Server error');
    }
  }
);

// @route  DELETE api/reviews/comment/:review_id/:comment_id
// @desc   Delete comment by id
// @access Private
router.delete('/comment/:review_id/:comment_id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.review_id);

    // Get comment from review
    const comment = review.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = review.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    review.comments.splice(removeIndex, 1);

    await review.save();

    res.json(review.comments);
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

module.exports = router;
