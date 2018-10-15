// pages/home/collectJob/collectJob.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectJob:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    this.getJobByColletIndex(app.globalData.collectIndex, app.globalData.jobTypeList)
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
   * 根据缓存的job index 获取对应的数据
   */
  getJobByColletIndex: function (collectIndex, jobTypeList) {
    var collects = [];
    for (var i = 0; i < collectIndex.length; i++) {
      for (var j = 0; j < jobTypeList.length; j++) {
        if (jobTypeList[j].id == collectIndex[i]) {
          collects.push(jobTypeList[j]);
          break;
        }
      }
    }
    // 最后赋值给collectJob
    this.setData({
      collectJob: collects
    })
  },
  
  /**
   *  显示公司详细信息
   */
  showCompanyDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    var cid = e.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '/pages/company/company?id=' + id + '&cid=' + cid
    });
  },

})