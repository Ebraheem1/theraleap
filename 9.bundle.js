(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{116:function(e,t,a){(e.exports=a(23)(!1)).push([e.i,".hand-measurement{display:flex;height:calc(100vh - 150px)}.hand-measurement .logger,.hand-measurement .measurements{flex:1}",""])},117:function(e,t,a){var n=a(116);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,a(22).default)("5a57a2a6",n,!0,{})},166:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a(6),r=a(13),o=a(199);let c=class extends n.default{constructor(){super(...arguments),this.measureHandConfig={mainColor:16711680,drawWireFrame:!1},this.trackingData=r.e(this.$store).getHandTrackingData(this.$store)}};var i=c=function(e,t,a,n){var s,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(o=(r<3?s(o):r>3?s(t,a,o):s(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o}([Object(s.a)({components:{GraphicalHandLogger:o.a}})],c),l=a(10);var u=function(e){a(117)},f=Object(l.a)(i,function(){var e=this.$createElement,t=this._self._c||e;return t("section",{staticClass:"hand-measurement"},[t("graphical-hand-logger",{staticClass:"logger",attrs:{source:this.trackingData,handConfig:this.measureHandConfig}}),this._v(" "),t("section",{staticClass:"measurements"})],1)},[],!1,u,null,null);t.default=f.exports}}]);