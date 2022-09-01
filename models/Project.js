const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
    },
  },
  { collection: 'projects' }
);

module.exports = mongoose.model('Project', projectSchema);
