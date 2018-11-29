# canvas-draw
小程序 canvas 动态绘制图片


```javascript
//合并文字和图案
drawImageAndText: function(path) {
    //绘制具体内容 todo...

    //canvas转图片
    that.ctx.draw(false, () => {
        setTimeout(() => {
            wx.canvasToTempFilePath({
                canvasId: 'myCanvas',
                success: (res) => {
                    that.triggerEvent('sharePic', { picPath: res.tempFilePath });
                    that.setData({
                        src: res.tempFilePath
                    });
                }
            }, that);
        }, 300);
    });
}
```

![](https://user-gold-cdn.xitu.io/2018/11/29/1675e6cbfd2a8b37?w=644&h=486&f=png&s=286870)
