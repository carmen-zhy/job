// pages/home/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    phone: '',     
    sex: '', 
    date: '', 
    address: '', 
    idcard: '',    
    introduce: '',
    finishedInfo:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var user = app.globalData.user;
    // 是否有user的缓存信息
    if (JSON.stringify(user) !== '{}'){
      this.setData({
        username: user.username,
        phone: user.phone,
        sex: user.sex,
        date: user.date,
        address: user.address,
        idcard: user.idcard,
        introduce: user.introduce
      });
    }

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
   * 选择出生日期
   */
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  /*
   *验证用户输入信息 
   */
  formSubmit(e){
    var app = getApp();
    var {username,phone,sex,date,address,idcard,introduce} = e.detail.value;

    // 验证姓名
    var reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,8}$/i;
    if (username == '') {
      wx.showToast({
        title: '请填写你的姓名',
        icon: 'none',
        duration: 2000
      });
      setTimeout(() => {
        wx.hideToast();
      }, 2000);
      return;
    }else if(!reg.test(username)){
      wx.showToast({
        title: '姓名长度在3-8位',
        icon:'none',
        duration:3000
      });
      setTimeout(()=>{
        wx.hideToast();
      }, 2000);
    }

    // 验证手机号码
    var reg2 = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (phone == '') {
      wx.showToast({
        title: '请填写你的电话',
        icon: 'none',
        duration: 2000
      });
      setTimeout(() => {
        wx.hideToast();
      }, 2000);
      return;
    } else if (!reg2.test(phone)) {
      wx.showToast({
        title: '请按照正确联系方式填写',
        icon: 'none',
        duration: 2000
      });
      setTimeout(() => {
        wx.hideToast();
      }, 2000);
      return;
    }

    // 验证身份证号码
    var reg3 = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
    if(idcard == ''){
      wx.showToast({
        title: '请填写身份证号码',
        icon:'none',
        duration:2000
      });
      setTimeout(()=>{
        wx.hideToast();
      }, 2000);
      return;
    }else if(!reg3.test(idcard)){
      wx.showToast({
        title: '请填写正确的身份证号码',
        icon: 'none',
        duration: 2000
      });
      setTimeout(() => {
        wx.hideToast();
      }, 2000);
      return;
    }

    this.setData({
      username: username,
      phone: phone,
      sex: sex,
      date: date,
      address: address,
      idcard: idcard,
      introduce: introduce,
      finishedInfo:true
    });

    var user = {};
    user.username = username;
    user.phone = phone;
    user.sex = sex;
    user.date = date;
    user.address = address;
    user.idcard = idcard;
    user.introduce = introduce;

    wx.setStorage({
      key: 'user',
      data: user,
    });
    app.globalData.user =  user

  }

})