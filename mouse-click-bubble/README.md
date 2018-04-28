
逛博客的时候发现别人站里有这个这个效果，便想加到自己博客上。正好总结巩固js面向对象知识了  

很简单，引入js文件，new MouseBubble()便可以啦

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
  
