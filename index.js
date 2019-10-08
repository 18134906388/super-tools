/**
 * json转URL参数
 */
var urlEncode = function urlEncode(param, key, encode) {
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
var json2url = function json2url(param, key, encode) {
  return urlEncode(param, key, encode).slice(1)
}
module.exports = {
  json2url: json2url
}