const router = require('express').Router();
const {
    fetchThoughts,
    fetchSingleThought,
    createThought,
    modifyThought,
    deleteThought,
    addReaction,
    deleteReaction
  } = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(fetchThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(fetchSingleThought)
    .put(modifyThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
