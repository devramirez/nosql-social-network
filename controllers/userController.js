const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
// Creating User Controller to handle our routes
const userController = {
  // GET users
  getUsers(req, res) {
    User.find({})
    // Select excludes data in Mongo and -__v is versions which is not required in this application
    .select('-__v')
    // This sorts data in descending order
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
},
}
// GET user by ID
getSingleUser({ params }, res) ;{
  User.findOne({ _id: params.userId })
  // Populates the user with thoughts and friends data
  .populate({
      path: 'thoughts',
      select: '-__v'
  })
  .populate({
      path: 'friends',
      select: '-__v'
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this ID!'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
}

// POST user
createUser({ body }, res) ;{
  // create method
  User.create(body)
  .then(dbUserData => res.json(dbUserData))
  .catch(err => res.json(err));
}

//PUT user
updateUser({ params, body }, res) ;{
  // findOneAndUpdate method
  // new: true returns updated document after its been updated
  // runValidators: true runs validation as specified in model
  User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this ID!' });
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => res.json(err));
}