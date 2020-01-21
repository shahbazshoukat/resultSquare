(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-home-layout-home-layout-module"],{

/***/ "./node_modules/ngx-print/fesm5/ngx-print.js":
/*!***************************************************!*\
  !*** ./node_modules/ngx-print/fesm5/ngx-print.js ***!
  \***************************************************/
/*! exports provided: NgxPrintDirective, NgxPrintModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxPrintDirective", function() { return NgxPrintDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxPrintModule", function() { return NgxPrintModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxPrintDirective = /** @class */ (function () {
    function NgxPrintDirective() {
        this._printStyle = [];
        /**
         *
         *
         * \@memberof NgxPrintDirective
         */
        this.useExistingCss = false;
        /**
         *
         *
         * @return html for the given tag
         *
         * \@memberof NgxPrintDirective
         */
        this._styleSheetFile = '';
    }
    Object.defineProperty(NgxPrintDirective.prototype, "printStyle", {
        /**
         *
         *
         * @memberof NgxPrintDirective
         */
        set: /**
         *
         *
         * \@memberof NgxPrintDirective
         * @param {?} values
         * @return {?}
         */
        function (values) {
            for (var key in values) {
                if (values.hasOwnProperty(key)) {
                    this._printStyle.push((key + JSON.stringify(values[key])).replace(/['"]+/g, ''));
                }
            }
            this.returnStyleValues();
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     *
     * @returns the string that create the stylesheet which will be injected
     * later within <style></style> tag.
     *
     * -join/replace to transform an array objects to css-styled string
     *
     * @memberof NgxPrintDirective
     */
    /**
     *
     *
     * \@memberof NgxPrintDirective
     * @return {?} the string that create the stylesheet which will be injected
     * later within <style></style> tag.
     *
     * -join/replace to transform an array objects to css-styled string
     *
     */
    NgxPrintDirective.prototype.returnStyleValues = /**
     *
     *
     * \@memberof NgxPrintDirective
     * @return {?} the string that create the stylesheet which will be injected
     * later within <style></style> tag.
     *
     * -join/replace to transform an array objects to css-styled string
     *
     */
    function () {
        return "<style> " + this._printStyle.join(' ').replace(/,/g, ';') + " </style>";
    };
    Object.defineProperty(NgxPrintDirective.prototype, "styleSheetFile", {
        /**
         * @memberof NgxPrintDirective
         * @param cssList
         */
        set: /**
         * \@memberof NgxPrintDirective
         * @param {?} cssList
         * @return {?}
         */
        function (cssList) {
            var e_1, _a;
            /** @type {?} */
            var linkTagFn = (/**
             * @param {?} cssFileName
             * @return {?}
             */
            function (cssFileName) {
                return "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + cssFileName + "\">";
            });
            if (cssList.indexOf(',') !== -1) {
                /** @type {?} */
                var valueArr = cssList.split(',');
                try {
                    for (var valueArr_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(valueArr), valueArr_1_1 = valueArr_1.next(); !valueArr_1_1.done; valueArr_1_1 = valueArr_1.next()) {
                        var val = valueArr_1_1.value;
                        this._styleSheetFile = this._styleSheetFile + linkTagFn(val);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (valueArr_1_1 && !valueArr_1_1.done && (_a = valueArr_1.return)) _a.call(valueArr_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                this._styleSheetFile = linkTagFn(cssList);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @returns string which contains the link tags containing the css which will
     * be injected later within <head></head> tag.
     *
     */
    /**
     * @private
     * @return {?} string which contains the link tags containing the css which will
     * be injected later within <head></head> tag.
     *
     */
    NgxPrintDirective.prototype.returnStyleSheetLinkTags = /**
     * @private
     * @return {?} string which contains the link tags containing the css which will
     * be injected later within <head></head> tag.
     *
     */
    function () {
        return this._styleSheetFile;
    };
    /**
     * @private
     * @param {?} tag
     * @return {?}
     */
    NgxPrintDirective.prototype.getElementTag = /**
     * @private
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        /** @type {?} */
        var html = [];
        /** @type {?} */
        var elements = document.getElementsByTagName(tag);
        for (var index = 0; index < elements.length; index++) {
            html.push(elements[index].outerHTML);
        }
        return html.join('\r\n');
    };
    /**
     *
     *
     * @memberof NgxPrintDirective
     */
    /**
     *
     *
     * \@memberof NgxPrintDirective
     * @return {?}
     */
    NgxPrintDirective.prototype.print = /**
     *
     *
     * \@memberof NgxPrintDirective
     * @return {?}
     */
    function () {
        /** @type {?} */
        var printContents;
        /** @type {?} */
        var popupWin;
        /** @type {?} */
        var styles = '';
        /** @type {?} */
        var links = '';
        if (this.useExistingCss) {
            styles = this.getElementTag('style');
            links = this.getElementTag('link');
        }
        printContents = document.getElementById(this.printSectionId).innerHTML;
        popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>" + (this.printTitle ? this.printTitle : "") + "</title>\n          " + this.returnStyleValues() + "\n          " + this.returnStyleSheetLinkTags() + "\n          " + styles + "\n          " + links + "\n        </head>\n        <body onload=\"window.print(); setTimeout(()=>{ window.close(); }, 0)\">\n          " + printContents + "\n        </body>\n      </html>");
        popupWin.document.close();
    };
    NgxPrintDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "button[ngxPrint]"
                },] }
    ];
    NgxPrintDirective.propDecorators = {
        printSectionId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        printTitle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        useExistingCss: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        printStyle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        styleSheetFile: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        print: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['click',] }]
    };
    return NgxPrintDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxPrintModule = /** @class */ (function () {
    function NgxPrintModule() {
    }
    NgxPrintModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [NgxPrintDirective],
                    imports: [],
                    exports: [NgxPrintDirective]
                },] }
    ];
    return NgxPrintModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-print.js.map

/***/ }),

/***/ "./src/app/app.enums.ts":
/*!******************************!*\
  !*** ./src/app/app.enums.ts ***!
  \******************************/
/*! exports provided: PROVINCE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROVINCE", function() { return PROVINCE; });
var PROVINCE;
(function (PROVINCE) {
    PROVINCE["PUNJAB"] = "Punjab";
    PROVINCE["KPK"] = "KPK";
    PROVINCE["SINDH"] = "Sindh";
    PROVINCE["BALOCHISTAN"] = "Balochistan";
    PROVINCE["AJK"] = "AJK";
    PROVINCE["FEDERAL"] = "Federal";
})(PROVINCE || (PROVINCE = {}));


/***/ }),

/***/ "./src/app/layouts/home-layout/home-layout.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/layouts/home-layout/home-layout.module.ts ***!
  \***********************************************************/
/*! exports provided: playerFactory, HomeLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerFactory", function() { return playerFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeLayoutModule", function() { return HomeLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _home_layout_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home-layout.routing */ "./src/app/layouts/home-layout/home-layout.routing.ts");
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pages/home/home.component */ "./src/app/pages/home/home.component.ts");
/* harmony import */ var _pages_select_board_select_board_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pages/select-board/select-board.component */ "./src/app/pages/select-board/select-board.component.ts");
/* harmony import */ var _pages_select_year_select_year_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pages/select-year/select-year.component */ "./src/app/pages/select-year/select-year.component.ts");
/* harmony import */ var _pages_select_exam_select_exam_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../pages/select-exam/select-exam.component */ "./src/app/pages/select-exam/select-exam.component.ts");
/* harmony import */ var _pages_enter_rollno_enter_rollno_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../pages/enter-rollno/enter-rollno.component */ "./src/app/pages/enter-rollno/enter-rollno.component.ts");
/* harmony import */ var _pages_result_page_result_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../pages/result-page/result-page.component */ "./src/app/pages/result-page/result-page.component.ts");
/* harmony import */ var _pages_select_sub_class_select_sub_class_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../pages/select-sub-class/select-sub-class.component */ "./src/app/pages/select-sub-class/select-sub-class.component.ts");
/* harmony import */ var ngx_print__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-print */ "./node_modules/ngx-print/fesm5/ngx-print.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _pipes__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../pipes */ "./src/app/pipes/index.ts");
/* harmony import */ var ngx_lottie__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-lottie */ "./node_modules/ngx-lottie/fesm5/ngx-lottie.js");
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! lottie-web */ "./node_modules/lottie-web/build/player/lottie.js");
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(lottie_web__WEBPACK_IMPORTED_MODULE_17__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















// import { ToastrModule } from 'ngx-toastr';



function playerFactory() {
    return lottie_web__WEBPACK_IMPORTED_MODULE_17___default.a;
}
var HomeLayoutModule = /** @class */ (function () {
    function HomeLayoutModule() {
    }
    HomeLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_home_layout_routing__WEBPACK_IMPORTED_MODULE_5__["HomeLayoutRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__["NgbModule"],
                ngx_lottie__WEBPACK_IMPORTED_MODULE_16__["LottieModule"].forRoot({ player: playerFactory, useCache: true }),
                ngx_print__WEBPACK_IMPORTED_MODULE_13__["NgxPrintModule"]
            ],
            declarations: [
                _pages_home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"],
                _pages_select_board_select_board_component__WEBPACK_IMPORTED_MODULE_7__["SelectBoardComponent"],
                _pages_select_year_select_year_component__WEBPACK_IMPORTED_MODULE_8__["SelectYearComponent"],
                _pages_select_exam_select_exam_component__WEBPACK_IMPORTED_MODULE_9__["SelectExamComponent"],
                _pages_enter_rollno_enter_rollno_component__WEBPACK_IMPORTED_MODULE_10__["EnterRollNoComponent"],
                _pages_result_page_result_page_component__WEBPACK_IMPORTED_MODULE_11__["ResultPageComponent"],
                _pages_select_sub_class_select_sub_class_component__WEBPACK_IMPORTED_MODULE_12__["SelectSubClassComponent"],
                _pipes__WEBPACK_IMPORTED_MODULE_15__["SafePipe"]
            ]
        })
    ], HomeLayoutModule);
    return HomeLayoutModule;
}());



/***/ }),

/***/ "./src/app/layouts/home-layout/home-layout.routing.ts":
/*!************************************************************!*\
  !*** ./src/app/layouts/home-layout/home-layout.routing.ts ***!
  \************************************************************/
/*! exports provided: HomeLayoutRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeLayoutRoutes", function() { return HomeLayoutRoutes; });
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/home/home.component */ "./src/app/pages/home/home.component.ts");
/* harmony import */ var _pages_select_board_select_board_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages/select-board/select-board.component */ "./src/app/pages/select-board/select-board.component.ts");
/* harmony import */ var _pages_select_year_select_year_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/select-year/select-year.component */ "./src/app/pages/select-year/select-year.component.ts");
/* harmony import */ var _pages_select_exam_select_exam_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pages/select-exam/select-exam.component */ "./src/app/pages/select-exam/select-exam.component.ts");
/* harmony import */ var _pages_enter_rollno_enter_rollno_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pages/enter-rollno/enter-rollno.component */ "./src/app/pages/enter-rollno/enter-rollno.component.ts");
/* harmony import */ var _pages_select_sub_class_select_sub_class_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pages/select-sub-class/select-sub-class.component */ "./src/app/pages/select-sub-class/select-sub-class.component.ts");






