以为这个叫popup，结果人家叫actionsheet，那我也这么叫吧:satisfied:

**先引入**
```javascript
import Actionsheet from './actionsheet';
```
**然后 use it**
```javascript
<actionsheet :opts="popupData" :isShow.sync="popupShow"></actionsheet>
```
**Usage**
+ popupData  {Array}
```
    [{
      text: '文字',                 // 文本内容
      cssClasses: content,          // 单体样式类
      handler: function(){/*...*/}  //点击执行函数
    }]
```
+ popupShow {Boolean}
    控制显示隐藏


这么小小的一个小组件，过程中可遇到不少问题，都是自己官方文档不熟，粗心大意不细心导致。总结一下：

这是AngularJS项目的，想着用vue实现一遍，不得不说vue实现真是方便，于是开干，布局样式一切就绪
1. 卡在了显示隐藏这块，
