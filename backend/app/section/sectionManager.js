const SectionHandler = require("./sectionHandler");

class SectionManager {
  static async createSection(data) {
    try {
        const doc = await SectionHandler.createSection(data);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getSection(sectionId) {
    try {
        const doc = await SectionHandler.getSection(sectionId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllSections() {
    try {
        const doc = await SectionHandler.getAllSections();
        return doc;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateSection(sectionId, data) {
    try {
        const doc = await SectionHandler.updateSection(sectionId, data);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
 
  static async deleteSection(sectionId) {
    try {
        const doc = await SectionHandler.deleteSection(sectionId);
        if(doc){
          return { 
            success: true,  
            message: "Section deleted Successfully!",
            data: doc
          };
        }
        return {
          success: false,  
          message: "Failed to delete Section",
          data: null 
        }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = SectionManager;
