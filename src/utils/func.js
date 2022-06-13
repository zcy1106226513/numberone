function a() {}
var b = function() {}

const c = () => {}

const d = {
  e() {},
  f() {},
  g: function() {}
}
// 匿名函数
(function(a) { console.log(a) })(1)

a()
b()
