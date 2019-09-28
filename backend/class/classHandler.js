const Class = require("./class");

class ClassHandler {
  static createClass(data) {
    const Class = new Class({
      title: data.title,
      type: data.type
    });
    return Class.save();
  }

  static getClass(classId) {
    const q = { _id: classId };
    return Class.find(q)
      .lean()
      .exec();
  }

  static getAllClasses() {
    return Class.find()
      .lean()
      .exec();
  }

  static updateClass(classId, data) {
    const q = { _id: classId };
    const update = {
      title: data.title,
      type: data.type
    };
    return Class.updateOne(q, update);
  }


  static deleteClass(classId) {
    const q = { _id: classId};
    return Class.deleteOne(q);
  }
}

module.exports = ClassHandler;
