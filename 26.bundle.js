(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{189:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SpaceShooterGame; });\nconst p5 = __webpack_require__(124);\nclass SpaceShooterGame {\n    async onStart(config) {\n        this.iP5 = new p5((s) => {\n            s.setup = () => {\n                s.createCanvas(config.element.clientWidth, config.element.clientHeight);\n            };\n            s.draw = () => {\n                s.background(0);\n                s.fill(255);\n                s.rect(100, 100, 50, 50);\n            };\n        }, config.element);\n    }\n    async onStop() {\n        console.log("onStop");\n    }\n    async onPause() {\n        console.log("onPause");\n    }\n    onClassificationReceived(c) { }\n    onMotionTrackingDataReceived(m) { }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTg5LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVzL3NwYWNlLXNob290ZXIvaW5kZXgudHM/OTZkMyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwNSA9IHJlcXVpcmUoXCJwNS9saWIvcDUubWluXCIpIGFzIGFueTtcblxuaW1wb3J0IHsgR2FtZSwgR2FtZUNvbmZpZ3VyYXRpb24gfSBmcm9tIFwiQC9nYW1lcy90eXBlc1wiO1xuaW1wb3J0IHsgQ2xhc3NpZmljYXRpb25EYXRhIH0gZnJvbSBcIkAvY2xhc3NpZnlcIjtcbmltcG9ydCB7IEdlbmVyaWNIYW5kVHJhY2tpbmdEYXRhIH0gZnJvbSBcIkAvZGV2aWNlc1wiO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIHA1OiBhbnk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BhY2VTaG9vdGVyR2FtZSBpbXBsZW1lbnRzIEdhbWUge1xuICBwdWJsaWMgaVA1OiBwNSB8IHVuZGVmaW5lZDtcblxuICBhc3luYyBvblN0YXJ0KGNvbmZpZzogR2FtZUNvbmZpZ3VyYXRpb24pIHtcbiAgICB0aGlzLmlQNSA9IG5ldyBwNSgoczogcDUpID0+IHtcbiAgICAgIHMuc2V0dXAgPSAoKSA9PiB7XG4gICAgICAgIHMuY3JlYXRlQ2FudmFzKGNvbmZpZy5lbGVtZW50LmNsaWVudFdpZHRoLCBjb25maWcuZWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgfTtcblxuICAgICAgcy5kcmF3ID0gKCkgPT4ge1xuICAgICAgICBzLmJhY2tncm91bmQoMCk7XG4gICAgICAgIHMuZmlsbCgyNTUpO1xuICAgICAgICBzLnJlY3QoMTAwLCAxMDAsIDUwLCA1MCk7XG4gICAgICB9O1xuICAgIH0sIGNvbmZpZy5lbGVtZW50KTtcbiAgfVxuXG4gIGFzeW5jIG9uU3RvcCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9uU3RvcFwiKTtcbiAgfVxuXG4gIGFzeW5jIG9uUGF1c2UoKSB7XG4gICAgY29uc29sZS5sb2coXCJvblBhdXNlXCIpO1xuICB9XG4gIG9uQ2xhc3NpZmljYXRpb25SZWNlaXZlZChjOiBDbGFzc2lmaWNhdGlvbkRhdGEpIHt9XG5cbiAgb25Nb3Rpb25UcmFja2luZ0RhdGFSZWNlaXZlZChtOiBHZW5lcmljSGFuZFRyYWNraW5nRGF0YSkge31cbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBWUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///189\n')}}]);