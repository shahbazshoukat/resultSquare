(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-auth-layout-auth-layout-module"],{

/***/ "./src/app/layouts/auth-layout/auth-layout.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/layouts/auth-layout/auth-layout.module.ts ***!
  \***********************************************************/
/*! exports provided: playerFactory, AuthLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerFactory", function() { return playerFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthLayoutModule", function() { return AuthLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _auth_layout_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth-layout.routing */ "./src/app/layouts/auth-layout/auth-layout.routing.ts");
/* harmony import */ var _pages_admin_login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pages/admin/login/login.component */ "./src/app/pages/admin/login/login.component.ts");
/* harmony import */ var _pages_admin_register_register_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pages/admin/register/register.component */ "./src/app/pages/admin/register/register.component.ts");
/* harmony import */ var ngx_alerts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-alerts */ "./node_modules/ngx-alerts/fesm5/ngx-alerts.js");
/* harmony import */ var ngx_lottie__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-lottie */ "./node_modules/ngx-lottie/fesm5/ngx-lottie.js");
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lottie-web */ "./node_modules/lottie-web/build/player/lottie.js");
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lottie_web__WEBPACK_IMPORTED_MODULE_9__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










function playerFactory() {
    return lottie_web__WEBPACK_IMPORTED_MODULE_9___default.a;
}
var AuthLayoutModule = /** @class */ (function () {
    function AuthLayoutModule() {
    }
    AuthLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_auth_layout_routing__WEBPACK_IMPORTED_MODULE_4__["AuthLayoutRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                ngx_lottie__WEBPACK_IMPORTED_MODULE_8__["LottieModule"].forRoot({ player: playerFactory, useCache: true }),
                ngx_alerts__WEBPACK_IMPORTED_MODULE_7__["AlertModule"].forRoot({ maxMessages: 5, timeout: 3000, position: 'right' })
                // NgbModule
            ],
            declarations: [
                _pages_admin_login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"],
                _pages_admin_register_register_component__WEBPACK_IMPORTED_MODULE_6__["RegisterComponent"]
            ],
            providers: [
                ngx_alerts__WEBPACK_IMPORTED_MODULE_7__["AlertService"]
            ]
        })
    ], AuthLayoutModule);
    return AuthLayoutModule;
}());



/***/ }),

/***/ "./src/app/layouts/auth-layout/auth-layout.routing.ts":
/*!************************************************************!*\
  !*** ./src/app/layouts/auth-layout/auth-layout.routing.ts ***!
  \************************************************************/
/*! exports provided: AuthLayoutRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthLayoutRoutes", function() { return AuthLayoutRoutes; });
/* harmony import */ var _pages_admin_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/admin/login/login.component */ "./src/app/pages/admin/login/login.component.ts");
/* harmony import */ var _pages_admin_register_register_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages/admin/register/register.component */ "./src/app/pages/admin/register/register.component.ts");


var AuthLayoutRoutes = [
    { path: 'login', component: _pages_admin_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"] },
    { path: 'signup', component: _pages_admin_register_register_component__WEBPACK_IMPORTED_MODULE_1__["RegisterComponent"] }
];


/***/ }),

