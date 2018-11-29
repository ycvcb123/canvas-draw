Component({
    properties: {
        //起点信息
        fromLocation: {
            type: String,
            value: null,
            // observer: function() {
            //     this.createShareImage();
            // }
        },
        //终点信息
        toLocation: {
            type: String,
            value: null,
            // observer: function() {
            //     this.createShareImage();
            // }
        },
        //发车时间
        startTime: {
            type: String,
            value: null,
            observer: function() {
                this.createShareImage();
            }
        },
        //图片路径
        imagePath: {
            type: String,
            value: '/images/shareBg.png',
            // observer: function() {
            //     this.createShareImage();
            // }
        },
        //分享页面路径
        sharePath: {
            type: String,
            value: null,
            // observer: function() {
            //     this.createShareImage();
            // }
        }
    },
    attached: function() {
        this.ctx = wx.createCanvasContext('myCanvas', this);
        // this.createShareImage();
    },
    data: {
        fromLocation: '',
        toLocation: '',
        startTime: '',
        imagePath: '',
        src: ''
    },
    methods: {
        createShareImage: function() {
            var that = this;
            //还没有收到imagePath不往下执行
            if (!that.data.imagePath) {
                return;
            }
            //判断图片是否来源于网络
            if (/http/.test(that.data.imagePath)) {
                var imageInfo = that.handleNetImg();
                imageInfo.then((res) => {
                    that.drawImageAndText(res.path);
                });
            } else {
                that.drawImageAndText(that.data.imagePath);
            }
        },
        //网络图片处理
        handleNetImg: function() {
            var that = this;
            return new Promise((resolve, reject) => {
                wx.getImageInfo({
                    src: that.data.imagePath,
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        },
        //合并文字和图案
        drawImageAndText: function(path) {
            var that = this;
            //防止加载中canvas上下文没有生成
            if (!that.ctx) {
                return;
            }
            var { startTime } = that.data;
            startTime = startTime.substring(5) + '发车';
            //canvas设置
            that.ctx.setFillStyle('#fff');
            that.ctx.drawImage(path, 0, 0, that.autoSize(420), that.autoSize(336));
            that.ctx.setFontSize(32);
            that.ctx.fillText(startTime, 20, 50);

            that.ctx.setFillStyle('#38383c');
            that.ctx.setFontSize(22);
            var infoArr = [that.data.fromLocation, that.data.toLocation]
            for (var i = 0; i < infoArr.length; i++) {
                infoArr[i] = infoArr[i].length > 12 ? `${infoArr[i].substring(0,12)}...` : infoArr[i];
                if (i == 0) {
                    that.ctx.fillText(infoArr[i], 50, 120);
                    that.ctx.drawImage('/images/canvas-start-flag.png', 26, 106, 12, 12);
                } else {
                    that.ctx.fillText(infoArr[i], 50, 120 + i * 40);
                    that.ctx.drawImage('/images/canvas-end-flag.png', 26, 106 + i * 40, 12, 12);
                }
            }
            //画小圈圈
            that.ctx.drawImage('/images/line-flag.png', 30, 122, 3, 19);


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
        },
        //图片尺寸兼容
        autoSize: function(num) {
            var scale = wx.getSystemInfoSync().windowWidth / 375;
            return num * scale
        }
    }
});