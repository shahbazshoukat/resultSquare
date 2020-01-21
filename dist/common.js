(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/services/board.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/board.service.ts ***!
  \*******************************************/
/*! exports provided: BoardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardService", function() { return BoardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BoardService = /** @class */ (function () {
    function BoardService(http) {
        this.http = http;
    }
    BoardService.prototype.addBoard = function (_id, key, title, province, city, examTypes, sections, type, webUrl, resultUrl, tags) {
        var boardData = {
            _id: _id,
            key: title.replace(/\s/g, '-'),
            title: title,
            province: province,
            city: city,
            examTypes: examTypes,
            sections: sections,
            type: type,
            webUrl: webUrl,
            resultUrl: resultUrl,
            tags: tags
        };
        return this.http.post('/api/board', boardData);
    };
    BoardService.prototype.getAllBoardes = function () {
        return this.http.get('/api/boards');
    };
    BoardService.prototype.getBoardById = function (boardId) {
        return this.http.get('/api/board/' + boardId);
    };
    BoardService.prototype.getBoardByKey = function (boardKey) {
        return this.http.get('/api/getBoard/' + boardKey);
    };
    BoardService.prototype.getBoardBySectionTitle = function (sectionTitle) {
        return this.http.get('/api/getBoardBySectionTitle/' + sectionTitle);
    };
    BoardService.prototype.updateBoard = function (boardId, key, title, province, city, examTypes, sections, type, webUrl, resultUrl, tags) {
        var update = {
            key: title.replace(/\s/g, '-'),
            title: title,
            province: province,
            city: city,
            examTypes: examTypes,
            sections: sections,
            type: type,
            webUrl: webUrl,
            resultUrl: resultUrl,
            tags: tags
        };
        return this.http.put('/api/updateBoard/' + boardId, update);
    };
    BoardService.prototype.deleteBoard = function (boardId) {
        return this.http.delete('/api/deleteBoard/' + boardId);
    };
    BoardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], BoardService);
    return BoardService;
}());



/***/ }),

/***/ "./src/app/services/class.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/class.service.ts ***!
  \*******************************************/
/*! exports provided: ClassService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassService", function() { return ClassService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ClassService = /** @class */ (function () {
    function ClassService(http) {
        this.http = http;
    }
    ClassService.prototype.addClass = function (title, type) {
        var classData = { title: title, type: type };
        return this.http.post('/api/section', classData);
    };
    ClassService.prototype.getAllClasses = function () {
        return this.http.get('/api/sections');
    };
    ClassService.prototype.getClassById = function (classId) {
        return this.http.get('/api/section' + classId);
    };
    ClassService.prototype.getClassByTitle = function (title) {
        return this.http.get('/api/getSection' + title);
    };
    ClassService.prototype.updateClass = function (classId, title, type) {
        var update = { title: title, type: type };
        return this.http.put('/api/updateSection' + classId, update);
    };
    ClassService.prototype.deleteClass = function (classId) {
        return this.http.delete('/api/deleteSection' + classId);
    };
    ClassService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ClassService);
    return ClassService;
}());



/***/ }),

/***/ "./src/app/services/result.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/result.service.ts ***!
  \********************************************/
/*! exports provided: ResultService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultService", function() { return ResultService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResultService = /** @class */ (function () {
    function ResultService(http) {
        this.http = http;
    }
    ResultService.prototype.addResult = function (_id, status, section, board, year, announceDate, examType, resultUrl, tags) {
        var resultData = {
            _id: _id,
            status: status,
            sectionId: section,
            boardId: board,
            year: year,
            announceDate: announceDate,
            examType: examType,
            resultUrl: resultUrl,
            tags: tags
        };
        return this.http.post('/api/result', resultData);
    };
    ResultService.prototype.getAllResultes = function () {
        return this.http.get('/api/results');
    };
    ResultService.prototype.getResultById = function (resultId) {
        return this.http.get('/api/result/' + resultId);
    };
    ResultService.prototype.getResultYears = function (selectedClass, selectedBoardKey) {
        return this.http.get("/api/result-year/" + selectedClass + "/" + selectedBoardKey);
    };
    ResultService.prototype.getResult = function (section, board, year, exam) {
        return this.http.get("/api/result/" + section + "/" + board + "/" + year + "/" + exam);
    };
    ResultService.prototype.getResultsByBoardKey = function (boardKey) {
        return this.http.get("/api/results/board/" + boardKey);
    };
    ResultService.prototype.updateResult = function (resultId, status, section, boardId, year, announceDate, examType, resultUrl, tags) {
        var update = {
            status: status,
            sectionId: section,
            boardId: boardId,
            year: year,
            announceDate: announceDate,
            examType: examType,
            resultUrl: resultUrl,
            tags: tags
        };
        return this.http.put('/api/updateResult/' + resultId, update);
    };
    ResultService.prototype.deleteResult = function (resultId) {
        return this.http.delete('/api/deleteResult/' + resultId);
    };
    ResultService.prototype.changeResultStatus = function (resultId, value) {
        var update = { status: value };
        return this.http.put('/api/updateStatus/' + resultId, update);
    };
    ResultService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ResultService);
    return ResultService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map