// pages/index/latestJob/latestJob.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latestJobs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var list = [];
    var today = new Date().toLocaleDateString();
    today = new Date(today).getTime();
    for (var job of app.globalData.jobTypeList){
      var nowDate = new Date(job.publishTime).getTime();
      if (nowDate >= today){
        list.push(job);
      }
    }
    this.setData({
      latestJobs: list
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

  }
})