var HomeLayoutRoutes = [
    { path: '', component: _pages_home_home_component__WEBPACK_IMPORTED_MODULE_0__["HomeComponent"] },
    { path: 'result/:classTitle', component: _pages_select_board_select_board_component__WEBPACK_IMPORTED_MODULE_1__["SelectBoardComponent"] },
    { path: 'result/:classTitle/:boardKey', component: _pages_select_year_select_year_component__WEBPACK_IMPORTED_MODULE_2__["SelectYearComponent"] },
    { path: 'result/:classTitle/:boardKey/:year', component: _pages_select_exam_select_exam_component__WEBPACK_IMPORTED_MODULE_3__["SelectExamComponent"] },
    { path: 'result/:classTitle/:boardKey/:year/:examType', component: _pages_enter_rollno_enter_rollno_component__WEBPACK_IMPORTED_MODULE_4__["EnterRollNoComponent"] },
    { path: 'test/:testTitle', component: _pages_enter_rollno_enter_rollno_component__WEBPACK_IMPORTED_MODULE_4__["EnterRollNoComponent"] },
    { path: 'uni/:classTitle/:uniKey', component: _pages_enter_rollno_enter_rollno_component__WEBPACK_IMPORTED_MODULE_4__["EnterRollNoComponent"] },
    { path: 'class/:classTitle', component: _pages_select_sub_class_select_sub_class_component__WEBPACK_IMPORTED_MODULE_5__["SelectSubClassComponent"] },
    { path: '**', redirectTo: '' }
];


/***/ }),

/***/ "./src/app/pages/enter-rollno/enter-rollno.component.html":
/*!****************************************************************!*\
  !*** ./src/app/pages/enter-rollno/enter-rollno.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<!-- Page content -->\r\n<div class=\"container-fluid mt--7 bg-secondary\">\r\n  <!-- Table -->\r\n  <div class=\" order-xl-1 bg-secondary\">\r\n    <div class=\"card  shadow\">\r\n      <div class=\"card-header bg-secondary border-0\">\r\n        <div class=\"row align-items-center\">\r\n          <div class=\"col-3\">\r\n            <button (click)=\"goBack()\" class=\"btn btn-icon btn-2 btn-primary btn-sm\">\r\n              Back\r\n            </button>\r\n            <span class=\"mb-0 h3\">Result</span>\r\n          </div>\r\n          <div class=\"col-9 text-right\">\r\n              <span class=\"btn btn-sm badge badge-primary\" *ngIf=\"selectedClass\" [routerLink] = \"['/']\" >{{selectedClass}}</span>\r\n            <span class=\"btn btn-sm badge badge-primary\" *ngIf=\"selectedTest\" [routerLink] = \"['/']\" >{{selectedTest}}</span>\r\n            <span class=\"btn btn-sm badge badge-primary ml-1\" *ngIf=\"selectedBoard\" [routerLink] = \"['/result', selectedClass]\"  >{{selectedBoard}}</span>\r\n            <span class=\"btn btn-sm badge badge-primary ml-1\" *ngIf=\"selectedUni\" [routerLink] = \"['/result', selectedClass]\"  >{{selectedUni}}</span>\r\n            <span class=\"btn btn-sm badge badge-primary ml-1\" *ngIf=\"selectedYear\" [routerLink] = \"['/result'+'/'+selectedClass, selectedBoardKey]\" >{{selectedYear}}</span>\r\n              <span class=\"btn btn-sm badge badge-primary ml-1\" *ngIf=\"selectedExamType\" [routerLink] = \"['/result'+'/'+selectedClass+'/'+selectedBoardKey, selectedYear]\" >{{selectedExamType}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row justify-content-center border-2 mt-100\" >\r\n          <div class=\"col-lg-6 col-md-7 \">\r\n            <div class=\"card border-0\">\r\n              <div class=\"card-body\">\r\n                <div class=\"text-center\">\r\n                  <span style=\"font-size: 25px; font-weight: bolder;\" >{{resultTitle}}</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n      </div>\r\n\r\n      <div *ngIf=\"!isError\" class=\"row justify-content-center border-2 mt-100\" id=\"print\" >\r\n        <div>\r\n          <ng-lottie *ngIf=\"!announced && !isLoading\" width=\"400px\" height=\"400px\" [options]=\"notAnnouncedAnimOptions\" (animationCreated)=\"notAnnouncedAnimationCreated($event)\"></ng-lottie>\r\n        </div>\r\n        <div class=\"col-9 mt-100\" *ngIf=\"announced\">\r\n          <div class=\"row\" style=\"padding: 30px\">\r\n            <div class=\"col-6 text-left\">\r\n              <button class=\"btn btn-primary btn-sm\" (click)=\"reload()\">Back To Result Page</button>\r\n            </div>\r\n          </div>\r\n          <div class=\"card border-0 shadow bg-secondary\">\r\n            <iframe target=\"_self\" id=\"resultFrame\" name=\"resultFrame\" class=\"custom-iframe\" [src]=\"url | safe\" (change)=\"isLoading = true;\" (load)=\"isLoading = false;\"></iframe>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row justify-content-center border-2 mt-100\" *ngIf=\"!announced && !isError && !isLoading\">\r\n        <div class=\"col-12 text-center\">\r\n          <div >\r\n            <span class=\"badge badge-default\">Not announced</span>\r\n          </div>\r\n          <div style=\"margin-top: 30px;\" *ngIf=\"resultData && resultData.announceDate\">\r\n            <span>Will be announced on </span>\r\n            <span class=\"badge badge-primary btn-sm\">{{announceDate}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <div *ngIf=\"!isError\" class=\"row justify-content-center border-2 mt-100\" >\r\n          <div class=\"col-lg-5 col-md-7 \">\r\n            <div class=\"card border-0\">\r\n\r\n              <div class=\"card-body px-lg-5 py-lg-5\">\r\n                <div class=\"text-center text-muted mb-4\">\r\n                  <small>Tags:</small>\r\n                </div>\r\n                <div class=\"text-center text-muted mb-4\">\r\n                    <span class=\"badge badge-default ml-3\" *ngFor=\"let tag of tags\" >{{tag}}</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n      </div>\r\n      <div *ngIf=\"isLoading\" class=\"loader\">\r\n        <ng-lottie width=\"120px\" height=\"120px\" [options]=\"loadingAnimOptions\" (animationCreated)=\"loadingAnimationCreated($event)\"></ng-lottie>\r\n      </div>\r\n      <div *ngIf=\"isError && !isLoading\" class=\"table-responsive classes-main-container justify-content-center\">\r\n        <div class=\"row justify-content-center\">\r\n          <div class=\"bg-transparent\">\r\n            <div class=\"text-center\">\r\n              <ng-lottie width=\"300px\" height=\"300px\" [options]=\"errorAnimOptions\" (animationCreated)=\"errorAnimationCreated($event)\"></ng-lottie>\r\n            </div>\r\n            <div class=\"text-center\">\r\n              <span class=\"text-lg\">{{errorMsg}}</span>\r\n            </div>\r\n            <div class=\"text-center\" style=\"margin-top: 30px;\">\r\n              <span class=\"btn btn-primary\" (click)=\"backToHome()\">Back to Home</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/enter-rollno/enter-rollno.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/pages/enter-rollno/enter-rollno.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".class-text {\n  font-size: 35px;\n  font-weight: bold;\n  text-align: center; }\n\n.class-container {\n  padding: 10px;\n  vertical-align: middle; }\n\n.class-container div {\n  height: 100%;\n  width: 100%; }\n\n.classes-main-container {\n  padding-left: 100px;\n  padding-right: 100px;\n  padding-top: 50px;\n  padding-bottom: 50px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.box h3 {\n  text-align: center;\n  position: relative;\n  top: 80px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.custom-shadow {\n  box-shadow: 0px 0px 15px 0px #bbbbbb !important; }\n\n.custom-btn {\n  width: 100%; }\n\n.custom-iframe {\n  height: 800px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGVyLXJvbGxuby9DOlxcVXNlcnNcXFNoYWhiYXogU2hvdWthdFxcRG9jdW1lbnRzXFxHaXRIdWJcXHJlc3VsdFNxdWFyZVxcc3JjXFxhcHBcXHBhZ2VzL2VudGVyLXJvbGxub1xcZW50ZXItcm9sbG5vLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQTs7QUFFdEI7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCLEVBQUE7O0FBRTFCO0VBQ0ksWUFBWTtFQUNaLFdBQVcsRUFBQTs7QUFFZjtFQUNJLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsaUJBQWlCO0VBQ2pCLG9CQUFvQixFQUFBOztBQUV4QjtFQUNJLFVBQVM7RUFDVCxhQUFZO0VBQ1osZ0JBQWU7RUFDZixpQkFBZ0IsRUFBQTs7QUFFcEI7RUFDSSxrQkFBaUI7RUFDZixrQkFBaUI7RUFDakIsU0FBUSxFQUFBOztBQUVaO0VBQ0ksVUFBUztFQUNULGFBQVk7RUFDWixnQkFBZTtFQUNmLGlCQUFnQixFQUFBOztBQUV0QjtFQUNJLCtDQUErQyxFQUFBOztBQUVuRDtFQUNJLFdBQVcsRUFBQTs7QUFFZjtFQUNFLGFBQWEsRUFBQSIsImZpbGUiOiJlbnRlci1yb2xsbm8vZW50ZXItcm9sbG5vLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNsYXNzLXRleHR7XHJcbiAgICBmb250LXNpemU6IDM1cHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4uY2xhc3MtY29udGFpbmVye1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbn1cclxuLmNsYXNzLWNvbnRhaW5lciBkaXYge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLmNsYXNzZXMtbWFpbi1jb250YWluZXJ7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTAwcHg7XHJcbiAgICBwYWRkaW5nLXRvcDogNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA1MHB4O1xyXG59XHJcbi5ib3gge1xyXG4gICAgd2lkdGg6NzAlO1xyXG4gICAgaGVpZ2h0OjIwMHB4O1xyXG4gICAgYmFja2dyb3VuZDojRkZGO1xyXG4gICAgbWFyZ2luOjQwcHggYXV0bztcclxufVxyXG4uYm94IGgze1xyXG4gICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xyXG4gICAgICB0b3A6ODBweDtcclxuICB9XHJcbiAgLmJveCB7XHJcbiAgICAgIHdpZHRoOjcwJTtcclxuICAgICAgaGVpZ2h0OjIwMHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kOiNGRkY7XHJcbiAgICAgIG1hcmdpbjo0MHB4IGF1dG87XHJcbiAgfVxyXG4uY3VzdG9tLXNoYWRvd3tcclxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggMTVweCAwcHggI2JiYmJiYiAhaW1wb3J0YW50O1xyXG59XHJcbi5jdXN0b20tYnRue1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLmN1c3RvbS1pZnJhbWUge1xyXG4gIGhlaWdodDogODAwcHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/pages/enter-rollno/enter-rollno.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/enter-rollno/enter-rollno.component.ts ***!
  \**************************************************************/
