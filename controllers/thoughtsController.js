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
getSingleThought({ params }, res) ;{
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
}

// POST Thought

createThought({ body }, res) ;{
  Thought.create(body)
  .then(({ _id }) => {
      return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
      );
  })
  .then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(404).json({ message: 'No User found with this ID!' });
          return;
      }
      res.json(dbThoughtData);
  })
  .catch(err => res.json(err));
}

 // PUT thought
 updateThought({ params, body }, res) ;{
  Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
  .then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thoughts found with this ID!' });
          return;
      }
      res.json(dbThoughtData);
  })
  .catch(err => res.json(err));
}