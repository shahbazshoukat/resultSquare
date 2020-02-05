function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"0soQ":function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var a=n("8Y7J"),r=n("IheW"),u=function(){var t=function(){function t(e){_classCallCheck(this,t),this.http=e}return _createClass(t,[{key:"addClass",value:function(t,e){return this.http.post("/api/section",{title:t,type:e})}},{key:"getAllClasses",value:function(){return this.http.get("/api/sections")}},{key:"getClassById",value:function(t){return this.http.get("/api/section"+t)}},{key:"getClassByTitle",value:function(t){return this.http.get("/api/getSection"+t)}},{key:"updateClass",value:function(t,e,n){return this.http.put("/api/updateSection"+t,{title:e,type:n})}},{key:"deleteClass",value:function(t){return this.http.delete("/api/deleteSection"+t)}}]),t}();return t.ngInjectableDef=a.Sb({factory:function(){return new t(a.Tb(r.c))},token:t,providedIn:"root"}),t}()},sDgk:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var a=n("8Y7J"),r=n("IheW"),u=function(){var t=function(){function t(e){_classCallCheck(this,t),this.http=e}return _createClass(t,[{key:"addResult",value:function(t,e,n,a,r,u,i,s,o){return this.http.post("/api/result",{_id:t,status:e,sectionId:n,boardId:a,year:r,announceDate:u,examType:i,resultUrl:s,tags:o})}},{key:"getAllResultes",value:function(){return this.http.get("/api/results")}},{key:"getResultById",value:function(t){return this.http.get("/api/result/"+t)}},{key:"getResultYears",value:function(t,e){return this.http.get("/api/result-year/".concat(t,"/").concat(e))}},{key:"getResult",value:function(t,e,n,a){return this.http.get("/api/result/".concat(t,"/").concat(e,"/").concat(n,"/").concat(a))}},{key:"getResultsByBoardKey",value:function(t){return this.http.get("/api/results/board/".concat(t))}},{key:"updateResult",value:function(t,e,n,a,r,u,i,s,o){return this.http.put("/api/updateResult/"+t,{status:e,sectionId:n,boardId:a,year:r,announceDate:u,examType:i,resultUrl:s,tags:o})}},{key:"deleteResult",value:function(t){return this.http.delete("/api/deleteResult/"+t)}},{key:"changeResultStatus",value:function(t,e){return this.http.put("/api/updateStatus/"+t,{status:e})}}]),t}();return t.ngInjectableDef=a.Sb({factory:function(){return new t(a.Tb(r.c))},token:t,providedIn:"root"}),t}()},wFLl:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var a=n("8Y7J"),r=n("IheW"),u=function(){var t=function(){function t(e){_classCallCheck(this,t),this.http=e}return _createClass(t,[{key:"addBoard",value:function(t,e,n,a,r,u,i,s,o,c,l){var p={_id:t,key:n.replace(/\s/g,"-"),title:n,province:a,city:r,examTypes:u,sections:i,type:s,webUrl:o,resultUrl:c,tags:l};return this.http.post("/api/board",p)}},{key:"getAllBoardes",value:function(){return this.http.get("/api/boards")}},{key:"getBoardById",value:function(t){return this.http.get("/api/board/"+t)}},{key:"getBoardByKey",value:function(t){return this.http.get("/api/getBoard/"+t)}},{key:"getBoardBySectionTitle",value:function(t){return this.http.get("/api/getBoardBySectionTitle/"+t)}},{key:"updateBoard",value:function(t,e,n,a,r,u,i,s,o,c,l){var p={key:n.replace(/\s/g,"-"),title:n,province:a,city:r,examTypes:u,sections:i,type:s,webUrl:o,resultUrl:c,tags:l};return this.http.put("/api/updateBoard/"+t,p)}},{key:"deleteBoard",value:function(t){return this.http.delete("/api/deleteBoard/"+t)}}]),t}();return t.ngInjectableDef=a.Sb({factory:function(){return new t(a.Tb(r.c))},token:t,providedIn:"root"}),t}()}}]);