/*! exports provided: EnterRollNoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnterRollNoComponent", function() { return EnterRollNoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_result_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/result.service */ "./src/app/services/result.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _services_board_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/board.service */ "./src/app/services/board.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EnterRollNoComponent = /** @class */ (function () {
    function EnterRollNoComponent(route, resultService, boardService, _location, router) {
        this.route = route;
        this.resultService = resultService;
        this.boardService = boardService;
        this._location = _location;
        this.router = router;
        this.isTest = false;
        this.isUni = false;
        this.tags = [];
        this.result = 'NO RESULT FOUND';
        this.isLoading = false;
        this.isError = false;
        this.errorMsg = '';
        this.url = '';
        this.announced = false;
        this.announceDate = '';
        this.notAnnouncedAnimOptions = {
            path: '/assets/lib/not-announced.json'
        };
        this.loadingAnimOptions = {
            path: '/assets/lib/loading-spinner.json'
        };
        this.errorAnimOptions = {
            path: '/assets/lib/error.json'
        };
    }
    EnterRollNoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isTest = false;
        this.isUni = false;
        this.resultTitle = '';
        this.paramSub = this.route.paramMap.subscribe(function (paramMap) {
            if (paramMap.has('testTitle')) {
                _this.selectedTest = paramMap.get('testTitle');
                _this.isTest = true;
                _this.announced = true;
                _this.resultTitle = _this.selectedTest + " Result";
                _this.getTestBoard();
            }
            else if (paramMap.has('uniKey')) {
                _this.selectedUniKey = paramMap.get('uniKey');
                _this.selectedUni = _this.selectedUniKey.replace(/-/g, ' ');
                _this.isUni = true;
                _this.announced = true;
                if (paramMap.has('classTitle')) {
                    _this.selectedClass = paramMap.get('classTitle');
                }
                _this.resultTitle = _this.selectedUni + " " + _this.selectedClass + " Result";
                _this.getUniBoard();
            }
            else if (paramMap.has('boardKey')) {
                _this.selectedBoardKey = paramMap.get('boardKey');
                _this.selectedBoard = _this.selectedBoardKey.replace(/-/g, ' ');
                if (paramMap.has('classTitle')) {
                    _this.selectedClass = paramMap.get('classTitle');
                }
                if (paramMap.has('year')) {
                    _this.selectedYear = paramMap.get('year');
                }
                if (paramMap.has('examType')) {
                    _this.selectedExamType = paramMap.get('examType');
                    _this.getResult();
                }
                _this.resultTitle = _this.selectedBoard + " " + _this.selectedClass + " Class " + _this.selectedExamType + " Result " + _this.selectedYear;
            }
        });
    };
    EnterRollNoComponent.prototype.notAnnouncedAnimationCreated = function (animationItem) {
        this.notAnnouncedAnim = animationItem;
    };
    EnterRollNoComponent.prototype.loadingAnimationCreated = function (animationItem) {
        this.loadingAnim = animationItem;
    };
    EnterRollNoComponent.prototype.errorAnimationCreated = function (animationItem) {
        this.errorAnim = animationItem;
    };
    EnterRollNoComponent.prototype.getTestBoard = function () {
        var _this = this;
        if (this.selectedTest) {
            this.isLoading = true;
            this.isError = false;
            this.errorMsg = '';
            this.serviceSub = this.boardService.getBoardBySectionTitle(this.selectedTest)
                .subscribe(function (response) {
                _this.resultData = response.data[0];
                if (_this.resultData && _this.resultData.isBlocked) {
                    window.open(_this.url, '_blank');
                }
                if (_this.resultData) {
                    _this.tags = _this.resultData.tags;
                    _this.url = _this.resultData.resultUrl;
                    if (_this.resultData.isBlocked) {
                        window.open(_this.url, '_blank');
                    }
                }
                else {
                    _this.isLoading = false;
                    _this.isError = true;
                    _this.errorMsg = 'Result Not Found';
                }
            }, function (error) {
                _this.isLoading = false;
                _this.isError = true;
                if (error && error.status && error.status === 404) {
                    _this.errorMsg = '404 - Not Found';
                }
                else {
                    _this.errorMsg = 'Something went wrong';
                }
            });
        }
    };
    EnterRollNoComponent.prototype.getUniBoard = function () {
        var _this = this;
        if (this.selectedUniKey) {
            this.isLoading = true;
            this.isError = false;
            this.errorMsg = '';
            this.serviceSub = this.boardService.getBoardByKey(this.selectedUniKey)
                .subscribe(function (response) {
                _this.resultData = response.data;
                if (_this.resultData) {
                    _this.tags = _this.resultData.tags;
                    _this.url = _this.resultData.resultUrl;
                    if (_this.resultData.isBlocked) {
                        window.open(_this.url, '_blank');
                    }
                }
                else {
                    _this.isLoading = false;
                    _this.isError = true;
                    _this.errorMsg = 'Result Not Found';
                }
            }, function (error) {
                _this.isLoading = false;
                _this.isError = true;
                if (error && error.status && error.status === 404) {
                    _this.errorMsg = '404 - Not Found';
                }
                else {
                    _this.errorMsg = 'Something went wrong';
                }
            });
        }
    };
    EnterRollNoComponent.prototype.getResult = function () {
        var _this = this;
        if (this.selectedClass && this.selectedBoardKey && this.selectedYear && this.selectedExamType) {
            this.announced = false;
            this.isLoading = true;
            this.isError = false;
            this.errorMsg = '';
            this.serviceSub = this.resultService.getResult(this.selectedClass, this.selectedBoardKey, this.selectedYear, this.selectedExamType)
                .subscribe(function (response) {
                _this.resultData = response.data;
                if (_this.resultData) {
                    _this.announced = _this.resultData.status;
                    if (!_this.announced) {
                        _this.isLoading = false;
                        if (_this.resultData.announceDate && _this.resultData.announceDate.day && _this.resultData.announceDate.month && _this.resultData.announceDate.year) {
                            _this.announceDate = _this.resultData.announceDate.day + "/" + _this.resultData.announceDate.month + "/" + _this.resultData.announceDate.year;
                        }
                    }
                    _this.tags = _this.resultData.tags;
                    _this.url = _this.resultData.resultUrl;
                    if (_this.resultData.isBlocked && _this.announced) {
                        window.open(_this.url, '_blank');
                    }
                }
                else {
                    _this.isLoading = false;
                    _this.isError = true;
                    _this.errorMsg = 'Result Not Found';
                }
            }, function (error) {
                _this.isLoading = false;
                _this.isError = true;
                if (error && error.status && error.status === 404) {
                    _this.errorMsg = '404 - Not Found';
                }
                else {
                    _this.errorMsg = 'Something went wrong';
                }
            });
        }
    };
    EnterRollNoComponent.prototype.reload = function () {
        this.isLoading = true;
        document.getElementById('resultFrame')['src'] = this.url;
    };
    EnterRollNoComponent.prototype.backToHome = function () {
        this.router.navigate(['']);
    };
    EnterRollNoComponent.prototype.goBack = function () {
        if (this.isTest) {
            this.router.navigate(['']);
        }
        else if (this.isUni) {
            this.router.navigate(['/result', this.selectedClass]);
        }
        else {
            this.router.navigate(['/result' + '/' + this.selectedClass + '/' + this.selectedBoardKey, this.selectedYear]);
        }
    };
    EnterRollNoComponent.prototype.ngOnDestroy = function () {
        this.paramSub && this.paramSub.unsubscribe();
        this.serviceSub && this.serviceSub.unsubscribe();
    };
    EnterRollNoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-enter-rollno',
            template: __webpack_require__(/*! ./enter-rollno.component.html */ "./src/app/pages/enter-rollno/enter-rollno.component.html"),
            styles: [__webpack_require__(/*! ./enter-rollno.component.scss */ "./src/app/pages/enter-rollno/enter-rollno.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_services_result_service__WEBPACK_IMPORTED_MODULE_2__["ResultService"],
            _services_board_service__WEBPACK_IMPORTED_MODULE_4__["BoardService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], EnterRollNoComponent);
    return EnterRollNoComponent;
}());



/***/ }),

/***/ "./src/app/pages/home/home.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/home/home.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Page content -->\r\n<div class=\"container-fluid mt--7\">\r\n  <!-- Table -->\r\n  <div class=\"row\">\r\n    <div class=\"col\">\r\n      <div class=\"card shadow\">\r\n        <div class=\"card-header bg-secondary border-0\">\r\n          <h3 class=\"mb-0\">Select Your Class</h3>\r\n        </div>\r\n        <div *ngIf=\"!isError\" class=\"table-responsive classes-main-container\">\r\n          <div class=\"row\">\r\n            <div class=\"col-xl-2 col-lg-3 col-md-6 class-container\" *ngFor=\"let class of classes\" >\r\n                <button type=\"button\" class=\"btn btn-primary btn-lg w-100 h-100\" (click)=\"onClassSelect(class)\" ><b class=\"class-text\">{{class.title}}</b></button>\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"isLoading\" class=\"loader\">\r\n            <ng-lottie width=\"120px\" height=\"120px\" [options]=\"loadingAnimOptions\" (animationCreated)=\"loadingAnimationCreated($event)\"></ng-lottie>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"isError\" class=\"table-responsive classes-main-container justify-content-center\">\r\n          <div class=\"row justify-content-center\">\r\n            <div class=\"bg-transparent\">\r\n              <div class=\"text-center\">\r\n                <ng-lottie width=\"300px\" height=\"300px\" [options]=\"errorAnimOptions\" (animationCreated)=\"errorAnimationCreated($event)\"></ng-lottie>\r\n              </div>\r\n              <div class=\"text-center\">\r\n                <span class=\"text-lg\">{{errorMsg}}</span>\r\n              </div>\r\n              <div class=\"text-center\" style=\"margin-top: 30px;\">\r\n                <span class=\"btn btn-primary\" (click)=\"retry();\">Retry</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/home/home.component.scss":
/*!************************************************!*\
  !*** ./src/app/pages/home/home.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".class-text {\n  font-size: 35px;\n  font-weight: bold;\n  text-align: center; }\n\n.class-container {\n  height: 150px;\n  vertical-align: middle;\n  padding: 10px; }\n\n.class-container div {\n  padding-top: 35px;\n  height: 100%;\n  width: 100%; }\n\n.classes-main-container {\n  padding-left: 100px;\n  padding-right: 100px;\n  padding-top: 50px;\n  padding-bottom: 50px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.box h3 {\n  text-align: center;\n  position: relative;\n  top: 80px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.custom-shadow {\n  box-shadow: 0px 0px 15px 0px #bbbbbb !important; }\n\n.text-center {\n  text-align: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvQzpcXFVzZXJzXFxTaGFoYmF6IFNob3VrYXRcXERvY3VtZW50c1xcR2l0SHViXFxyZXN1bHRTcXVhcmVcXHNyY1xcYXBwXFxwYWdlcy9ob21lXFxob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQTs7QUFFdEI7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGFBQWEsRUFBQTs7QUFFakI7RUFDSSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLFdBQVcsRUFBQTs7QUFFZjtFQUNJLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsaUJBQWlCO0VBQ2pCLG9CQUFvQixFQUFBOztBQUV4QjtFQUNJLFVBQVM7RUFDVCxhQUFZO0VBQ1osZ0JBQWU7RUFDZixpQkFBZ0IsRUFBQTs7QUFFcEI7RUFDSSxrQkFBaUI7RUFDZixrQkFBaUI7RUFDakIsU0FBUSxFQUFBOztBQUVaO0VBQ0ksVUFBUztFQUNULGFBQVk7RUFDWixnQkFBZTtFQUNmLGlCQUFnQixFQUFBOztBQUV0QjtFQUNJLCtDQUErQyxFQUFBOztBQUduRDtFQUNJLGtCQUFrQixFQUFBIiwiZmlsZSI6ImhvbWUvaG9tZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jbGFzcy10ZXh0e1xyXG4gICAgZm9udC1zaXplOiAzNXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmNsYXNzLWNvbnRhaW5lcntcclxuICAgIGhlaWdodDogMTUwcHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgcGFkZGluZzogMTBweDsgICAgIFxyXG59XHJcbi5jbGFzcy1jb250YWluZXIgZGl2IHtcclxuICAgIHBhZGRpbmctdG9wOiAzNXB4O1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLmNsYXNzZXMtbWFpbi1jb250YWluZXJ7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTAwcHg7XHJcbiAgICBwYWRkaW5nLXRvcDogNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA1MHB4O1xyXG59XHJcbi5ib3gge1xyXG4gICAgd2lkdGg6NzAlO1xyXG4gICAgaGVpZ2h0OjIwMHB4O1xyXG4gICAgYmFja2dyb3VuZDojRkZGO1xyXG4gICAgbWFyZ2luOjQwcHggYXV0bztcclxufVxyXG4uYm94IGgze1xyXG4gICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xyXG4gICAgICB0b3A6ODBweDtcclxuICB9XHJcbiAgLmJveCB7XHJcbiAgICAgIHdpZHRoOjcwJTtcclxuICAgICAgaGVpZ2h0OjIwMHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kOiNGRkY7XHJcbiAgICAgIG1hcmdpbjo0MHB4IGF1dG87XHJcbiAgfVxyXG4uY3VzdG9tLXNoYWRvd3tcclxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggMTVweCAwcHggI2JiYmJiYiAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbi50ZXh0LWNlbnRlcntcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4gIl19 */"

