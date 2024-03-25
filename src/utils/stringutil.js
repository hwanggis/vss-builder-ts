String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, 'gm'), s2)
}
String.prototype.format = function (args) {
  if (arguments.length > 0) {
    var result = this
    if (arguments.length == 1 && typeof (args) === 'object') {
      for (var key in args) {
        var reg = new RegExp('({' + key + '})', 'g')
        result = result.replace(reg, args[key])
      }
    } else {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == undefined) {
          return ''
        } else {
          var reg = new RegExp('({[' + i + ']})', 'g')
          result = result.replace(reg, arguments[i])
        }
      }
    }
    return result
  } else {
    return this
  }
}
