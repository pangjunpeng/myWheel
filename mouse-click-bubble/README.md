
逛博客的时候发现别人站里这个效果不错，便自己写了一个。  
正好总结巩固js面向对象知识了  

## 引入方式
1. `<script src="./mouse-click-bubble.js"></script>`  

2. + `npm install mouse-click-buble --save`
    + 之后`require('mouse-click-bubble')`

引入之后  

```javascript
new MouseBubble()
```
or
```javascript
new MouseBubble({
  value: ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'],
  color: '#a77ee8',
  distance: 100
})
```

## options
+ **value**  `Number || String || Array`  

  提示的文字，数组从第0位开始遍历  

  default: `['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']`
+ **color** `String`

  字体颜色
  
  default: `'#a77ee8'`不要问我这是个啥颜色，我也不知道，就是喜欢
+ **distance** `Number`

  上移距离
  
  default: 100
  
其他配置啥的去改源码吧，代码量也不多，一眼就看懂了