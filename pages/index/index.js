// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      { id: 1, jid: 1, img_url: '/assets/home/c1.png' },
      { id: 2, jid: 2, img_url: '/assets/home/c2.png' },
      { id: 3, jid: 3, img_url: '/assets/home/c3.png' },
      { id: 4, jid: 4, img_url: '/assets/home/c4.png' }
    ],
    typeNavList: [
      { id: 1, name: '类型', isChoose: false },
      { id: 2, name: '奖励金额', isChoose: false },
      { id: 3, name: '综合排序', isChoose: false },
      { id: 4, name: '筛选', isChoose: false }  
    ],
    typeList:[],         // 工作种类
    awardList: [],
    rankList: [],
    filterList:[],
    isShowTypeNav:false, // 选中类型
    isShowMask:false,      // 是否显示选择工作的遮罩层
    isShowItem: false,
    isShowAward: false,
    isShowRank: false,
    isShowFilter: false,
    typeNavIndex: -1,  // 临时类型选择导航 index
    awardIndex:-1,     // 奖励金index
    filterIndex: -1,    // 筛选index
    companyProfileList:[],
    jobTypeList:[],
    changeJobType: [],
    latitude: 23.00229,
    longitude: 113.3345211,
    avatarUrl: '',
    userInfo: '',
    nickName: '',
    loadMoreJobs:[],  // 存放加载更多的数据
    hasMore: true,  //是否加载更多 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    this.setData({
      companyProfileList: app.globalData.companyProfileList,
      jobTypeList: app.globalData.jobTypeList,
      typeList: app.globalData.typeList,
      awardList: app.globalData.awardList,
      rankList: app.globalData.rankList,
      filterList: app.globalData.filterList,
      nickName: app.globalData.nickName
    });
    this.changeCompanyHandle();
    this.loadMoreHandle();
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
    this.setData({
      nickName: app.globalData.nickName
    });
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
    setTimeout(()=>{
      this.loadMoreHandle();
    }, 1000);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   *  换一批
   */
  changeCompanyHandle:function(e){
    this.setData({
      changeJobType: []
    });
    var tmp = -1;
    for (var i = 0; i < 2;i++){
      var num = Math.floor(Math.random() * (this.data.jobTypeList.length));
      if (tmp != num){
        if (this.data.changeJobType.length == 2){
          break;
        }
        var status = `changeJobType[${i}]`;
        this.setData({
          [status]: this.data.jobTypeList[num]
        });
      }else if(tmp == num){
        i--;
      }
      tmp = num;
    }
  }, 

  /**
   *  显示公司详细信息
   */
  showCompanyDetail:function(e){
    var id = e.currentTarget.dataset.id;
    var cid = e.currentTarget.dataset.cid;
    wx.navigateTo({
      url:'/pages/company/company?id='+id+'&cid='+cid
    });
  },
  
  /**
   *  计算经纬度距离
   */
  countDistance: function (la1, lo1, la2, lo2) {    //计算距离  km
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;//地球半径
    s = Math.round(s * 10000) / 10000;
   // console.log("计算结果:" + s + "km");
    return parseInt(s);

  },

  /**
   *  门店导航
   */
  goStoreNavigation:function(){
    var userLongitude = 0;
    var userLatitude = 0;
    var _this = this;
    wx.getLocation({
      type:'gcj02',
      success: function(res) {
        //console.log('门店导航---getLocation',res);
        userLongitude = res.longitude;
        userLatitude = res.latitude;
        var distance = _this.countDistance(_this.data.latitude, _this.data.longitude,
          userLatitude, userLongitude);
        wx.navigateTo({
          url: `/pages/index/storeNavigation/storeNavigation?longitude=${userLongitude}&latitude=${userLatitude}&distance=${distance}`,
        });
      }
    }); 
  },

  /**
   *  授权登陆
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
   * 加载更多
   */
  loadMoreHandle(){
    var len = this.data.loadMoreJobs.length;
    var jobTypeList = this.data.jobTypeList;
    var jobs = this.data.loadMoreJobs;
    for(var i=len; i<len+2;i++){
      if (i > jobTypeList.length){
        this.setData({
          hasMore:false
        });
        return;
      } 
      jobs.push(jobTypeList[i]);
      
    }
    this.setData({
      loadMoreJobs: jobs
    });
  },


  

})