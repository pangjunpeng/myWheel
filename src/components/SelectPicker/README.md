
使用
```javascript
<my-select :lists="lists" :isShow.sync="isShowMbSelect" @result="getRes" index="0"></my-select>
```

+ **lists**: `Array`  
传送数据  ex:
```javascript
[
  {
    id   : 0,
    value: "item0",
    text : "默认1"
  },
  {
    id   : 1,
    value: "item1",
    text : "默认2"
  }
]
```
数据结构可自行在Select中修改


+ selectShow: `Boolean`
  显隐标识
+ getRes: `Function`
  选中数据后的回调函数，参数为所取值
+ index: `Number` | `String`
  可指定默认选中第几条数据，从0开始
  也可指定具体像素，select中一般用不到，后续项目可能会用
  
自己写的插件SelectPicker.js
+ scrollTrigger  实现触发另一div滑动功能
  ```javascript
  params: {
      scrollX: false, // 是否滑动X轴，默认为true
      scrollY: true,  // 是否滑动Y轴，默认为true
    },
  fn  //滑动结束后的回调函数，返回值有translateX，translateY和当前选项索引index
  ```
+ scrollTo
  移动到指定位置。可选值`Number`,`String`(具体像素), `top`，其他尚未添加
  ```javascript
  ```
+ getAttr
  获取元素style属性值，`display`为`none`也可获取

使用方法：
```javascript
import Spicker from './SelectPicker'
var sPicker = new Spicker({
  el    : el1, // 滑动元素
  target: el2, // 被滑动元素
  index : 0
}, function (index) {
  console.log(index)// 初始化完成，返回了第几个
})
sPicker.scrollTrigger({
  scrollX: false, // 可开启x轴和y轴 可滑动
}, function (res) {
  console.log(res) // 返回值
})
```
