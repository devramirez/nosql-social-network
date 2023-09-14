const { Schema, model, Types } = require('mongoose');

const moment = require('moment'); // require moment.js
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
      // default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Model for Thoughts
const thoughtsSchema = new Schema(
  {
      thoughtText: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 280,
      },
      createdAt: {
          // Moment.js time stamp
          type: Date,
          default: Date.now,
          get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
      username: {
          type: String,
          required: true,
      },
      reactions: [reactionSchema]
  },
  {
      toJSON: {
          virtuals: true,
          getters: true
      },
      id: false
  }
);

// Connecting thoughts schema
thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;
