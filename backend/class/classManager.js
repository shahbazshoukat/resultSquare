const ClassHandler = require("./classHandler");

class ClassManager {
  static async createClass(data) {
    try {
        const doc = await ClassHandler.createClass(data);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getClass(classId) {
    try {
        const doc = await ClassHandler.getClass(classId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllClasses() {
    try {
        const doc = await ClassHandler.getAllClasses();
        return doc;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateClass(classId, data) {
    try {
        const doc = await ClassHandler.updateClass(classId, data);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
 
  static async deleteClass(classId) {
    try {
        const doc = await ClassHandler.deleteClass(classId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ClassManager;
