const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
  title:{ type: String, required: true},
  type:{ type: String, require: false}
});

module.exports = mongoose.model('Class', classSchema);
