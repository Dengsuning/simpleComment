(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e3b52ac2"],{3341:function(t,e,i){},b8bb:function(t,e,i){"use strict";var s=i("3341"),o=i.n(s);o.a},c740:function(t,e,i){"use strict";var s=i("23e7"),o=i("b727").findIndex,n=i("44d2"),a=i("ae40"),c="findIndex",m=!0,l=a(c);c in[]&&Array(1)[c]((function(){m=!1})),s({target:"Array",proto:!0,forced:m||!l},{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n(c)},f1a6:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"custom"},[i("a-row",{attrs:{gutter:16}},[t._l(t.customComments,(function(e){return i("a-col",{key:e.id,attrs:{span:8}},[i("section",{staticClass:"card"},[i("div",{staticClass:"card__title"},[i("div",{staticClass:"card__info"},[t._v(" 快捷键 : "+t._s(e.shortCuts.join(" + "))+" ")]),i("div",{staticClass:"actions"},[i("a-icon",{staticClass:"action-item",attrs:{type:"edit"},on:{click:function(i){return t.onEdit(e)}}}),i("a-icon",{staticClass:"action-item",attrs:{type:"delete"},on:{click:function(i){return t.onDelete(e)}}}),i("a-icon",{staticClass:"action-item",attrs:{type:"zoom-in"},on:{click:function(i){return t.onPreview(e)}}}),i("a-icon",{staticClass:"action-item",attrs:{type:"copy"},on:{click:function(i){return t.copyData(e.comment)}}})],1)]),i("pre",{staticClass:"card__comment"},[t._v(t._s(e.comment))])])])})),i("section",{staticClass:"add-btn",on:{click:function(e){t.modalVisible=!0}}},[i("a-icon",{staticClass:"icon",attrs:{type:"plus"}})],1)],2),i("a-modal",{staticStyle:{top:"40px"},attrs:{title:"添加/修改",width:"700px"},on:{ok:t.setCustomConf,cancel:t.onCancel},model:{value:t.modalVisible,callback:function(e){t.modalVisible=e},expression:"modalVisible"}},[i("a-input-group",{staticStyle:{margin:".5rem  0 1rem"},attrs:{compact:""}},[i("a-select",{model:{value:t.editComm.shortCuts[0],callback:function(e){t.$set(t.editComm.shortCuts,0,e)},expression:"editComm.shortCuts[0]"}},[i("a-select-option",{attrs:{value:"Shift"}},[t._v(" Shift ")])],1),i("a-input",{staticStyle:{width:"50%"},attrs:{placeholder:"可输入快捷键",maxLength:1},model:{value:t.editComm.shortCuts[1],callback:function(e){t.$set(t.editComm.shortCuts,1,e)},expression:"editComm.shortCuts[1]"}})],1),i("a-textarea",{attrs:{placeholder:"自定义注释","auto-size":{minRows:15,maxRows:25}},model:{value:t.editComm.comment,callback:function(e){t.$set(t.editComm,"comment",e)},expression:"editComm.comment"}})],1),i("a-modal",{attrs:{okText:"Copy"},on:{ok:function(e){return t.copyData(t.editComm.comment)}},model:{value:t.previewVisible,callback:function(e){t.previewVisible=e},expression:"previewVisible"}},[i("pre",[t._v(t._s(t.editComm.comment))])])],1)},o=[],n=(i("c740"),i("a434"),i("d4ec")),a=i("bee2"),c=i("2caf"),m=i("262e"),l=i("9ab4"),r=i("60a3"),u=i("e33d"),d=function(t){Object(m["a"])(i,t);var e=Object(c["a"])(i);function i(){var t;return Object(n["a"])(this,i),t=e.apply(this,arguments),t.modalVisible=!1,t.previewVisible=!1,t.editComm={id:null,comment:"",shortCuts:["Shift",""]},t}return Object(a["a"])(i,[{key:"created",value:function(){this.customComments=window._customComments||JSON.parse(localStorage.getItem("customComments")||"[]")}},{key:"setCustomConf",value:function(){var t=this;if(this.editComm.id){var e=this.customComments.findIndex((function(e){return e.id===t.editComm.id}));this.customComments[e]=Object.assign({},this.editComm)}else{var i=this.customComments[this.customComments.length-1];i&&i.id?this.editComm.id=i.id+1:this.editComm.id=1,this.customComments.push(Object.assign({},this.editComm))}window._customComments=this.customComments,localStorage.setItem("customComments",JSON.stringify(this.customComments)),this.modalVisible=!1}},{key:"onEdit",value:function(t){this.editComm=Object.assign({},t),this.modalVisible=!0}},{key:"onDelete",value:function(t){var e=this.customComments.findIndex((function(e){return e.id===t.id}));this.customComments.splice(e,1),this.$forceUpdate(),localStorage.setItem("customComments",JSON.stringify(this.customComments))}},{key:"onPreview",value:function(t){this.editComm=Object.assign({},t),this.previewVisible=!0}},{key:"copyData",value:function(t){Object(u["a"])(t||this.editComm.comment),this.$message.success("您的注释已经复制到剪贴板啦！"),this.modalVisible=!1}},{key:"onCancel",value:function(){this.editComm={id:null,comment:"",shortCuts:["Ctrl",""]}}}]),i}(r["e"]);d=Object(l["a"])([Object(r["a"])({})],d);var C=d,h=C,f=(i("b8bb"),i("2877")),p=Object(f["a"])(h,s,o,!1,null,"6f8d5c18",null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-e3b52ac2.0bbf5e6e.js.map