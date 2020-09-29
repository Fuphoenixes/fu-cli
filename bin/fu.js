#!/usr/bin/env node
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("@babel/runtime/regenerator"),require("@babel/runtime/helpers/asyncToGenerator"),require("path"),require("fs"),require("commander"),require("chalk"),require("inquirer"),require("handlebars"),require("download-git-repo"),require("ora"),require("child_process"),require("axios"),require("semver"),require("log-symbols")):"function"==typeof define&&define.amd?define(["@babel/runtime/regenerator","@babel/runtime/helpers/asyncToGenerator","path","fs","commander","chalk","inquirer","handlebars","download-git-repo","ora","child_process","axios","semver","log-symbols"],n):(e="undefined"!=typeof globalThis?globalThis:e||self).fu=n(e._regeneratorRuntime,e._asyncToGenerator,e.path,e.fs,e.commander,e.chalk,e.inquirer,e.handlebars,e.downloadGitRepo,e.ora,e.child_process,e.axios,e.semver,e.logSymbols)}(this,function(e,n,r,t,a,o,i,l,s,u,c,d,f,p){"use strict";function m(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var g=m(e),h=m(n),b=m(r),v=m(t),a=m(a),y=m(o),w=m(i),x=m(l),k=m(s),q=m(u),c=m(c),_=m(d),j=m(f),S=m(p),G=[{name:"vue-pc-admin",description:"vue-pc-admin (基于 vue 开箱即用的中台前端方案)",gitUrl:"https://github.com/Fuphoenixes/vue-pc-admin.git"},{name:"vue-h5-template",description:"vue-h5-template (基于 vue 开箱即用的移动端H5解决方案)",gitUrl:"https://github.com/Fuphoenixes/vue-h5-template.git"}],F=function(e){return[{name:"template",type:"list",choices:G.map(function(e){return{name:e.description,value:e}}),message:"请选择项目模板"},{name:"name",type:"string",message:"请输入项目名称",default:e||"project"},{name:"version",type:"string",message:"请设置版本号",default:"0.0.1"},{name:"description",type:"string",message:"请输入项目描述",default:"description"},{name:"author",type:"string",message:"请输入项目作者",default:"author"},{name:"isEslint",type:"confirm",message:"是否开启eslint"}]},T="@sanp/fu-cli",B="1.0.6",I="自定义脚手架",U={clean:"rimraf ./bin && mkdir bin",build:"npm run clean && rollup --config"},z=["fu-cli","fu","cli"],C="zhaotian",D={fu:"./bin/fu.js"},E={axios:"^0.20.0",chalk:"^4.1.0",child_process:"^1.0.2",commander:"^6.1.0","download-git-repo":"^3.0.2",handlebars:"^4.7.6",inquirer:"^7.3.3","log-symbols":"^4.0.0",ora:"^5.1.0",semver:"^7.3.2","@babel/core":"^7.11.6","@babel/preset-env":"^7.11.5"},P={"@rollup/plugin-json":"^4.1.0",rollup:"^2.28.2","rollup-plugin-babel":"^4.4.0","rollup-plugin-commonjs":"^10.1.0","rollup-plugin-uglify":"^6.0.4"},R={name:T,version:B,description:I,scripts:U,keywords:z,author:C,license:"ISC",bin:D,private:!1,dependencies:E,devDependencies:P};var V,H=(V=Object.freeze({__proto__:null,name:T,version:B,description:I,scripts:U,keywords:z,author:C,license:"ISC",bin:D,dependencies:E,devDependencies:P,default:R}))&&V.default||V,O=c.default.spawn,c={downloadFromGit:function(a,e,o){return new Promise(function(n,r){var t=q.default("".concat(a,"模板下载中^.^ 请稍后"));t.start(),k.default("direct:".concat(e),o,{clone:!0},function(e){e?(r(e),t.fail(),console.log(S.default.error,y.default.red("error! ".concat(a,"模板拉取失败")))):(t.succeed(),n())})})},runInstall:function(t,e,n){var a=1<arguments.length&&void 0!==e?e:"npm",o=2<arguments.length&&void 0!==n?n:["install"];return new Promise(function(e,n){console.log(y.default.greenBright("正在安装项目依赖……\n"));var r=O(a,o,{cwd:t||process.cwd(),stdio:"inherit",shell:!0});r.on("exit",function(){console.log(S.default.success,y.default.greenBright("依赖安装完成!")),e()}),r.on("error",function(e){console.log(S.default.error,y.default.red("依赖安装失败")),n(e)})})},checkVersion:function(){var e=h.default(g.default.mark(function e(){var n,r;return g.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_.default({url:"https://registry.npmjs.org/@sanp/fu-cli",method:"GET"});case 3:200===(r=e.sent).status?(n=r.data["dist-tags"].latest,r=H.version,console.log(r,n),j.default.lt(r,n)&&(console.log(S.default.info,y.default.yellow("报告!有一个新的fu-cli版本, 请及时更新")),console.log(S.default.success,"现在最新的是:"+y.default.green(n)),console.log(S.default.warning,"你下载的是:"+y.default.red(r)))):console.log(S.default.warning,"比对线上仓库失败"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(S.default.warning,"比对线上仓库失败");case 10:case"end":return e.stop()}},e,null,[[0,7]])}));return function(){return e.apply(this,arguments)}}()},a=a.default.program,A=c.downloadFromGit,J=c.runInstall,K=c.checkVersion;a.version(H.version).command("init [name]").description("初始化模板").action(function(){var n=h.default(g.default.mark(function e(n){var r,t,a,o,i;return g.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K();case 2:if(r=process.cwd(),!n){e.next=8;break}if(r=b.default.resolve(process.cwd(),n),v.default.existsSync(r))return console.log(y.default.red("当前目录已存在文件名".concat(n,"， 请重新输入!"))),e.abrupt("return");e.next=8;break;case 8:return e.next=10,w.default.prompt(F(n));case 10:return t=e.sent,e.next=13,A(t.template.name,t.template.gitUrl,r);case 13:if(a=b.default.join(r,"__package.json"),o=b.default.join(r,"package.json"),v.default.existsSync(a)){e.next=18;break}return console.log(y.default.red("error! 模板有误, 未找到__package.json文件")),e.abrupt("return");case 18:return i=v.default.readFileSync(a).toString(),i=x.default.compile(i),i=i(t),v.default.writeFileSync(o,i),v.default.unlinkSync(a),console.log(y.default.green("success！ 项目初始化成功")+"\n"),e.next=26,J(r);case 26:console.log(y.default.greenBright("开启项目")+"\n"+y.default.greenBright("npm run dev"));case 27:case"end":return e.stop()}},e)}));return function(e){return n.apply(this,arguments)}}()),a.parse(process.argv);return{}});
