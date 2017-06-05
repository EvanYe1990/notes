# HTML5多媒体标签之视频video

多媒体标签Video可以实现视频的自动播放、暂停、全屏等，低版本浏览器请注意兼容性。
```
<video class="video-player" width="160" height="90">
  <source src="1.mp4" type="video/mp4" />
</video>
```  

## 除width、height、src外，其它常用属性：  
- 1.controls: 视频控制按钮(播放／暂停、音量、全屏)[查看示例](/notes/docs/20150417/demo/controls.html)  

```
<video controls="controls">
  <source src="1.mp4" type="video/mp4" />
  当前浏览器不支持video标签
</video>
```

- 2.autoplay: 视频在就绪之后马上播放[查看示例](/notes/docs/20150417/demo/autoplay.html)  

```
<video controls="controls" autoplay="autoplay">
  <source src="1.mp4" type="video/mp4" />
  当前浏览器不支持video标签
</video>
```

- 3.loop: 当媒介文件完成播放后再次开始播放(循环播放)[查看示例](/notes/docs/20150417/demo/loop.html)  

```
<video controls="controls" autoplay="autoplay" loop="loop">
  <source src="1.mp4" type="video/mp4" />
  当前浏览器不支持video标签
</video>
```

- 4.preload: 视频在页面加载时进行加载，并预备播放(预加载)[查看示例](/notes/docs/20150417/demo/preload.html)  
**如果使用 "autoplay"，则忽略该属性**  

```
<video controls="controls" preload="auto">
  <source src="1.mp4" type="video/mp4" />
  当前浏览器不支持video标签
</video>
```