// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoCompleted: true, 
    avatarUrl: '',
    nickName: ''
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    this.setData({
      avatarUrl: app.globalData.avatarUrl,
      nickName: app.globalData.nickName
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  /**
   * 会员中心
   */
  showVipInfo() {
    wx.navigateTo({
      url: "/pages/home/vipInfo/vipInfo"
    });
  },

  /**
   * 详情报名信息
   */
  showDetail(){
    wx.navigateTo({
      url: "/pages/home/userInfo/userInfo"
    });
  },

  /**
   * 意见反馈
   */
  feedbackHandle(){
    wx.navigateTo({
      url: '/pages/home/feedback/feedback',
    });
  },

  /**
   * 联系我们
   */
  callMeHandle() {
    wx.makePhoneCall({
      phoneNumber:"18126823957",
      success(){
        console.log('success------');
      },
      fail(){
        console.log('fail-----');
      }
    });

  },

  /**
   * 跳转到关于我们
   */
  getAboutUsInfo(e) {
    var cid = e.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '/pages/home/aboutUs/aboutUs?cid=' + cid,
    });
  },

  /**
   * 授权登陆
   */
  onGotUserInfo(e) {
    console.log(e);
    var app = getApp();
    var _this = this;
    wx.getSetting({
      success(res) {
        if (e.detail.userInfo != null) {
          app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
          app.globalData.nickName = e.detail.userInfo.nickName;
          _this.setData({
            avatarUrl: e.detail.userInfo.avatarUrl,
            nickName: e.detail.userInfo.nickName
          })
          wx.setStorage({
            key: 'nickName',
            data: _this.data.nickName,
          })
          wx.setStorage({
            key: 'avatarUrl',
            data: _this.data.avatarUrl,
          })
        } else {
          console.log('不允许授权');
        }
      }
    })
  },
})