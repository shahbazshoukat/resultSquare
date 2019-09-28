const ResultManager = require("./resultManager");

class ResultController {
  static async createResult(req, res) {
    try {
      const doc = await ResultManager.createResult(req.body);
      res.status(201).json({
        success: true,
        message: "Result Added successfully",
        data: doc._id
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err
      });
    }
  }

  static async getResult(req, res) {
    try {
      const doc = await ResultManager.getResult(req.body.resultId);
      res.status(200).json({
        success: true,
        message: "Result fetched successfully!",
        data: doc
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err
      });
    }
  }

  static async getAllResults(req, res) {
    try {
      const doc = await ResultManager.getAllResults();
      res.status(200).json({
        success: true,
        message: "Results fetched successfully!",
        data: doc
      });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
          });
    }
  }

  static async updateResult(req, res) {
    try {
      const doc = await ResultManager.updateResult(req.body.resultId, req.body.data);
      res.status(200).json({
        success: true,
        message: "Result updated successfully!",
        data: doc
      });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
          });
    }
  }

  static async deleteResult(req, res) {
    try {
      const doc = await ResultManager.deleteResult(req.body.resultId);
      res.status(200).json({ 
        success: true,  
        message: "Result deleted Successfully!" 
    });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
          });
    }
  }
}

module.exports = ResultController;
