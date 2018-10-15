// pages/index/locationInformation/locationInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.00229,
    longitude: 113.3345211,
    userLongitude: 0,
    userLatitude: 0,
    covers: [{
      latitude: 23.00229,
      longitude: 113.3345211,
      iconPath: '/assets/img/location.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userLongitude: options.longitude,
      userLatitude: options.latitude
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

  // 显示用户的位置信息
  showUserLocation:function(){
    var coversLatitude = `covers[0].latitude`;
    var coversLongitude = `covers[0].longitude`;
    this.setData({
      longitude: this.data.userLongitude,
      latitude: this.data.userLatitude,
      [coversLatitude]: parseFloat(this.data.userLatitude),
      [coversLongitude]: parseFloat(this.data.userLongitude)
    });
  }
  

})