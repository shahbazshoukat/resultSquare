const ClassManager = require("./classManager");

class ClassController {
  static async createClass(req, res) {
    try {
      const doc = await ClassManager.createClass(req.body);
      res.status(201).json({
        success: true,
        message: "Class Added successfully",
        data: doc._id
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: err
      });
    }
  }
  static async getClass(req, res) {
    try {
      const doc = await ClassManager.getClass(req.body.classId);
      res.status(200).json({
        success: true,
        message: "Class fetched successfully!",
        data: doc
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: err
      });
    }
  }
  static async getAllClasses(req, res) {
    try {
      const doc = await ClassManager.getAllClasses();
      res.status(200).json({
        success: true,
        message: "Classes fetched successfully!",
        data: doc
      });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err
          });
    }
  }

  static async updateClass(req, res) {
    try {
      const doc = await ClassManager.updateClass(req.body.classId, req.body.data);
      res.status(200).json({
        success: true,
        message: "Class updated successfully!",
        data: doc
      });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err
          });
    }
  }

  static async deleteClass(req, res) {
    try {
      const doc = await ClassManager.deleteClass(req.body.classId);
      res.status(200).json({ 
        success: true,  
        message: "Class deleted Successfully!" 
    });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err
          });
    }
  }
}

module.exports = ClassController;
