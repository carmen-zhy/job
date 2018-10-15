// pages/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyJobs:[],
    formId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    this.searchCompany(app.globalData.applyJobIndex, app.globalData.jobTypeList);

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
    const app = getApp();
    this.searchCompany(app.globalData.applyJobIndex, app.globalData.jobTypeList);
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
   * 授权登陆
   */
  onGotUserInfo(e) {
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

  /**
   * 根据index获取申请报名的公司信息
   */
  searchCompany(applyJobIndex, jobTypeList) {
    var company = [];
    for (var i = 0; i < applyJobIndex.length; i++) {
      for (var j = 0; j < jobTypeList.length; j++) {
        if (applyJobIndex[i] == jobTypeList[j]["id"]) {
          company.push(jobTypeList[j]);
          break;
        }
      }
    }
    this.setData({
      applyJobs: company
    })
  },

  /**
   * 显示公司详细信息
   */
  showCompanyDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    var cid = e.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '/pages/company/company?id=' + id + '&cid=' + cid
    });
  }

})