(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{169:function(e,t,n){(e.exports=n(80)(!1)).push([e.i,"",""])},170:function(e,t,n){var s=n(169);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,n(79).default)("771dd490",s,!0,{})},171:function(e,t,n){(e.exports=n(80)(!1)).push([e.i,".md-card{max-width:800px}.md-field input[type=range]{margin-top:25px}",""])},172:function(e,t,n){var s=n(171);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,n(79).default)("a2b8b71c",s,!0,{})},193:function(e,t,n){"use strict";n.r(t);var s=n(12),a=n(78);let r=class extends s.default{};var i=r=function(e,t,n,s){var a,r=arguments.length,i=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,s);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(i=(r<3?a(i):r>3?a(t,n,i):a(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i}([Object(a.Component)({components:{}})],r),c=n(77),l=Object(c.a)(i,function(){var e=this.$createElement;return(this._self._c||e)("router-view")},[],!1,null,null,null);t.default=l.exports},194:function(e,t,n){"use strict";n.r(t);var s=n(12),a=n(78);let r=class extends s.default{};var i=r=function(e,t,n,s){var a,r=arguments.length,i=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,s);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(i=(r<3?a(i):r>3?a(t,n,i):a(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i}([Object(a.Component)({components:{}})],r),c=n(77);var l=function(e){n(170)},o=Object(c.a)(i,function(){var e=this.$createElement,t=this._self._c||e;return t("md-tabs",{staticClass:"md-primary",attrs:{"md-sync-route":""}},[t("md-tab",{attrs:{"md-label":"Available Classifiers",to:"/classify/classifiers"}}),this._v(" "),t("md-tab",{attrs:{"md-label":"Settings",to:"/classify/settings"}})],1)},[],!1,l,null,null);t.default=o.exports},196:function(e,t,n){"use strict";n.r(t);var s=n(12),a=n(78);let r=class extends s.default{};var i=r=function(e,t,n,s){var a,r=arguments.length,i=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,s);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(i=(r<3?a(i):r>3?a(t,n,i):a(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i}([Object(a.Component)({components:{}})],r),c=n(77),l=Object(c.a)(i,function(){var e=this.$createElement;return(this._self._c||e)("section",[this._v("Classify Settings")])},[],!1,null,null,null);t.default=l.exports},200:function(e,t,n){"use strict";n.r(t);var s,a=n(12),r=n(78);!function(e){e[e.Number=0]="Number",e[e.Slider=1]="Slider",e[e.String=2]="String"}(s||(s={}));var i=n(168);class c{constructor(e){this.detectionThreshhold=e}classify(e){return e.pipe(Object(i.a)(300),Object(i.b)(e=>({})))}}c.metadata={name:"ThumbSpreadClassifier",desc:"Detects extension of Thumb",examplePath:"assets/thera-rec-slow-thumb-spread.json"},c.settings=[{name:"Detection Threshhold",desc:"How generously to trigger the detection",setting:{type:s.Slider,min:0,max:1,value:.7,step:.05}},{name:"Text test",desc:"Desc",setting:{type:s.String,value:"test"}}];const l={[c.name]:c};var o=n(167);let d=class extends a.default{constructor(){super(...arguments),this.SettingType=s,this.examples={}}async created(){await Object.entries(l).forEach(async([e,t])=>{const s=t.metadata.examplePath;s&&(this.examples[e]=await new Promise(e=>n.e(4).then(function(){var t=[n(201)(s)];e.bind(this).apply(null,t)}.bind(this)).catch(n.oe)))})}async getExampleSource(e){const t=l[e].metadata.examplePath;if(t){const e=await new Promise(e=>n.e(4).then(function(){var s=[n(201)(t)];e.bind(this).apply(null,s)}.bind(this)).catch(n.oe));console.log(e)}}get classifiers(){return Object.entries(l)}};var u=d=function(e,t,n,s){var a,r=arguments.length,i=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,s);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(i=(r<3?a(i):r>3?a(t,n,i):a(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i}([Object(r.Component)({components:{GraphicalHandLogger:o.a}})],d),p=n(77);var f=function(e){n(172)},m=Object(p.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",e._l(e.classifiers,function(t){var s=t[0],a=t[1];return n("md-card",{key:s},[n("md-card-media",[a.metadata.examplePath?n("graphical-hand-logger"):e._e()],1),e._v(" "),n("md-card-header",[n("div",{staticClass:"md-title"},[e._v(e._s(a.metadata.name))]),e._v(" "),n("div",{staticClass:"md-subhead"},[e._v(e._s(s))])]),e._v(" "),n("md-card-actions",[n("md-button",[e._v("Action")]),e._v(" "),n("md-button",[e._v("Action")])],1),e._v(" "),n("md-card-content",[n("md-subheader",[e._v("Classifier Description")]),e._v(" "),n("section",{domProps:{innerHTML:e._s(a.metadata.desc)}}),e._v(" "),n("md-subheader",[e._v("Classifier Settings")]),e._v(" "),n("md-divider"),e._v(" "),e._l(a.settings,function(t,s){return n("section",{key:s},[t.setting.type===e.SettingType.Slider?n("md-field",[n("label",[e._v(e._s(t.name))]),e._v(" "),n("md-input",{attrs:{type:"range",min:t.setting.min,max:t.setting.max,step:t.setting.step}}),e._v(" "),n("span",{staticClass:"md-helper-text"},[e._v(e._s(t.desc))])],1):t.setting.type===e.SettingType.String?n("md-field",[n("label",[e._v(e._s(t.name))]),e._v(" "),n("md-input",{attrs:{type:"text"}}),e._v(" "),n("span",{staticClass:"md-helper-text"},[e._v(e._s(t.desc))])],1):t.setting.type===e.SettingType.Number?n("md-field",[n("label",[e._v(e._s(t.name))]),e._v(" "),n("md-input",{attrs:{type:"number"}}),e._v(" "),n("span",{staticClass:"md-helper-text"},[e._v(e._s(t.desc))])],1):e._e()],1)})],2)],1)}))},[],!1,f,null,null);t.default=m.exports}}]);