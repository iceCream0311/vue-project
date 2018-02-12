const arryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];
arryMethods.forEach((method) => {
  //原生Array的原型方法
  let original = Array.prototype[method];
  //将push,pop,等封装好的方法定义在对象arrayAugmentation的属性上
  //注意是属性而非原型属性
  arrayAugmentations[method] = function() {
    console.log('现在调用方法' + method)
    return original.apply(this, arguments)
  }
});
let list = ['a', 'b', 'c'];
list.__proto__ = arrayAugmentations;
list.push('d');
let list2 = ['a1', 'a2', 'c1'];
list2.push('d')