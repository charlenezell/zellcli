var xlsx = require('node-xlsx');
var obj = xlsx.parse("./o.xlsx");
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

console.log(JSON.stringify(o, null, "\t"));

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
