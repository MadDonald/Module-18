const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        const users = await User.find().catch(err => res.status(500).json({ message: err.message }));
        res.json(users);
    },

    async getSingleUser(req, res) {
        const { userId: _id } = req.params;
        const user = await User.findOne({ _id }).select('-___v').catch(err => res.status(500).json({ message: err.message }));

        if (!user) return res.status(400).json({ message: `No user with ID ${_id} found` });

        res.json(user);
    },

    async createUser(req, res) {
        const user = await User.create(req.body).catch(err => res.status(500).json({ message: err.message }));
        res.json(user);
    },

    async updateUser(req, res) {
        const { userId: _id } = req.params;
        const user = await User.findOneAndUpdate({ _id }, { $set: req.body }, { runValidators: true, new: true }).catch(err => res.status(500).json({ message: err.message }));

        if (!user) return res.status(400).json({ message: `No user with ID ${_id} found` });

        res.json(user);
    },

    async deleteUser(req, res) {
        const { userId: _id } = req.params;
        let user;
        try {
            user = await User.findOne({ _id });
            if (!user) {
                return res.status(400).json({ message: 'No user with that ID found' });
            }
            await User.deleteOne({ _id });
        } catch (err) {
            return res.status(500).json(err);
        }
    
        try {
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json("User deleted!");
        } catch (err) {
            res.status(500).json(err);
        }
    },    

    async addFriend(req, res) {
        const { userId: _id } = req.params;
        const friendId = req.body?._id;
        const user = await User.findOneAndUpdate({ _id }, { $addToSet: { friends: friendId } }, { new: true }).catch(err => res.status(500).json({ message: err.message }));

        if (!user) return res.status(404).json({ message: `No user with ID ${_id} found` });

        res.json({ message: 'New friend added!' });
    },

    async deleteFriend(req, res) {
        const { userId: _id } = req.params;
        const friendId = req.body?._id;
        const user = await User.findOneAndUpdate({ _id }, { $pull: { friends: friendId } }).catch(err => res.status(500).json({ message: err.message }));

        if (!user) return res.status(400).json({ message: `No user with ID ${_id} found` });

        res.json({ message: "Friend removed!" });
    }
};