/***/ "./src/app/pages/admin/login/login.component.html":
/*!********************************************************!*\
  !*** ./src/app/pages/admin/login/login.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger py-7 py-lg-8\">\r\n  <div class=\"container\">\r\n    <div class=\"header-body text-center mb-7\">\r\n      <div class=\"row justify-content-center\">\r\n        <div class=\"col-lg-5 col-md-6\">\r\n          <h1 class=\"text-white\">Result Square Admin!</h1>\r\n          <p class=\"text-lead text-light\">Result Square Admin Login</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"separator separator-bottom separator-skew zindex-100\">\r\n    <svg x=\"0\" y=\"0\" viewBox=\"0 0 2560 100\" preserveAspectRatio=\"none\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\r\n      <polygon class=\"fill-default\" points=\"2560 0 2560 100 0 100\"></polygon>\r\n    </svg>\r\n  </div>\r\n</div>\r\n<!-- Page content -->\r\n<div class=\"container mt--8 pb-5\">\r\n  <div class=\"row justify-content-center\">\r\n    <div class=\"col-lg-5 col-md-7\">\r\n      <div class=\"card bg-secondary shadow border-0\">\r\n        <div class=\"card-body px-lg-5 py-lg-5\">\r\n          <div class=\"text-center text-muted mb-4\">\r\n            <small>Sign in with</small>\r\n          </div>\r\n          <form role=\"form\" (submit) = \"loginUser(loginForm)\" #loginForm=\"ngForm\" >\r\n            <div class=\"form-group mb-3\">\r\n              <div class=\"input-group input-group-alternative\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\"><i class=\"ni ni-email-83\"></i></span>\r\n                </div>\r\n                <input class=\"form-control\" name=\"email\" ngModel placeholder=\"Email\" type=\"email\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group input-group-alternative\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\"><i class=\"ni ni-lock-circle-open\"></i></span>\r\n                </div>\r\n                <input class=\"form-control\" name=\"password\" ngModel placeholder=\"Password\" type=\"password\">\r\n              </div>\r\n            </div>\r\n            <!-- <div class=\"custom-control custom-control-alternative custom-checkbox\">\r\n              <input class=\"custom-control-input\" id=\" customCheckLogin\" type=\"checkbox\">\r\n              <label class=\"custom-control-label\" for=\" customCheckLogin\">\r\n                <span class=\"text-muted\">Remember me</span>\r\n              </label>\r\n            </div> -->\r\n            <div class=\"text-center\">\r\n              <button type=\"button\" class=\"btn btn-primary my-4\" type=\"submit\">Sign in</button>\r\n            </div>\r\n            <div *ngIf=\"isLoading\" class=\"loader\">\r\n              <ng-lottie width=\"120px\" height=\"120px\" [options]=\"loadingAnimOptions\" (animationCreated)=\"loadingAnimationCreated($event)\"></ng-lottie>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n      <!-- <div class=\"row mt-3\">\r\n        <div class=\"col-6\">\r\n          <a href=\"javascript:void(0)\" class=\"text-light\"><small>Forgot password?</small></a>\r\n        </div>\r\n        <div class=\"col-6 text-right\">\r\n          <a [routerLink]=\"['signup']\" class=\"text-light\"><small>Create new account</small></a>\r\n        </div>\r\n      </div> -->\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/admin/login/login.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/admin/login/login.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/admin/login/login.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/admin/login/login.component.ts ***!
  \******************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(usersService, router) {
        this.usersService = usersService;
        this.router = router;
        this.errorMessage = '';
        this.isValid = true;
        this.isLoading = false;
        this.loadingAnimOptions = {
            path: '/assets/lib/loading-spinner.json'
        };
    }
    LoginComponent.prototype.loginUser = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (form.invalid) {
                            return [2 /*return*/];
                        }
                        this.isLoading = true;
                        return [4 /*yield*/, this.usersService.loginUser(form.value.email, form.value.password)];
                    case 1:
                        _a.sent();
                        this.isLoading = false;
                        this.isValid = this.usersService.getIsAuth();
                        if (!this.isValid) {
                            this.errorMessage = 'username or password incorrect';
                        }
                        form.resetForm();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        var isAuth = this.usersService.getIsAuth();
        if (isAuth) {
            this.router.navigate(['/rs-admin/dashboard']);
        }
    };
    LoginComponent.prototype.loadingAnimationCreated = function (animationItem) {
        this.loadingAnim = animationItem;
    };
    LoginComponent.prototype.ngOnDestroy = function () {
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/pages/admin/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/pages/admin/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UsersService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/pages/admin/register/register.component.html":
/*!**************************************************************!*\
  !*** ./src/app/pages/admin/register/register.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger py-7 py-lg-8\">\r\n  <div class=\"container\">\r\n    <div class=\"header-body text-center mb-7\">\r\n      <div class=\"row justify-content-center\">\r\n        <div class=\"col-lg-5 col-md-6\">\r\n          <h1 class=\"text-white\">Result Square Admin!</h1>\r\n          <p class=\"text-lead text-light\">Result Square Admin Signup</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"separator separator-bottom separator-skew zindex-100\">\r\n    <svg x=\"0\" y=\"0\" viewBox=\"0 0 2560 100\" preserveAspectRatio=\"none\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\r\n      <polygon class=\"fill-default\" points=\"2560 0 2560 100 0 100\"></polygon>\r\n    </svg>\r\n  </div>\r\n</div>\r\n<!-- Page content -->\r\n<div class=\"container mt--8 pb-5\">\r\n  <!-- Table -->\r\n  <div class=\"row justify-content-center\">\r\n    <div class=\"col-lg-6 col-md-8\">\r\n      <div class=\"card bg-secondary shadow border-0\">\r\n        \r\n        <div class=\"card-body px-lg-5 py-lg-5\">\r\n          <div class=\"text-center text-muted mb-4\">\r\n            <small>Sign up with</small>\r\n          </div>\r\n          <form (submit) = \"addUser(userForm)\" #userForm = \"ngForm\" role=\"form\">\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group input-group-alternative mb-3\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\"><i class=\"ni ni-hat-3\"></i></span>\r\n                </div>\r\n                <input class=\"form-control\" name=\"name\" ngModel placeholder=\"Name\" type=\"text\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group input-group-alternative mb-3\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\"><i class=\"ni ni-email-83\"></i></span>\r\n                </div>\r\n                <input class=\"form-control\" name=\"email\" ngModel placeholder=\"Email\" type=\"email\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group input-group-alternative\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\"><i class=\"ni ni-lock-circle-open\"></i></span>\r\n                </div>\r\n                <input class=\"form-control\" name=\"password\" ngModel placeholder=\"Password\" type=\"password\">\r\n              </div>\r\n            </div>\r\n            <!-- <div class=\"text-muted font-italic\"><small>password strength: <span class=\"text-success font-weight-700\">strong</span></small></div> -->\r\n            <!-- <div class=\"row my-4\">\r\n              <div class=\"col-12\">\r\n                <div class=\"custom-control custom-control-alternative custom-checkbox\">\r\n                  <input class=\"custom-control-input\" id=\"customCheckRegister\" type=\"checkbox\">\r\n                  <label class=\"custom-control-label\" for=\"customCheckRegister\">\r\n                    <span class=\"text-muted\">I agree with the <a href=\"#!\">Privacy Policy</a></span>\r\n                  </label>\r\n                </div>\r\n              </div>\r\n            </div> -->\r\n            <div class=\"text-center\">\r\n              <button type=\"button\" class=\"btn btn-primary mt-4\" type=\"submit\">Create account</button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/admin/register/register.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/pages/admin/register/register.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/admin/register/register.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/admin/register/register.component.ts ***!
  \************************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(usersService) {
        this.usersService = usersService;
        this.nameValid = false;
        this.emailValid = false;
        this.passwordValid = false;
        this.formStatus = false;
        this.isLoading = true;
        this.loadingAnimOptions = {
            path: '/assets/lib/loading-spinner.json'
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.loadingAnimationCreated = function (animationItem) {
        this.loadingAnim = animationItem;
    };
    RegisterComponent.prototype.addUser = function (form) {
        this.isLoading = true;
        if (form.invalid) {
            return;
        }
        this.formStatus = true;
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (form.value.name == '') {
            this.nameValid = false;
        }
        else {
            this.nameValid = true;
        }
        if (form.value.email == '') {
            this.emailValid = false;
        }
        else if (!regexp.test(form.value.email)) {
            this.emailValid = false;
        }
        else {
            this.emailValid = true;
        }
        if (form.value.password == '' || form.value.password.length < 6) {
            this.passwordValid = false;
        }
        else {
            this.passwordValid = true;
        }
        if (this.nameValid && this.emailValid && this.passwordValid) {
            this.usersService.addUser(form.value.name, form.value.email, form.value.password);
        }
        else {
            return;
        }
        this.isLoading = false;
        form.resetForm();
        this.formStatus = false;
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/pages/admin/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.scss */ "./src/app/pages/admin/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UsersService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ })

}]);
//# sourceMappingURL=layouts-auth-layout-auth-layout-module.js.map