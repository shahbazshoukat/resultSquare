const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
  title:{ type: String, required: true},
  province:{ type: String, require: false},
  city:{ type: String, require: false},
  examTypes: [
    {type: String, require: false} // 0 = annual, 1 = supply, 2 = test, 3 = retotal
  ],
  classes:[
    { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: false}
  ],
  apiMode:{ type: Number, require: false}, //0 = api, 1 = scrapping, 2 = url
  webUrl:{type: String, required: true},
  resultUrl:{type: String, required: true},
  apiUrl:{type: String, required: true},
  requestType: {type: Number, require: false}, //0 = GET, 1 = POST
  apiParams: [
    { type: String, require: false}
  ],
  tags: [
    { type: String, require: false}
  ]
});

module.exports = mongoose.model('Board', boardSchema);
