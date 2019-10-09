/**
 * json转URL参数
 */
var json2url = function json2url(param, key, encode) {
  let urlEncode = function urlEncode(param, key, encode) {
    if (param==null) return '';
    let paramStr = '';
    let t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '='  + ((encode==null||encode) ? encodeURIComponent(param) : param); 
    } else {
      for (let i in param) {
        let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        paramStr += urlEncode(param[i], k, encode)
      }
    }
    return paramStr;
  }
  return urlEncode(param, key, encode).slice(1)
}

/**
 * url转json参数
 */
var url2json = function url2json(url){
  let arrObj = url.split("?");
  let params = Object.create(null)
  if (arrObj.length > 1){
      arrObj = arrObj[1].split("&");
      arrObj.forEach(item=>{
          item = item.split("=");
          params[item[0]] = item[1]
      })
  }
  return params;
}

/**
 * 通过key和value寻找树中匹配的某一个节点
 */
function findNode (tree, nodeKey, nodeValue) {
  let result = '';
  if (!tree || !nodeKey || !nodeValue) {
    return false
  }
  (tree || []).some(e => {
    if (e[nodeKey] == nodeValue) {
      result = e
      return true
    } else {
      result = findNode(e.children, nodeKey, nodeValue)
      if (!result) {
        return false
      } else {
        return true
      }
    }
  })
  return result
}

/**
 * 格式化时间
 * dateFormater('YYYY-MM-DD HH:mm', t) ==> 2019-06-26 18:30
 * dateFormater('YYYYMMDDHHmm', t) ==> 201906261830
 */
var dateFormater = function dateFormater(formater, t){
  let date = t ? new Date(t) : new Date(),
      Y = date.getFullYear() + '',
      M = date.getMonth() + 1,
      D = date.getDate(),
      H = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g,Y)
      .replace(/YY|yy/g,Y.substr(2,2))
      .replace(/MM/g,(M<10?'0':'') + M)
      .replace(/DD/g,(D<10?'0':'') + D)
      .replace(/HH|hh/g,(H<10?'0':'') + H)
      .replace(/mm/g,(m<10?'0':'') + m)
      .replace(/ss/g,(s<10?'0':'') + s)
}

/**
 * 将指定字符串由一种时间格式转化为另一种
 * dateStrForma('20190626', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * dateStrForma('121220190626', '----YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * dateStrForma('2019年06月26日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20190626
 */
var dateStrForma = function dateStrForma(str, from, to){
  //'20190626' 'YYYYMMDD' 'YYYY年MM月DD日'
  str += ''
  let Y = ''
  if(~(Y = from.indexOf('YYYY'))){
      Y = str.substr(Y, 4)
      to = to.replace(/YYYY|yyyy/g,Y)
  }else if(~(Y = from.indexOf('YY'))){
      Y = str.substr(Y, 2)
      to = to.replace(/YY|yy/g,Y)
  }

  let k,i
  ['M','D','H','h','m','s'].forEach(s =>{
      i = from.indexOf(s+s)
      k = ~i ? str.substr(i, 2) : ''
      to = to.replace(s+s, k)
  })
  return to
}

/**
 * 一键copy
 */
var copyByOneKey = function copyByOneKey(text, callback) {
  let oInput = document.createElement('input');
  oInput.value = text;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand("Copy"); // 执行浏览器复制命令
  oInput.className = 'oInput';
  oInput.style.display='none';
  callback();
}

module.exports = {
  json2url: json2url,
  url2json: url2json,
  findNode: findNode,
  copyByOneKey: copyByOneKey,
  dateFormater: dateFormater,
  dateStrForma: dateStrForma
}