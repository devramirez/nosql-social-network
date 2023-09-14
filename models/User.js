const { Schema, model } = require('mongoose');
const moment = require('moment');

// Schema to create a course model
const courseSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [
      {
       type: Schema.Types.ObjectId,
      ref: 'Thought', 
      }
    ],
    // friends model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function (){
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
