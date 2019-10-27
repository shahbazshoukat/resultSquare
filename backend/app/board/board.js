const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({

  title:{ 
    type: String, 
    required: false
  },

  province:{
    type: String, 
    require: false
  },

  city:{ 
    type: String, 
    require: false
  },

  examTypes: [
    {
      type: Object, 
      require: false
    } // 0 = annual, 1 = supply, 2 = test, 3 = retotal
  ],

  sections:[
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Section", 
      required: false
    }
  ],

  apiMode:{ 
    type: Number, 
    require: false
  }, //0 = api, 1 = scrapping, 2 = url

  webUrl:{
    type: String, 
    required: false
  },

  resultUrl:{
    type: String, 
    required: false
  },

  apiUrl:{
    type: String, 
    required: false
  },

  requestType: {
    type: Number, 
    require: false
  }, //0 = GET, 1 = POST

  apiParams: [
    { 
      type: String, 
      require: false
    }
  ],

  tags: [
    { 
      type: String, 
      require: false
    }
  ]

},{
  timestamps: true,
  versionKey: false
}
);

module.exports = mongoose.model('Board', boardSchema);