/***/ }),

/***/ "./src/app/pages/home/home.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/home/home.component.ts ***!
  \**********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_class_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/class.service */ "./src/app/services/class.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = /** @class */ (function () {
    function HomeComponent(router, classService) {
        this.router = router;
        this.classService = classService;
        this.classes = [];
        this.isLoading = true;
        this.isError = false;
        this.errorMsg = '';
        this.loadingAnimOptions = {
            path: '/assets/lib/loading-spinner.json'
        };
        this.errorAnimOptions = {
            path: '/assets/lib/error.json'
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.init();
    };
    HomeComponent.prototype.init = function () {
        var _this = this;
        this.isLoading = true;
        this.isError = false;
        this.errorMsg = '';
        this.serviceSub = this.classService.getAllClasses().subscribe(function (response) {
            if (response.success && response.data) {
                _this.classes = response.data;
                if (!_this.classes || _this.classes.length === 0) {
                    _this.isError = true;
                    _this.errorMsg = 'No Class Found';
                }
                _this.isLoading = false;
            }
        }, function (error) {
            _this.isLoading = false;
            _this.isError = true;
            if (error && error.status && error.status === 404) {
                _this.errorMsg = '404 - Not Found';
            }
            else {
                _this.errorMsg = 'Something went wrong';
            }
        });
    };
    HomeComponent.prototype.loadingAnimationCreated = function (animationItem) {
        this.loadingAnim = animationItem;
    };
    HomeComponent.prototype.errorAnimationCreated = function (animationItem) {
        this.errorAnim = animationItem;
    };
    HomeComponent.prototype.retry = function () {
        this.init();
    };
    HomeComponent.prototype.onClassSelect = function (selectedClass) {
        if (selectedClass) {
            if (selectedClass.type === '1') {
                this.router.navigate(['/test', selectedClass.title]);
                return;
            }
            else if (selectedClass.type === '0') {
                if (selectedClass.title === 'FA' || selectedClass.title === 'FSC' || selectedClass.title === 'ICS' || selectedClass.title === 'ICOM') {
                    this.router.navigate(['/class', selectedClass.title]);
                }
                else {
                    this.router.navigate(['/result', selectedClass.title]);
                }
            }
        }
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.serviceSub && this.serviceSub.unsubscribe();
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/pages/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/pages/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], src_app_services_class_service__WEBPACK_IMPORTED_MODULE_2__["ClassService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/pages/result-page/result-page.component.html":
/*!**************************************************************!*\
  !*** ./src/app/pages/result-page/result-page.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<!-- Page content -->\r\n<div class=\"container-fluid mt--7 bg-secondary\">\r\n  <!-- Table -->\r\n  <div class=\" order-xl-1 bg-secondary\">\r\n    <div class=\"card  shadow\">\r\n      <div class=\"card-header bg-secondary border-0\">\r\n        <div class=\"row align-items-center\">\r\n          <div class=\"col-3\">\r\n            <a href=\"#!\" class=\"btn btn-sm btn-primary\"><i class=\"ni ni-bold-left\" ></i>Go Back</a>\r\n          </div>\r\n          <div class=\"col-9 text-right\">\r\n              <a href=\"#!\" class=\"btn btn-sm btn-primary\">11th</a>\r\n              <i class=\"ni ni-bold-right\" ></i>\r\n              <a href=\"#!\" class=\"btn btn-sm btn-primary ml-1\">Bise Lahore</a>\r\n              <i class=\"ni ni-bold-right\" ></i>\r\n              <a href=\"#!\" class=\"btn btn-sm btn-primary ml-1\">2019</a>\r\n              <i class=\"ni ni-bold-right\" ></i>\r\n              <a href=\"#!\" class=\"btn btn-sm btn-primary ml-1\">Annual</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row justify-content-center border-2 mt-100\" >\r\n          <div class=\"col-lg-5 col-md-7 \">\r\n            <div class=\"card border-0\">\r\n\r\n              <div class=\"card-body \">\r\n                <div class=\"text-center text-muted mb-4\">\r\n                  <h1>Bise Lahore 9th Class Result 2019</h1>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n      </div>\r\n      <div class=\"row align-items-center\" style=\"padding-right: 150px;\">\r\n        <div class=\"col-lg-12 text-right\">\r\n            <button class=\"btn btn-success\">Download</button>\r\n            <button class=\"btn btn-primary\">Print</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"row justify-content-center border-2\" style=\"padding: 50px; padding-top: 20px;\" >\r\n        <div class=\"col-lg-10 col-md-10 bg-secondary\" style=\"border-radius: 10px;\">\r\n          <div class=\"card bg-secondary border-0\">\r\n            <div class=\"card-header bg-secondary pb-5\">\r\n              <div class=\"text-center\">\r\n                <img src=\"../../../assets/img/boards/blhr.png\" width=\"75px\" height=\"75px\" >\r\n              </div>\r\n              <div class=\"text-muted text-center mt-2 mb-3\">BISE Lahore Board 9th class Result 2019</div>\r\n\r\n            </div>\r\n            <div class=\"card-body px-lg-5 py-lg-5\">\r\n              <div class=\"text-center text-muted mb-4\">\r\n                <small>Enter your Roll No</small>\r\n              </div>\r\n              <form role=\"form\">\r\n                <div class=\"form-group mb-3\">\r\n                  <div class=\"form-group\">\r\n                    <input id=\"input-address\" class=\"form-control form-control-alternative\" placeholder=\"Roll No\" value=\"\" type=\"text\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"text-center\">\r\n                  <button type=\"button\" class=\"btn btn-primary my-4\">View Result</button>\r\n                </div>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"text-center\">\r\n        <button type=\"button\" class=\"btn btn-primary my-4\" style=\"border-radius: 200px; width:50px; height:50px;\">\r\n          <span class=\"fa fa-facebook\" ></span>\r\n        </button>\r\n        <button type=\"button\" class=\"btn btn-info my-4\" style=\"border-radius: 200px; width:50px; height:50px;\">\r\n          <span class=\"fa fa-twitter\" ></span>\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"row justify-content-center border-2 mt-100\" >\r\n          <div class=\"col-lg-5 col-md-7 \">\r\n            <div class=\"card border-0\">\r\n\r\n              <div class=\"card-body px-lg-5 py-lg-5\">\r\n                <div class=\"text-center text-muted mb-4\">\r\n                  <small>Tags:</small>\r\n                </div>\r\n                <div class=\"text-center text-muted mb-4\">\r\n                    <span class=\"badge badge-default ml-3\">Default</span>\r\n                    <span class=\"badge badge-primary ml-3\">Primary</span>\r\n                    <span class=\"badge badge-info ml-3\">Info</span>\r\n                    <span class=\"badge badge-success ml-3\">Success</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/result-page/result-page.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/pages/result-page/result-page.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".class-text {\n  font-size: 35px;\n  font-weight: bold;\n  text-align: center; }\n\n.class-container {\n  padding: 10px;\n  vertical-align: middle; }\n\n.class-container div {\n  height: 100%;\n  width: 100%; }\n\n.classes-main-container {\n  padding-left: 100px;\n  padding-right: 100px;\n  padding-top: 50px;\n  padding-bottom: 50px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.box h3 {\n  text-align: center;\n  position: relative;\n  top: 80px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.custom-shadow {\n  box-shadow: 0px 0px 15px 0px #bbbbbb !important; }\n\n.custom-btn {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC1wYWdlL0M6XFxVc2Vyc1xcU2hhaGJheiBTaG91a2F0XFxEb2N1bWVudHNcXEdpdEh1YlxccmVzdWx0U3F1YXJlXFxzcmNcXGFwcFxccGFnZXMvcmVzdWx0LXBhZ2VcXHJlc3VsdC1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQTs7QUFFdEI7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCLEVBQUE7O0FBRTFCO0VBQ0ksWUFBWTtFQUNaLFdBQVcsRUFBQTs7QUFFZjtFQUNJLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsaUJBQWlCO0VBQ2pCLG9CQUFvQixFQUFBOztBQUV4QjtFQUNJLFVBQVM7RUFDVCxhQUFZO0VBQ1osZ0JBQWU7RUFDZixpQkFBZ0IsRUFBQTs7QUFFcEI7RUFDSSxrQkFBaUI7RUFDZixrQkFBaUI7RUFDakIsU0FBUSxFQUFBOztBQUVaO0VBQ0ksVUFBUztFQUNULGFBQVk7RUFDWixnQkFBZTtFQUNmLGlCQUFnQixFQUFBOztBQUV0QjtFQUNJLCtDQUErQyxFQUFBOztBQUVuRDtFQUNJLFdBQVcsRUFBQSIsImZpbGUiOiJyZXN1bHQtcGFnZS9yZXN1bHQtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jbGFzcy10ZXh0e1xyXG4gICAgZm9udC1zaXplOiAzNXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmNsYXNzLWNvbnRhaW5lcntcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG59XHJcbi5jbGFzcy1jb250YWluZXIgZGl2IHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5jbGFzc2VzLW1haW4tY29udGFpbmVye1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxMDBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwMHB4O1xyXG4gICAgcGFkZGluZy10b3A6IDUwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxufVxyXG4uYm94IHtcclxuICAgIHdpZHRoOjcwJTtcclxuICAgIGhlaWdodDoyMDBweDtcclxuICAgIGJhY2tncm91bmQ6I0ZGRjtcclxuICAgIG1hcmdpbjo0MHB4IGF1dG87XHJcbn1cclxuLmJveCBoM3tcclxuICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICAgICAgdG9wOjgwcHg7XHJcbiAgfVxyXG4gIC5ib3gge1xyXG4gICAgICB3aWR0aDo3MCU7XHJcbiAgICAgIGhlaWdodDoyMDBweDtcclxuICAgICAgYmFja2dyb3VuZDojRkZGO1xyXG4gICAgICBtYXJnaW46NDBweCBhdXRvO1xyXG4gIH1cclxuLmN1c3RvbS1zaGFkb3d7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDE1cHggMHB4ICNiYmJiYmIgIWltcG9ydGFudDtcclxufVxyXG4uY3VzdG9tLWJ0bntcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/pages/result-page/result-page.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/result-page/result-page.component.ts ***!
  \************************************************************/
/*! exports provided: ResultPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultPageComponent", function() { return ResultPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ResultPageComponent = /** @class */ (function () {
    function ResultPageComponent() {
    }
    ResultPageComponent.prototype.ngOnInit = function () {
    };
    ResultPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-result-page',
            template: __webpack_require__(/*! ./result-page.component.html */ "./src/app/pages/result-page/result-page.component.html"),
            styles: [__webpack_require__(/*! ./result-page.component.scss */ "./src/app/pages/result-page/result-page.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ResultPageComponent);
    return ResultPageComponent;
}());



/***/ }),

/***/ "./src/app/pages/select-board/select-board.component.html":
/*!****************************************************************!*\
  !*** ./src/app/pages/select-board/select-board.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<!-- Page content -->\r\n<div class=\"container-fluid mt--7\">\r\n  <!-- Table -->\r\n  <div class=\" order-xl-1\">\r\n    <div class=\"card bg-secondary shadow\">\r\n      <div class=\"card-header bg-white border-0\">\r\n        <div class=\"row align-items-center\">\r\n          <div class=\"col-8\">\r\n            <a [routerLink] = \"['/']\" class=\"btn btn-icon btn-2 btn-primary btn-sm\">\r\n              Back\r\n            </a>\r\n            <span class=\"mb-0 h3\">Select Your Board/University</span>\r\n          </div>\r\n          <div class=\"col-4 text-right\">\r\n            <span class=\"btn badge badge-primary btn-sm\" *ngIf=\"selectedClass\" [routerLink] = \"['/']\">{{selectedClass}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"card-body\" *ngIf=\"!isError\">\r\n\r\n          <h6 class=\"heading-small text-muted mb-4\" *ngIf=\"federalBoards && federalBoards.length > 0\">Federal Boards</h6>\r\n          <div class=\"pl-lg-4\" *ngIf=\"federalBoards && federalBoards.length > 0\">\r\n            <div class=\"row\">\r\n              <div class=\"col-xl-2 col-lg-3 col-md-6 class-container\" *ngFor = \"let board of federalBoards\">\r\n                <button type=\"button\" class=\"btn btn-outline-primary custom-btn\"  [routerLink] = \"board.type === '1' ? ['/result/'+selectedClass, board.key] : ['/uni/'+selectedClass, board.key]\" >{{board.title}}</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <hr class=\"my-4\" *ngIf=\"federalBoards && federalBoards.length > 0\" />\r\n\r\n          <h6 class=\"heading-small text-muted mb-4\" *ngIf=\"punjabBoards && punjabBoards.length > 0\">Punjab Boards</h6>\r\n          <div class=\"pl-lg-4\" *ngIf=\"punjabBoards && punjabBoards.length > 0\">\r\n            <div class=\"row\">\r\n              <div class=\"col-xl-2 col-lg-3 col-md-6 class-container\" *ngFor = \"let board of punjabBoards\">\r\n                <button type=\"button\" class=\"btn btn-outline-primary custom-btn\"  [routerLink] = \"board.type === '1' ? ['/result/'+selectedClass, board.key] : ['/uni/'+selectedClass, board.key]\" >{{board.title}}</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <hr class=\"my-4\" *ngIf=\"punjabBoards && punjabBoards.length > 0\" />\r\n          <!-- Address -->\r\n          <h6 class=\"heading-small text-muted mb-4\" *ngIf=\"kpkBoards && kpkBoards.length > 0\">KPK Boards</h6>\r\n          <div class=\"pl-lg-4\" *ngIf=\"kpkBoards && kpkBoards.length > 0\">\r\n            <div class=\"row\">\r\n              <div class=\"col-xl-2 col-lg-3 col-md-6 class-container\" *ngFor = \"let board of kpkBoards\">\r\n                <button type=\"button\" class=\"btn btn-outline-primary custom-btn\" [routerLink] = \"board.type === '1' ? ['/result/'+selectedClass, board.key] : ['/uni/'+selectedClass, board.key]\"  >{{board.title}}</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <hr class=\"my-4\" *ngIf=\"kpkBoards && kpkBoards.length > 0\" />\r\n\r\n          <h6 class=\"heading-small text-muted mb-4\" *ngIf=\"sindhBoards && sindhBoards.length > 0\">Sindh Boards</h6>\r\n          <div class=\"pl-lg-4\" *ngIf=\"sindhBoards && sindhBoards.length > 0\">\r\n            <div class=\"row\">\r\n              <div class=\"col-xl-2 col-lg-3 col-md-6 class-container\" *ngFor = \"let board of sindhBoards\">\r\n                <button type=\"button\" class=\"btn btn-outline-primary custom-btn\" [routerLink] = \"board.type === '1' ? ['/result/'+selectedClass, board.key] : ['/uni/'+selectedClass, board.key]\" >{{board.title}}</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <hr class=\"my-4\" *ngIf=\"sindhBoards && sindhBoards.length > 0\" />\r\n\r\n          <h6 class=\"heading-small text-muted mb-4\" *ngIf=\"balochBoards && balochBoards.length > 0\">Balochistan Boards</h6>\r\n          <div class=\"pl-lg-4\" *ngIf=\"balochBoards && balochBoards.length > 0\">\r\n            <div class=\"row\">\r\n              <div class=\"col-xl-2 col-lg-3 col-md-6 class-container\" *ngFor = \"let board of balochBoards\">\r\n                <button type=\"button\" class=\"btn btn-outline-primary custom-btn\" [routerLink] = \"board.type === '1' ? ['/result/'+selectedClass, board.key] : ['/uni/'+selectedClass, board.key]\" >{{board.title}}</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <hr class=\"my-4\" *ngIf=\"balochBoards && balochBoards.length > 0\" />\r\n\r\n          <h6 class=\"heading-small text-muted mb-4\" *ngIf=\"ajkBoards && ajkBoards.length > 0\">AJK Boards</h6>\r\n          <div class=\"pl-lg-4\" *ngIf=\"ajkBoards && ajkBoards.length > 0\">\r\n            <div class=\"row\">\r\n              <div class=\"col-xl-2 col-lg-3 col-md-6 class-container\" *ngFor = \"let board of ajkBoards\">\r\n                <button type=\"button\" class=\"btn btn-outline-primary custom-btn\" [routerLink] = \"board.type === '1' ? ['/result/'+selectedClass, board.key] : ['/uni/'+selectedClass, board.key]\" >{{board.title}}</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <hr class=\"my-4\" *ngIf=\"ajkBoards && ajkBoards.length > 0\" />\r\n        <div *ngIf=\"isLoading\" class=\"loader\">\r\n          <ng-lottie width=\"120px\" height=\"120px\" [options]=\"loadingAnimOptions\" (animationCreated)=\"loadingAnimationCreated($event)\"></ng-lottie>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"isError\" class=\"table-responsive classes-main-container justify-content-center\">\r\n        <div class=\"row justify-content-center\">\r\n          <div class=\"bg-transparent\">\r\n            <div class=\"text-center\">\r\n              <ng-lottie width=\"300px\" height=\"300px\" [options]=\"errorAnimOptions\" (animationCreated)=\"errorAnimationCreated($event)\"></ng-lottie>\r\n            </div>\r\n            <div class=\"text-center\">\r\n              <span class=\"text-lg\">{{errorMsg}}</span>\r\n            </div>\r\n            <div class=\"text-center\" style=\"margin-top: 30px;\">\r\n              <span class=\"btn btn-primary\" (click)=\"backToHome()\">Back to Home</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/select-board/select-board.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/pages/select-board/select-board.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".class-text {\n  font-size: 35px;\n  font-weight: bold;\n  text-align: center; }\n\n.class-container {\n  padding: 10px;\n  vertical-align: middle; }\n\n.class-container div {\n  height: 100%;\n  width: 100%; }\n\n.classes-main-container {\n  padding-left: 100px;\n  padding-right: 100px;\n  padding-top: 50px;\n  padding-bottom: 50px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.box h3 {\n  text-align: center;\n  position: relative;\n  top: 80px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.custom-shadow {\n  box-shadow: 0px 0px 15px 0px #bbbbbb !important; }\n\n.custom-btn {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC1ib2FyZC9DOlxcVXNlcnNcXFNoYWhiYXogU2hvdWthdFxcRG9jdW1lbnRzXFxHaXRIdWJcXHJlc3VsdFNxdWFyZVxcc3JjXFxhcHBcXHBhZ2VzL3NlbGVjdC1ib2FyZFxcc2VsZWN0LWJvYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQTs7QUFFdEI7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCLEVBQUE7O0FBRTFCO0VBQ0ksWUFBWTtFQUNaLFdBQVcsRUFBQTs7QUFFZjtFQUNJLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsaUJBQWlCO0VBQ2pCLG9CQUFvQixFQUFBOztBQUV4QjtFQUNJLFVBQVM7RUFDVCxhQUFZO0VBQ1osZ0JBQWU7RUFDZixpQkFBZ0IsRUFBQTs7QUFFcEI7RUFDSSxrQkFBaUI7RUFDZixrQkFBaUI7RUFDakIsU0FBUSxFQUFBOztBQUVaO0VBQ0ksVUFBUztFQUNULGFBQVk7RUFDWixnQkFBZTtFQUNmLGlCQUFnQixFQUFBOztBQUV0QjtFQUNJLCtDQUErQyxFQUFBOztBQUVuRDtFQUNJLFdBQVcsRUFBQSIsImZpbGUiOiJzZWxlY3QtYm9hcmQvc2VsZWN0LWJvYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNsYXNzLXRleHR7XHJcbiAgICBmb250LXNpemU6IDM1cHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4uY2xhc3MtY29udGFpbmVye1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbn1cclxuLmNsYXNzLWNvbnRhaW5lciBkaXYge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLmNsYXNzZXMtbWFpbi1jb250YWluZXJ7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTAwcHg7XHJcbiAgICBwYWRkaW5nLXRvcDogNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA1MHB4O1xyXG59XHJcbi5ib3gge1xyXG4gICAgd2lkdGg6NzAlO1xyXG4gICAgaGVpZ2h0OjIwMHB4O1xyXG4gICAgYmFja2dyb3VuZDojRkZGO1xyXG4gICAgbWFyZ2luOjQwcHggYXV0bztcclxufVxyXG4uYm94IGgze1xyXG4gICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xyXG4gICAgICB0b3A6ODBweDtcclxuICB9XHJcbiAgLmJveCB7XHJcbiAgICAgIHdpZHRoOjcwJTtcclxuICAgICAgaGVpZ2h0OjIwMHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kOiNGRkY7XHJcbiAgICAgIG1hcmdpbjo0MHB4IGF1dG87XHJcbiAgfVxyXG4uY3VzdG9tLXNoYWRvd3tcclxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggMTVweCAwcHggI2JiYmJiYiAhaW1wb3J0YW50O1xyXG59XHJcbi5jdXN0b20tYnRue1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/select-board/select-board.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/select-board/select-board.component.ts ***!
  \**************************************************************/
/*! exports provided: SelectBoardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectBoardComponent", function() { return SelectBoardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_board_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/board.service */ "./src/app/services/board.service.ts");
/* harmony import */ var src_app_services_class_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/class.service */ "./src/app/services/class.service.ts");
/* harmony import */ var _app_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app.enums */ "./src/app/app.enums.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SelectBoardComponent = /** @class */ (function () {
    function SelectBoardComponent(router, route, boardService, classService) {
        this.router = router;
        this.route = route;
        this.boardService = boardService;
        this.classService = classService;
        this.boards = [];
        this.punjabBoards = [];
        this.kpkBoards = [];
        this.sindhBoards = [];
        this.balochBoards = [];
        this.ajkBoards = [];
        this.federalBoards = [];
        this.isLoading = true;
        this.isError = false;
        this.errorMsg = '';
        this.loadingAnimOptions = {
            path: '/assets/lib/loading-spinner.json'
        };
        this.errorAnimOptions = {
            path: '/assets/lib/error.json'
        };
    }
    SelectBoardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramSub = this.route.paramMap.subscribe(function (paramMap) {
            _this.isLoading = true;
            if (paramMap.has('classTitle')) {
                _this.selectedClass = paramMap.get('classTitle');
                _this.getBoardsBySectionTitle();
            }
        });
    };
    SelectBoardComponent.prototype.loadingAnimationCreated = function (animationItem) {
        this.loadingAnim = animationItem;
    };
    SelectBoardComponent.prototype.errorAnimationCreated = function (animationItem) {
        this.errorAnim = animationItem;
    };
    SelectBoardComponent.prototype.getBoardsBySectionTitle = function () {
        var _this = this;
        if (this.selectedClass) {
            this.isError = false;
            this.errorMsg = '';
            this.serviceSub = this.boardService.getBoardBySectionTitle(this.selectedClass).subscribe(function (response) {
                _this.boards = response.data;
                if (!_this.boards || _this.boards.length === 0) {
                    _this.isError = true;
                    _this.errorMsg = "No Board Found with class " + _this.selectedClass;
                }
                else {
                    _this.sortBoardsByProvince();
                }
                _this.isLoading = false;
            }, function (error) {
                _this.isLoading = false;
                _this.isError = true;
                if (error && error.status && error.status === 404) {
                    _this.errorMsg = '404 - Not Found';
                }
                else {
                    _this.errorMsg = 'Something went wrong';
                }
            });
        }
    };
    SelectBoardComponent.prototype.sortBoardsByProvince = function () {
        var _this = this;
        this.boards.forEach(function (board) {
            if (board && board.province) {
                if (board.province === _app_enums__WEBPACK_IMPORTED_MODULE_4__["PROVINCE"].PUNJAB) {
                    _this.punjabBoards.push(board);
                }
                else if (board.province === _app_enums__WEBPACK_IMPORTED_MODULE_4__["PROVINCE"].KPK) {
                    _this.kpkBoards.push(board);
                }
                else if (board.province === _app_enums__WEBPACK_IMPORTED_MODULE_4__["PROVINCE"].SINDH) {
                    _this.sindhBoards.push(board);
                }
                else if (board.province === _app_enums__WEBPACK_IMPORTED_MODULE_4__["PROVINCE"].BALOCHISTAN) {
                    _this.balochBoards.push(board);
                }
                else if (board.province === _app_enums__WEBPACK_IMPORTED_MODULE_4__["PROVINCE"].AJK) {
                    _this.ajkBoards.push(board);
                }
                else if (board.province === _app_enums__WEBPACK_IMPORTED_MODULE_4__["PROVINCE"].FEDERAL) {
                    _this.federalBoards.push(board);
                }
            }
        });
    };
    SelectBoardComponent.prototype.backToHome = function () {
        this.router.navigate(['']);
    };
    SelectBoardComponent.prototype.ngOnDestroy = function () {
        this.paramSub && this.paramSub.unsubscribe();
        this.serviceSub && this.serviceSub.unsubscribe();
    };
    SelectBoardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-select-board',
            template: __webpack_require__(/*! ./select-board.component.html */ "./src/app/pages/select-board/select-board.component.html"),
            styles: [__webpack_require__(/*! ./select-board.component.scss */ "./src/app/pages/select-board/select-board.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], src_app_services_board_service__WEBPACK_IMPORTED_MODULE_2__["BoardService"], src_app_services_class_service__WEBPACK_IMPORTED_MODULE_3__["ClassService"]])
    ], SelectBoardComponent);
    return SelectBoardComponent;
}());



