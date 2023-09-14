const { User, Thought } = require('../models');

// Creates thoughts controller
const thoughtsController = {

    // GET thoughts
    getThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

  }

// GET thought by ID
getSingleThought({ params }, res) {
  Thought.findOne({ _id: params.thoughtId })
  .populate({
      path: 'reactions',
      select: '-__v'
  })
  .select('-__v')
  .sort({ _id: -1 })
  .then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thoughts found with this ID!' });
          return;
      }
      res.json(dbThoughtData);
  })
  .catch(err => {
      console.log(err);
      res.sendStatus(400);
  });
},