### 修改vconsole为默认隐藏，快速点击左下角5下调出

开发测试需要，部分机型bug无法在pc复现，**又不能让业务测试发现**，故加此入口
+ 使用方法：
    快速点击左下角5次，便可调出
+ 原理
    * 修改默认样式#__vconsole为display:none（本来想着点击之后再new VConsole(顺手还学习了一波new后面有无括号的区别)，这样进页面的log就看不到了）
    * 页面左下角添加width为屏幕大小1/10的div，添加点击事件显示dom
+ other
    原来还傻乎乎的用document.getElementById('__vconsole')，看了文档之后才发现人家有api...vConsole.$dom。:sweat_smile:
### 结论：文档很重要！！！