/***/ }),

/***/ "./src/app/pages/select-exam/select-exam.component.html":
/*!**************************************************************!*\
  !*** ./src/app/pages/select-exam/select-exam.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<!-- Page content -->\r\n<div class=\"container-fluid mt--7\">\r\n  <!-- Table -->\r\n  <div class=\" order-xl-1\">\r\n    <div class=\"card bg-secondary shadow\">\r\n      <div class=\"card-header bg-white border-0\">\r\n        <div class=\"row align-items-center\">\r\n          <div class=\"col-3\">\r\n            <a [routerLink] = \"['/result'+'/'+selectedClass, selectedBoardKey]\" class=\"btn btn-icon btn-2 btn-primary btn-sm\">\r\n              Back\r\n            </a>\r\n            <span class=\"mb-0 h3\">Select Exam Type</span>\r\n          </div>\r\n          <div class=\"col-9 text-right\">\r\n              <span class=\"btn btn-sm badge badge-primary\" *ngIf=\"selectedClass\" [routerLink] = \"['/']\" >{{selectedClass}}</span>\r\n              <span class=\"btn btn-sm badge badge-primary ml-1\" *ngIf=\"selectedBoardKey\" [routerLink] = \"['/result', selectedClass]\"  >{{selectedBoardKey}}</span>\r\n              <span class=\"btn btn-sm badge badge-primary ml-1\" *ngIf=\"selectedYear\" [routerLink] = \"['/result'+'/'+selectedClass, selectedBoardKey]\" >{{selectedYear}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"!isError\" class=\"card-body\">\r\n          <h6 class=\"heading-small text-muted mb-4\">Exam Type</h6>\r\n          <div class=\"pl-lg-4\">\r\n            <div class=\"row\">\r\n              <div class=\"col-xl-2 col-lg-3 col-md-6 class-container\" >\r\n                <button type=\"button\" class=\"btn btn-outline-primary custom-btn\" [routerLink] = \"['/result/'+selectedClass+'/'+selectedBoardKey+'/'+selectedYear, 'annual']\"  >Annual</button>\r\n              </div>\r\n              <div *ngIf=\"showSupply\" class=\"col-xl-2 col-lg-3 col-md-6 class-container\" >\r\n                <button type=\"button\" class=\"btn btn-outline-primary custom-btn\" [routerLink] = \"['/result/'+selectedClass+'/'+selectedBoardKey+'/'+selectedYear, 'supply']\" >Supplymentry</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <hr class=\"my-4\" />\r\n          <!-- Address -->\r\n        <div *ngIf=\"isLoading\" class=\"loader\">\r\n          <ng-lottie width=\"120px\" height=\"120px\" [options]=\"loadingAnimOptions\" (animationCreated)=\"loadingAnimationCreated($event)\"></ng-lottie>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"isError\" class=\"table-responsive classes-main-container justify-content-center\">\r\n        <div class=\"row justify-content-center\">\r\n          <div class=\"bg-transparent\">\r\n            <div class=\"text-center\">\r\n              <ng-lottie width=\"300px\" height=\"300px\" [options]=\"errorAnimOptions\" (animationCreated)=\"errorAnimationCreated($event)\"></ng-lottie>\r\n            </div>\r\n            <div class=\"text-center\">\r\n              <span class=\"text-lg\">{{errorMsg}}</span>\r\n            </div>\r\n            <div class=\"text-center\" style=\"margin-top: 30px;\">\r\n              <span class=\"btn btn-primary\" (click)=\"backToHome()\">Back to Home</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/select-exam/select-exam.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/pages/select-exam/select-exam.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".class-text {\n  font-size: 35px;\n  font-weight: bold;\n  text-align: center; }\n\n.class-container {\n  padding: 10px;\n  vertical-align: middle; }\n\n.class-container div {\n  height: 100%;\n  width: 100%; }\n\n.classes-main-container {\n  padding-left: 100px;\n  padding-right: 100px;\n  padding-top: 50px;\n  padding-bottom: 50px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.box h3 {\n  text-align: center;\n  position: relative;\n  top: 80px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.custom-shadow {\n  box-shadow: 0px 0px 15px 0px #bbbbbb !important; }\n\n.custom-btn {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC1leGFtL0M6XFxVc2Vyc1xcU2hhaGJheiBTaG91a2F0XFxEb2N1bWVudHNcXEdpdEh1YlxccmVzdWx0U3F1YXJlXFxzcmNcXGFwcFxccGFnZXMvc2VsZWN0LWV4YW1cXHNlbGVjdC1leGFtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQTs7QUFFdEI7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCLEVBQUE7O0FBRTFCO0VBQ0ksWUFBWTtFQUNaLFdBQVcsRUFBQTs7QUFFZjtFQUNJLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsaUJBQWlCO0VBQ2pCLG9CQUFvQixFQUFBOztBQUV4QjtFQUNJLFVBQVM7RUFDVCxhQUFZO0VBQ1osZ0JBQWU7RUFDZixpQkFBZ0IsRUFBQTs7QUFFcEI7RUFDSSxrQkFBaUI7RUFDZixrQkFBaUI7RUFDakIsU0FBUSxFQUFBOztBQUVaO0VBQ0ksVUFBUztFQUNULGFBQVk7RUFDWixnQkFBZTtFQUNmLGlCQUFnQixFQUFBOztBQUV0QjtFQUNJLCtDQUErQyxFQUFBOztBQUVuRDtFQUNJLFdBQVcsRUFBQSIsImZpbGUiOiJzZWxlY3QtZXhhbS9zZWxlY3QtZXhhbS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jbGFzcy10ZXh0e1xyXG4gICAgZm9udC1zaXplOiAzNXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmNsYXNzLWNvbnRhaW5lcntcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG59XHJcbi5jbGFzcy1jb250YWluZXIgZGl2IHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5jbGFzc2VzLW1haW4tY29udGFpbmVye1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxMDBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwMHB4O1xyXG4gICAgcGFkZGluZy10b3A6IDUwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxufVxyXG4uYm94IHtcclxuICAgIHdpZHRoOjcwJTtcclxuICAgIGhlaWdodDoyMDBweDtcclxuICAgIGJhY2tncm91bmQ6I0ZGRjtcclxuICAgIG1hcmdpbjo0MHB4IGF1dG87XHJcbn1cclxuLmJveCBoM3tcclxuICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICAgICAgdG9wOjgwcHg7XHJcbiAgfVxyXG4gIC5ib3gge1xyXG4gICAgICB3aWR0aDo3MCU7XHJcbiAgICAgIGhlaWdodDoyMDBweDtcclxuICAgICAgYmFja2dyb3VuZDojRkZGO1xyXG4gICAgICBtYXJnaW46NDBweCBhdXRvO1xyXG4gIH1cclxuLmN1c3RvbS1zaGFkb3d7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDE1cHggMHB4ICNiYmJiYmIgIWltcG9ydGFudDtcclxufVxyXG4uY3VzdG9tLWJ0bntcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/pages/select-exam/select-exam.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/select-exam/select-exam.component.ts ***!
  \************************************************************/
