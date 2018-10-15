// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyDetail:{}, //公司详情
    jobDetail:{},  // 工作详情
    isCollect: false, // 是否被收藏工作
    isApply: false,   // 是否报名申请工作
    isShowApply: false, // 是否出现申请当前工作
    isSubmit: false, // 是否提交申请
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    const app = getApp();
    var id = options.id;
    var cid = options.cid;
    console.log(id, cid);
    var jobTypeList = app.globalData.jobTypeList;
    var companyProfileList = app.globalData.companyProfileList;
    // 获取公司详情
    for (var tmp of companyProfileList){
      if(cid == tmp.id){
        this.setData({
          companyDetail: tmp
        });
        break;
      }
    }
    // 获取工作详情
    for (var tmp of jobTypeList) {
      if (id == tmp.id) {
        this.setData({
          jobDetail: tmp
        });
        break;
      }
    }
    // 是否收藏

    id = parseInt(id);
    this.checkCollectJob(id)
    // 是否报名
    this.checkApplyJob(id)
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
   * 显示企业简介页面
   */
  showCompanyProfile:function(e){
    var cid = e.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '/pages/company/companyProfile/companyProfile?cid='+cid,
    })
  },

  /**
   * 判断工作是否被收藏
   */
  checkCollectJob:function(id){
    var app = getApp();
    var flag = app.globalData.collectIndex.indexOf(id) != -1;
    this.setData({
      isCollect: flag
    }) 
  },

  /**
   * 返回index页面
   */
  backIndexHandle: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 收藏或取消收藏工作
   */
  collectJobHandle:function(e){
    var app = getApp();
    var id = e.currentTarget.dataset.id;
    // 收藏
    if (app.globalData.collectIndex.indexOf(id) == -1){
      app.globalData.collectIndex.push(id);
      this.setData({
        isCollect: true
      }) 
      wx.setStorage({
        key: 'collectIndex',
        data: app.globalData.collectIndex,
      })
    }else{
      // 取消收藏
      var index = app.globalData.collectIndex.indexOf(id);
      app.globalData.collectIndex.splice(index,1);
      this.setData({
        isCollect: false
      }) 
      wx.setStorage({
        key: 'collectIndex',
        data: app.globalData.collectIndex,
      })
    }
  },

  /**
   * 判断是否报名申请过此工作
   */
  checkApplyJob:function(id){
    var app = getApp();
    var flag = app.globalData.applyJobIndex.indexOf(id) != -1;
    this.setData({
      isApply: flag
    })
  },

  /**
   * 显示申请工作界面
   */
  applyJobHandle: function (e) {
    if (!this.data.isApply) {
      this.setData({
        isShowApply: true
      })
    }else{
      wx.showToast({
        mask:false,
        duration: 2000,
        title: '您已经申请了'
      })
    }
  },

  /**
   * 取消申请工作 
   */
  cancelHandle:function(){
    this.setData({
      isShowApply: false,
      isSubmit: false
    })
  },

  /**
   * 选中具体店铺申请工作
   */
  chooseStoreHandle:function(){
    this.setData({
      isShowApply: false,
      isSubmit:true
    })
  },

  /**
   * 申请
   */
  applyHandle:function(e){
    var app = getApp();
    var id = e.currentTarget.dataset.id;
    app.globalData.applyJobIndex.push(id);
    wx.setStorage({
      key: 'applyJobIndex',
      data: app.globalData.applyJobIndex,
    })
    this.setData({
      isSubmit: false,
      isApply:true
    })
    wx.showToast({
      icon:"success",
      mask:true,
      duration:2000,
      title:'报名成功'
    })
  },

  /**
   * 转发工作
   */
  shareJobHandle:function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 分享
   */
  onShareAppMessage:function(res){
    var job = this.data.jobDetail;
    var cid = this.data.companyDetail.id;
    var label = `【${job.name}】【工资】¥${job.minSalary}-¥${job.maxSalary}/月【返费金额】¥${job.award}`
    return {
      title: label,
      path: '/pages/company/company?id=' + job.id + '&cid=' + cid,
      complete: function (res) {
        console.log(res);
      }
    }
  }

  
})