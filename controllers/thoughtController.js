const { User, Thought, Reaction } = require('../models');

module.exports = {
    async fetchThoughts(req, res) {
        try {
            const thoughtsData = await Thought.find();
            res.status(200).json(thoughtsData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async fetchSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.id }).select('-___v');
            if (!thoughtData) {
                return res.status(404).json({ message: 'Thought not found with this ID.' });
            }
            res.status(200).json(thoughtData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: thoughtData._id } },
              { new: true }
            );
            if (!user) {
                await Thought.findOneAndRemove({ _id: thoughtData._id });
                return res.status(404).json({ message: 'User not found with this ID.' });
            }
            res.status(200).json(thoughtData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    async modifyThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: 'Thought not found with this ID.' });
            }
            res.status(200).json(thoughtData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndRemove({ _id: req.params.id });
            if (!thoughtData) {
                return res.status(404).json({ message: 'Thought not found with this ID.' });
            }
            await User.findOneAndUpdate(
                { username: req.body.username },
                { $pull: { thoughts: req.params.id } }
            );
            res.status(200).json('Thought deleted successfully.');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async addReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: 'Thought not found with this ID.' });
            }
            res.status(200).json(thoughtData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },
    
    async deleteReaction(req, res) {
      try {
          const thoughtData = await Thought.findOneAndUpdate(
              { _id: req.params.id },
              { $pull: { reactions: { _id: req.params.reactionId } } }
          );
          if (!thoughtData) {
              return res.status(404).json({ message: 'Thought not found with this ID.' });
            }
            res.status(200).json('Reaction successfully removed.');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};