/*! exports provided: SelectExamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectExamComponent", function() { return SelectExamComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SelectExamComponent = /** @class */ (function () {
    function SelectExamComponent(router, route) {
        this.router = router;
        this.route = route;
        this.selectedBoardKey = '';
        this.selectedClass = '';
        this.selectedYear = '';
        this.isLoading = false;
        this.isError = false;
        this.errorMsg = '';
        this.showSupply = true;
        this.loadingAnimOptions = {
            path: '/assets/lib/loading-spinner.json'
        };
        this.errorAnimOptions = {
            path: '/assets/lib/error.json'
        };
    }
    SelectExamComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showSupply = true;
        this.examTypes = {
            annual: 'annual',
            supply: 'supply'
        };
        this.paramSub = this.route.paramMap.subscribe(function (paramMap) {
            _this.isLoading = true;
            _this.isError = false;
            _this.errorMsg = '';
            if (paramMap.has('boardKey')) {
                _this.selectedBoardKey = paramMap.get('boardKey');
            }
            if (paramMap.has('classTitle')) {
                _this.selectedClass = paramMap.get('classTitle');
                if (_this.selectedClass === '5th' || _this.selectedClass === '8th') {
                    _this.showSupply = false;
                }
            }
            if (paramMap.has('year')) {
                _this.selectedYear = paramMap.get('year');
                _this.isLoading = false;
            }
        });
    };
    SelectExamComponent.prototype.loadingAnimationCreated = function (animationItem) {
        this.loadingAnim = animationItem;
    };
    SelectExamComponent.prototype.errorAnimationCreated = function (animationItem) {
        this.errorAnim = animationItem;
    };
    SelectExamComponent.prototype.backToHome = function () {
        this.router.navigate(['']);
    };
    SelectExamComponent.prototype.ngOnDestroy = function () {
        this.paramSub && this.paramSub.unsubscribe();
    };
    SelectExamComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-select-exam',
            template: __webpack_require__(/*! ./select-exam.component.html */ "./src/app/pages/select-exam/select-exam.component.html"),
            styles: [__webpack_require__(/*! ./select-exam.component.scss */ "./src/app/pages/select-exam/select-exam.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], SelectExamComponent);
    return SelectExamComponent;
}());



/***/ }),

