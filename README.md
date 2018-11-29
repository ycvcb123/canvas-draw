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

