// pages/index/storeNavigation/storeNavigation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.00229,
    longitude: 113.3345211,
    userLatitude: 0,
    userLongitude: 0,
    distance:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userLongitude: options.longitude,
      userLatitude: options.latitude,
      distance: options.distance
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

  // 位置信息
  getLocationMap:function(){
    wx.navigateTo({
      url: `/pages/index/locationInformation/locationInformation?longitude=${this.data.userLongitude}&latitude=${this.data.userLatitude}`,
    });
  },


})