/***/ "./src/app/pages/select-sub-class/select-sub-class.component.html":
/*!************************************************************************!*\
  !*** ./src/app/pages/select-sub-class/select-sub-class.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<!-- Page content -->\n<div class=\"container-fluid mt--7\">\n  <!-- Table -->\n  <div class=\" order-xl-1\">\n    <div class=\"card bg-secondary shadow\">\n      <div class=\"card-header bg-white border-0\">\n        <div class=\"row align-items-center\">\n          <div class=\"col-3\">\n            <a [routerLink] = \"['/']\" class=\"btn btn-icon btn-2 btn-primary btn-sm\">\n              Back\n            </a>\n            <span class=\"mb-0 h3\">Select Class</span>\n          </div>\n          <div class=\"col-9 text-right\">\n              <span class=\"btn btn-sm badge badge-primary\" *ngIf=\"selectedClass\" [routerLink] = \"['/']\" >{{selectedClass}}</span>\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"!isError\" class=\"card-body\">\n          <h6 class=\"heading-small text-muted mb-4\">Exam Type</h6>\n          <div class=\"pl-lg-4\">\n            <div class=\"row\">\n              <div class=\"col-xl-2 col-lg-3 col-md-6 class-container\" >\n                <button type=\"button\" class=\"btn btn-outline-primary custom-btn\" (click)=\"onClassSelected('Part 1')\" >{{selectedClass}} Part 1</button>\n              </div>\n              <div class=\"col-xl-2 col-lg-3 col-md-6 class-container\" >\n                <button type=\"button\" class=\"btn btn-outline-primary custom-btn\" (click)=\"onClassSelected('Part 2')\" >{{selectedClass}} Part 2</button>\n              </div>\n            </div>\n          </div>\n          <hr class=\"my-4\" />\n          <!-- Address -->\n        <div *ngIf=\"isLoading\" class=\"loader\">\n          <ng-lottie width=\"120px\" height=\"120px\" [options]=\"loadingAnimOptions\" (animationCreated)=\"loadingAnimationCreated($event)\"></ng-lottie>\n        </div>\n      </div>\n      <div *ngIf=\"isError\" class=\"table-responsive classes-main-container justify-content-center\">\n        <div class=\"row justify-content-center\">\n          <div class=\"bg-transparent\">\n            <div class=\"text-center\">\n              <ng-lottie width=\"300px\" height=\"300px\" [options]=\"errorAnimOptions\" (animationCreated)=\"errorAnimationCreated($event)\"></ng-lottie>\n            </div>\n            <div class=\"text-center\">\n              <span class=\"text-lg\">{{errorMsg}}</span>\n            </div>\n            <div class=\"text-center\" style=\"margin-top: 30px;\">\n              <span class=\"btn btn-primary\" (click)=\"backToHome()\">Back to Home</span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/select-sub-class/select-sub-class.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/pages/select-sub-class/select-sub-class.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".class-text {\n  font-size: 35px;\n  font-weight: bold;\n  text-align: center; }\n\n.class-container {\n  padding: 10px;\n  vertical-align: middle; }\n\n.class-container div {\n  height: 100%;\n  width: 100%; }\n\n.classes-main-container {\n  padding-left: 100px;\n  padding-right: 100px;\n  padding-top: 50px;\n  padding-bottom: 50px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.box h3 {\n  text-align: center;\n  position: relative;\n  top: 80px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.custom-shadow {\n  box-shadow: 0px 0px 15px 0px #bbbbbb !important; }\n\n.custom-btn {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC1zdWItY2xhc3MvQzpcXFVzZXJzXFxTaGFoYmF6IFNob3VrYXRcXERvY3VtZW50c1xcR2l0SHViXFxyZXN1bHRTcXVhcmVcXHNyY1xcYXBwXFxwYWdlcy9zZWxlY3Qtc3ViLWNsYXNzXFxzZWxlY3Qtc3ViLWNsYXNzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQTs7QUFFdEI7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCLEVBQUE7O0FBRTFCO0VBQ0ksWUFBWTtFQUNaLFdBQVcsRUFBQTs7QUFFZjtFQUNJLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsaUJBQWlCO0VBQ2pCLG9CQUFvQixFQUFBOztBQUV4QjtFQUNJLFVBQVM7RUFDVCxhQUFZO0VBQ1osZ0JBQWU7RUFDZixpQkFBZ0IsRUFBQTs7QUFFcEI7RUFDSSxrQkFBaUI7RUFDZixrQkFBaUI7RUFDakIsU0FBUSxFQUFBOztBQUVaO0VBQ0ksVUFBUztFQUNULGFBQVk7RUFDWixnQkFBZTtFQUNmLGlCQUFnQixFQUFBOztBQUV0QjtFQUNJLCtDQUErQyxFQUFBOztBQUVuRDtFQUNJLFdBQVcsRUFBQSIsImZpbGUiOiJzZWxlY3Qtc3ViLWNsYXNzL3NlbGVjdC1zdWItY2xhc3MuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2xhc3MtdGV4dHtcclxuICAgIGZvbnQtc2l6ZTogMzVweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5jbGFzcy1jb250YWluZXJ7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxufVxyXG4uY2xhc3MtY29udGFpbmVyIGRpdiB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG4uY2xhc3Nlcy1tYWluLWNvbnRhaW5lcntcclxuICAgIHBhZGRpbmctbGVmdDogMTAwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMDBweDtcclxuICAgIHBhZGRpbmctdG9wOiA1MHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDUwcHg7XHJcbn1cclxuLmJveCB7XHJcbiAgICB3aWR0aDo3MCU7XHJcbiAgICBoZWlnaHQ6MjAwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiNGRkY7XHJcbiAgICBtYXJnaW46NDBweCBhdXRvO1xyXG59XHJcbi5ib3ggaDN7XHJcbiAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgcG9zaXRpb246cmVsYXRpdmU7XHJcbiAgICAgIHRvcDo4MHB4O1xyXG4gIH1cclxuICAuYm94IHtcclxuICAgICAgd2lkdGg6NzAlO1xyXG4gICAgICBoZWlnaHQ6MjAwcHg7XHJcbiAgICAgIGJhY2tncm91bmQ6I0ZGRjtcclxuICAgICAgbWFyZ2luOjQwcHggYXV0bztcclxuICB9XHJcbi5jdXN0b20tc2hhZG93e1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCAxNXB4IDBweCAjYmJiYmJiICFpbXBvcnRhbnQ7XHJcbn1cclxuLmN1c3RvbS1idG57XHJcbiAgICB3aWR0aDogMTAwJTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/select-sub-class/select-sub-class.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/select-sub-class/select-sub-class.component.ts ***!
  \**********************************************************************/
/*! exports provided: SelectSubClassComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectSubClassComponent", function() { return SelectSubClassComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SelectSubClassComponent = /** @class */ (function () {
    function SelectSubClassComponent(route, router) {
        this.route = route;
        this.router = router;
        this.isLoading = false;
        this.isError = false;
        this.errorMsg = '';
        this.loadingAnimOptions = {
            path: '/assets/lib/loading-spinner.json'
        };
        this.errorAnimOptions = {
            path: '/assets/lib/error.json'
        };
    }
    SelectSubClassComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.paramSub = this.route.paramMap.subscribe(function (paramMap) {
            _this.isLoading = false;
            _this.isError = false;
            _this.errorMsg = '';
            if (paramMap.has('classTitle')) {
                _this.selectedClass = paramMap.get('classTitle');
            }
        });
    };
    SelectSubClassComponent.prototype.loadingAnimationCreated = function (animationItem) {
        this.loadingAnim = animationItem;
    };
    SelectSubClassComponent.prototype.errorAnimationCreated = function (animationItem) {
        this.errorAnim = animationItem;
    };
    SelectSubClassComponent.prototype.onClassSelected = function (selectedClassPart) {
        var clas;
        if (selectedClassPart) {
            if (selectedClassPart === 'Part 1') {
                clas = '11th';
                this.router.navigate(['/result', clas]);
            }
            else if (selectedClassPart === 'Part 2') {
                clas = '12th';
                this.router.navigate(['/result', clas]);
            }
        }
    };
    SelectSubClassComponent.prototype.backToHome = function () {
        this.router.navigate(['']);
    };
    SelectSubClassComponent.prototype.ngOnDestroy = function () {
        this.paramSub && this.paramSub.unsubscribe();
    };
    SelectSubClassComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-select-sub-class',
            template: __webpack_require__(/*! ./select-sub-class.component.html */ "./src/app/pages/select-sub-class/select-sub-class.component.html"),
            styles: [__webpack_require__(/*! ./select-sub-class.component.scss */ "./src/app/pages/select-sub-class/select-sub-class.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], SelectSubClassComponent);
    return SelectSubClassComponent;
}());



/***/ }),

