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
        message: err,
        data: null
      });
    }
  }

  static async getResult(req, res) {
    try {
      const doc = await ResultManager.getResult(req.params.resultId);
      res.status(200).json({
        success: true,
        message: "Result fetched successfully!",
        data: doc
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err,
        data: null
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
            message: err,
            data: null
          });
    }
  }

  static async updateResult(req, res) {
    try {
      const doc = await ResultManager.updateResult(req.params.resultId, req.body);
      res.status(200).json({
        success: true,
        message: "Result updated successfully!",
        data: doc
      });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err,
            data: null
          });
    }
  }

  static async updateResultStatus(req, res) {
    try {
      const doc = await ResultManager.updateResultStatus(req.params.resultId, req.body);
      res.status(200).json({
        success: true,
        message: "Result Status updated successfully!",
        data: doc
      });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err,
            data: null
          });
    }
  }

  static async deleteResult(req, res) {
    try {
      const doc = await ResultManager.deleteResult(req.params.resultId);
      res.status(200).json(doc);
    } catch (err) {
       console.log(err);
    }
  }
}

module.exports = ResultController;
