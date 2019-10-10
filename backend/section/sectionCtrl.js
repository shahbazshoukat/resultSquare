const SectionManager = require("./sectionManager");

class SectionController {
  static async createSection(req, res) {
    try {
      const doc = await SectionManager.createSection(req.body);
      res.status(201).json({
        success: true,
        message: "Section Added successfully",
        data: doc._id
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: err,
        data: null
      });
    }
  }
  static async getSection(req, res) {
    try {
      const doc = await SectionManager.getSection(req.body.sectionId);
      res.status(200).json({
        success: true,
        message: "Section fetched successfully!",
        data: doc
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: err,
        data: null
      });
    }
  }
  static async getAllSections(req, res) {
    try {
      const doc = await SectionManager.getAllSections();
      res.status(200).json({
        success: true,
        message: "Sections fetched successfully!",
        data: doc
      });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err,
            data: null
          });
    }
  }

  static async updateSection(req, res) {
    try {
      const doc = await SectionManager.updateSection(req.params.sectionId, req.body);
      res.status(200).json({
        success: true,
        message: "Section updated successfully!",
        data: doc
      });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err,
            data: null
          });
    }
  }

  static async deleteSection(req, res) {
    try {
      const doc = await SectionManager.deleteSection(req.params.sectionId);
      res.status(200).json(doc);
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err,
            data: null
          });
    }
  }
}

module.exports = SectionController;