/***/ "./src/app/pages/select-year/select-year.component.html":
/*!**************************************************************!*\
  !*** ./src/app/pages/select-year/select-year.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<!-- Page content -->\r\n<div class=\"container-fluid mt--7\">\r\n  <!-- Table -->\r\n  <div class=\" order-xl-1\">\r\n    <div class=\"card bg-secondary shadow\">\r\n      <div class=\"card-header bg-white border-0\">\r\n        <div class=\"row align-items-center\">\r\n          <div class=\"col-3\">\r\n            <a [routerLink] = \"['/result', selectedClass]\" class=\"btn btn-icon btn-2 btn-primary btn-sm\">\r\n              Back\r\n            </a>\r\n            <span class=\"mb-0 h3\">Select Year</span>\r\n          </div>\r\n          <div class=\"col-9 text-right\">\r\n            <span class=\"btn btn-sm badge badge-primary\" *ngIf=\"selectedClass\" [routerLink] = \"['/']\" >{{selectedClass}}</span>\r\n            <span class=\"btn btn-sm badge badge-primary ml-1\" *ngIf=\"selectedBoardKey\" [routerLink] = \"['/result', selectedClass]\" >{{selectedBoardKey}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"card-body\" *ngIf=\"!isError\">\r\n          <h6 class=\"heading-small text-muted mb-4\">Year</h6>\r\n          <div class=\"pl-lg-4\">\r\n            <div class=\"row\">\r\n              <div class=\"col-xl-2 col-lg-3 col-md-6 class-container\" *ngFor=\"let year of years\" >\r\n                <button type=\"button\" class=\"btn btn-outline-primary custom-btn\"  [routerLink] = \"['/result/'+selectedClass+'/'+selectedBoardKey, year.year]\" >{{year.year}}</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <hr class=\"my-4\" />\r\n          <!-- Address -->\r\n        <div *ngIf=\"isLoading\" class=\"loader\">\r\n          <ng-lottie width=\"120px\" height=\"120px\" [options]=\"loadingAnimOptions\" (animationCreated)=\"loadingAnimationCreated($event)\"></ng-lottie>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"isError\" class=\"table-responsive classes-main-container justify-content-center\">\r\n        <div class=\"row justify-content-center\">\r\n          <div class=\"bg-transparent\">\r\n            <div class=\"text-center\">\r\n              <ng-lottie width=\"300px\" height=\"300px\" [options]=\"errorAnimOptions\" (animationCreated)=\"errorAnimationCreated($event)\"></ng-lottie>\r\n            </div>\r\n            <div class=\"text-center\">\r\n              <span class=\"text-lg\">{{errorMsg}}</span>\r\n            </div>\r\n            <div class=\"text-center\" style=\"margin-top: 30px;\">\r\n              <span class=\"btn btn-primary\" (click)=\"backToHome()\">Back to Home</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/select-year/select-year.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/pages/select-year/select-year.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".class-text {\n  font-size: 35px;\n  font-weight: bold;\n  text-align: center; }\n\n.class-container {\n  padding: 10px;\n  vertical-align: middle; }\n\n.class-container div {\n  height: 100%;\n  width: 100%; }\n\n.classes-main-container {\n  padding-left: 100px;\n  padding-right: 100px;\n  padding-top: 50px;\n  padding-bottom: 50px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.box h3 {\n  text-align: center;\n  position: relative;\n  top: 80px; }\n\n.box {\n  width: 70%;\n  height: 200px;\n  background: #FFF;\n  margin: 40px auto; }\n\n.custom-shadow {\n  box-shadow: 0px 0px 15px 0px #bbbbbb !important; }\n\n.custom-btn {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC15ZWFyL0M6XFxVc2Vyc1xcU2hhaGJheiBTaG91a2F0XFxEb2N1bWVudHNcXEdpdEh1YlxccmVzdWx0U3F1YXJlXFxzcmNcXGFwcFxccGFnZXMvc2VsZWN0LXllYXJcXHNlbGVjdC15ZWFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQTs7QUFFdEI7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCLEVBQUE7O0FBRTFCO0VBQ0ksWUFBWTtFQUNaLFdBQVcsRUFBQTs7QUFFZjtFQUNJLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsaUJBQWlCO0VBQ2pCLG9CQUFvQixFQUFBOztBQUV4QjtFQUNJLFVBQVM7RUFDVCxhQUFZO0VBQ1osZ0JBQWU7RUFDZixpQkFBZ0IsRUFBQTs7QUFFcEI7RUFDSSxrQkFBaUI7RUFDZixrQkFBaUI7RUFDakIsU0FBUSxFQUFBOztBQUVaO0VBQ0ksVUFBUztFQUNULGFBQVk7RUFDWixnQkFBZTtFQUNmLGlCQUFnQixFQUFBOztBQUV0QjtFQUNJLCtDQUErQyxFQUFBOztBQUVuRDtFQUNJLFdBQVcsRUFBQSIsImZpbGUiOiJzZWxlY3QteWVhci9zZWxlY3QteWVhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jbGFzcy10ZXh0e1xyXG4gICAgZm9udC1zaXplOiAzNXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmNsYXNzLWNvbnRhaW5lcntcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG59XHJcbi5jbGFzcy1jb250YWluZXIgZGl2IHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5jbGFzc2VzLW1haW4tY29udGFpbmVye1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxMDBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwMHB4O1xyXG4gICAgcGFkZGluZy10b3A6IDUwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxufVxyXG4uYm94IHtcclxuICAgIHdpZHRoOjcwJTtcclxuICAgIGhlaWdodDoyMDBweDtcclxuICAgIGJhY2tncm91bmQ6I0ZGRjtcclxuICAgIG1hcmdpbjo0MHB4IGF1dG87XHJcbn1cclxuLmJveCBoM3tcclxuICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICAgICAgdG9wOjgwcHg7XHJcbiAgfVxyXG4gIC5ib3gge1xyXG4gICAgICB3aWR0aDo3MCU7XHJcbiAgICAgIGhlaWdodDoyMDBweDtcclxuICAgICAgYmFja2dyb3VuZDojRkZGO1xyXG4gICAgICBtYXJnaW46NDBweCBhdXRvO1xyXG4gIH1cclxuLmN1c3RvbS1zaGFkb3d7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDE1cHggMHB4ICNiYmJiYmIgIWltcG9ydGFudDtcclxufVxyXG4uY3VzdG9tLWJ0bntcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/pages/select-year/select-year.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/select-year/select-year.component.ts ***!
  \************************************************************/
/*! exports provided: SelectYearComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectYearComponent", function() { return SelectYearComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_result_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/result.service */ "./src/app/services/result.service.ts");
/* harmony import */ var src_app_services_board_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/board.service */ "./src/app/services/board.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SelectYearComponent = /** @class */ (function () {
    function SelectYearComponent(router, resultService, boardService, route) {
        this.router = router;
        this.resultService = resultService;
        this.boardService = boardService;
        this.route = route;
        this.selectedBoardKey = '';
        this.selectedBoard = '';
        this.selectedClass = '';
        this.isLoading = false;
        this.isError = false;
        this.errorMsg = '';
        this.loadingAnimOptions = {
            path: '/assets/lib/loading-spinner.json'
        };
        this.errorAnimOptions = {
            path: '/assets/lib/error.json'
        };
    }
    SelectYearComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramSub = this.route.paramMap.subscribe(function (paramMap) {
            if (paramMap.has('boardKey')) {
                _this.selectedBoardKey = paramMap.get('boardKey');
                _this.selectedBoard = _this.selectedBoardKey.replace(/-/g, ' ');
            }
            if (paramMap.has('classTitle')) {
                _this.selectedClass = paramMap.get('classTitle');
                _this.getResultYears();
            }
        });
    };
    SelectYearComponent.prototype.loadingAnimationCreated = function (animationItem) {
        this.loadingAnim = animationItem;
    };
    SelectYearComponent.prototype.errorAnimationCreated = function (animationItem) {
        this.errorAnim = animationItem;
    };
    SelectYearComponent.prototype.getResultYears = function () {
        var _this = this;
        if (this.selectedClass && this.selectedBoardKey) {
            this.isLoading = true;
            this.isError = false;
            this.errorMsg = '';
            this.serviceSub = this.resultService.getResultYears(this.selectedClass, this.selectedBoardKey).subscribe(function (response) {
                _this.years = response.data;
                if (!_this.years || _this.years.length === 0) {
                    _this.isError = true;
                    _this.errorMsg = "No Year Found";
                }
                _this.isLoading = false;
            }, function (error) {
                _this.isLoading = false;
                _this.isError = true;
                if (error && error.status && error.status === 404) {
                    _this.errorMsg = '404 - Not Found';
                }
                else {
                    _this.errorMsg = 'Something went wrong';
                }
            });
        }
    };
    SelectYearComponent.prototype.backToHome = function () {
        this.router.navigate(['']);
    };
    SelectYearComponent.prototype.ngOnDestroy = function () {
        this.paramSub && this.paramSub.unsubscribe();
        this.serviceSub && this.serviceSub.unsubscribe();
    };
    SelectYearComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-select-year',
            template: __webpack_require__(/*! ./select-year.component.html */ "./src/app/pages/select-year/select-year.component.html"),
            styles: [__webpack_require__(/*! ./select-year.component.scss */ "./src/app/pages/select-year/select-year.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], src_app_services_result_service__WEBPACK_IMPORTED_MODULE_2__["ResultService"], src_app_services_board_service__WEBPACK_IMPORTED_MODULE_3__["BoardService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], SelectYearComponent);
    return SelectYearComponent;
}());



/***/ }),

/***/ "./src/app/pipes/index.ts":
/*!********************************!*\
  !*** ./src/app/pipes/index.ts ***!
  \********************************/
/*! exports provided: SafePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _safe_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./safe.pipe */ "./src/app/pipes/safe.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SafePipe", function() { return _safe_pipe__WEBPACK_IMPORTED_MODULE_0__["SafePipe"]; });




/***/ }),

/***/ "./src/app/pipes/safe.pipe.ts":
/*!************************************!*\
  !*** ./src/app/pipes/safe.pipe.ts ***!
  \************************************/
/*! exports provided: SafePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafePipe", function() { return SafePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipe = /** @class */ (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'safe' }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"]])
    ], SafePipe);
    return SafePipe;
}());



/***/ })

}]);
//# sourceMappingURL=layouts-home-layout-home-layout-module.js.map