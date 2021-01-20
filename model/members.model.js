const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Empty Member name cannot be allowed']
  },
  email: {
    type: String,
    required: [true, 'Empty Member email cannot be allowed']
  },
  status: {
    type: String,
    required: [true, 'Empty Member status cannot be allowed']
  },
});

const Member = mongoose.model('Member', memberSchema); // if Members doesn't exist, mongoose will create db

module.exports = Member;
