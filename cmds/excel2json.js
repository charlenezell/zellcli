/* excel2json commander component
 * To use add require('../cmds/excel2json.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';

var xlsx = require('node-xlsx');
var fs=require("fs");
var mkdirp = require('mkdirp');
var path=require("path");
function setValueByString(string,value,context) {
  generateNS(string,value,context);
}
function isNum(a){
  return!isNaN(parseFloat(a))&&isFinite(a);
}
function generateNS(k,obj,context) {
      var e = k.split("."), f = context||window, g = null;
      while (g = e.shift()){
        if (e.length) {
          f[g] === undefined && (isNum(e[0])?(f[g] = []):f[g]={});
          f = f[g]
        }else if (f[g] === undefined){
          f[g] = obj;
        }else{
          console.log("[" + k + "] : has been register");
        }
      }
    }

module.exports = function(program) {
	program
   .command('excel2json <file>')
   .version('0.1.0')
	 .description('parse excel to jsonformat')
   .action(function(file) {
        if(!file.indexOf(".xlsx")){
          console.log("seems is not a xlsx")
        }
        var obj = xlsx.parse(file);
        var sheet1 = obj[0].data;
        var dataRows = sheet1.slice(2); //第一行是开发定义，第二行是默认定义标题，
        var defineRow = sheet1[0];
        var o = [];
        dataRows.forEach((v, k) => {
          var _o={}
          v.forEach(function(cell, cellkey) {
            setValueByString(defineRow[cellkey], cell,_o);
          })
          o.push(_o);
        });
        var content=JSON.stringify(o, null, "\t");
        mkdirp(program.destination,function(err){
          if(!err) {
            fs.writeFileSync(path.join(program.destination,path.basename(file,".xlsx")+".json"),content,"utf8")
          }
        })
    });
};
