Page({
    /**
     * 页面的初始数据
     */
    data: {
        timeInfo: '',
        on_stop: {},
        off_stop: {}
    },
    onLoad: function() {
        this.setData({
            timeInfo: '2018年10月3日',
            on_stop: {
                name: '平安金融中心'
            },
            off_stop: {
                name: '腾讯滨海大厦'
            }
        });
    },
})