// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeNavList: [],
    typeList: [],         // 工作种类
    awardList: [],
    rankList: [],
    filterList: [], 
    isShowTypeNav: false, // 选中类型
    isShowMask: false,      // 是否显示选择工作的遮罩层
    isShowItem: false,
    isShowAward: false,
    isShowRank: false,
    isShowFilter: false,
    typeNavIndex: -1,  // 临时类型选择导航 index 
    awardIndex: -1,     // 奖励金index
    filterIndex: -1,    // 筛选index
    companyProfileList: [],
    jobTypeList: [],
    changeJobType: [],
    queryGenderAndSalary:[],
    showType:false,
    hasMore:true,
    typeFixed:false,
    isShowFilterNav:true,
    nickName:'',
    companyName:'',  // 输入的查询公司名称
    loadMoreJobs:[]  // 加载出的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    this.setData({
      companyProfileList: app.globalData.companyProfileList,
      typeNavList: app.globalData.typeNavList,
      typeList: app.globalData.typeList,
      awardList: app.globalData.awardList,
      rankList: app.globalData.rankList,
      filterList: app.globalData.filterList,
      nickName: app.globalData.nickName
    });

    this.loadMoreHandle(app.globalData.jobTypeList);
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
    var app = getApp();
    setTimeout(() => {
      // 搜索为空 且  不是导航栏查询
      if (this.data.companyName == '' && this.data.hasMore == true){
        this.loadMoreHandle(app.globalData.jobTypeList);
      }else{
        this.loadMoreHandle(this.data.jobTypeList);
      }
    }, 1000);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  /**
   * 获取滚动条当前位置
   */
  onPageScroll: function (e) { 
    if (e.scrollTop>80){
      this.setData({
        typeFixed:true
      });
    } else {
      this.setData({
        typeFixed: false
      });
    }
  },

  scroll: function (e) {
  }, 
  upper: function (e) {
  },
  lower: function (e) {
    wx.showToast({
      title: '已经没有更多的数据了',
      icon: 'none',
      duration: 2000
    });
    setTimeout(() => {
      wx.hideToast();
    }, 2000);
  },

  /**
   * 查询公司信息
   */
  queryCompany(e){
    const app = getApp();
    var name = e.detail.value.companyName;
    var queryCompanyList = [];
    var list = app.globalData.jobTypeList;
    for (var i = 0; i < list.length;i++){
      if(list[i].name.indexOf(name) != -1){
        queryCompanyList.push(list[i]);
      }
    }
    this.setData({
      companyName:name,
      jobTypeList:queryCompanyList,
      hasMore:false
    })

  },

  /**
   * 改变显示样式
   */
  changeShowType:function(){
    var flag = this.data.showType;
    this.setData({
      showType:!flag
    });
  },

  /**
   * 换一批
   */
  changeCompanyHandle: function (e) {
    this.setData({
      changeJobType: []
    });
    var tmp = -1;
    for (var i = 0; i < 2; i++) {
      var num = Math.floor(Math.random() * (this.data.jobTypeList.length));
      if (tmp != num) {
        if (this.data.changeJobType.length == 2) {
          break;
        }
        var status = `changeJobType[${i}]`;
        this.setData({
          [status]: this.data.jobTypeList[num]
        });
      } else if (tmp == num) {
        i--;
      }
      tmp = num;
    }
  },

  /**
   * 显示遮罩层
   */
  showTypeMask: function (e) {
    var flag = e.currentTarget.dataset.choose;
    var index = e.currentTarget.dataset.index;
    // type导航 如果已点击选中 则再次
    if (this.data.typeNavIndex == index) {
      // console.log("不能再点啦");
      return;
    }
    // 设置isShowFilterNav为false
    this.setData({
      isShowFilterNav: false
    });
    
    // 已经显示mask 再点击其他的nav 将之前点击的取消active
    if (this.data.typeNavIndex != -1) {
      var status = `typeNavList[${this.data.typeNavIndex}].isChoose`;
      this.setData({
        [status]: false
      });
    }

    // 初始化所有nav下的list
    this.setData({
      isShowItem: false,
      isShowAward: false,
      isShowRank: false,
      isShowFilter: false
    });

    // 保存当先被选中nav的index
    this.setData({
      typeNavIndex: index
    });

    var status = `typeNavList[${index}].isChoose`;
    if (index == 0) {
      for (var t of this.data.typeNavList) {
        t.isChoose = false;
      }
      this.setData({
        isShowItem: true
      });
    } else if (index == 1) {
      this.setData({
        isShowAward: true
      });
    } else if (index == 2) {
      this.setData({
        isShowRank: true
      });
    } else if (index == 3) {
      this.setData({
        isShowFilter: true,
        isShowFilterNav: true
      });
    }

    this.setData({
      [status]: !flag,
      isShowMask: true
    });

  },
  
  /**
   * 隐藏遮罩层
   */
  hideTypeMask: function (e) {
    // 遍历是哪一个nav
    var typeNav = {};
    for (var nav of this.data.typeNavList) {
      if (nav.isChoose) {
        typeNav = nav;
        break;
      }
    }

    // 给jobTypeList最新最全的值
    const app = getApp();
    this.setData({
      jobTypeList: app.globalData.jobTypeList
    });

    var list = [];
    // 遍历nav的对应的 navList
    if (typeNav.name == '类型') {
      list = this.data.typeList;
      var queryType = [];
      var queryListVal = [];
      // 筛选被选择的标签  queryType
      for (var tmp of list) {
        if (tmp.isChoose) {
          queryType.push(tmp);
        }
      }
      // 没有选择任何类型
      if (queryType.length == 0){
        queryListVal = this.data.jobTypeList;
      }else{
      // 列表数据中对应的 选择标签的数据  queryListVal
        for (var tmp of this.data.jobTypeList) {
          for (var q of queryType) {
            if (tmp.job == q.name) {
              queryListVal.push(tmp);
              break;
            }
          }
        }
      }
      
      this.setData({
        jobTypeList: queryListVal
      });

    } else if (typeNav.name == '奖励金额') {
      list = this.data.awardList;
      // 存储需要查询的内容
      var queryType = [];
      for (var tmp of list) {
        if (tmp.isChoose) {
          queryType.push(tmp);
        }
      }
      var queryListVal = [];
      // 如果没有选择 金额 直接返回所有
      if (queryType.length !== 0){
        // 查询奖励金在queryType区间的
        var [minAward, maxAward] = queryType[0].award.split('-');
        for (var tmp of this.data.jobTypeList) {
          // 如果是最后一个选项 4000以上， 特殊处理
          if (!maxAward) {
            minAward = parseInt(minAward);
            if (tmp.award >= parseInt(minAward)) {
              queryListVal.push(tmp);
            }
          } else {
            if (tmp.award >= parseInt(minAward) && tmp.award <= parseInt(maxAward)) {
              queryListVal.push(tmp);
            }
          }
        }
        this.setData({
          jobTypeList: queryListVal
        });
      }
    } else if (typeNav.name == '综合排序') {
      list = this.data.rankList;
      var queryType = [];
      var queryListVal = [];
      // 筛选被选择的标签  queryType
      for (var tmp of list) {
        if (tmp.isChoose) {
          queryType.push(tmp);
        }
      }
      if (queryType.length != 0){
        var jobTypeList = this.data.jobTypeList;
        // 离我最近
        jobTypeList.sort(function (a, b) {
          a = new Date(a.publishTime);
          b = new Date(b.publishTime);
          return b - a;// 降序
        });
        this.setData({
          jobTypeList
        });
      }
    } else if (typeNav.name == '筛选') {
      this.setData({
        jobTypeList: this.data.queryGenderAndSalary
      });
    }
    // 设置
    var status = `typeNavList[${this.data.typeNavIndex}].isChoose`;
    this.setData({
      isShowItem: false,
      isShowAward: false,
      isShowRank: false,
      isShowFilter: false,
      [status]: false,
      typeNavIndex: -1,
      isShowMask: !this.data.isShowMask,
      hasMore: false
    });
  },

  /**
   * 过滤工资
   */
  filterSalary: function (e) {
    var { minSalary, maxSalary } = e.detail.value;
    // 给jobTypeList最新最全的值
    const app = getApp();
    this.setData({
      jobTypeList: app.globalData.jobTypeList
    });
    // 筛选出性别
    var gender = '';
    for (var tmp of this.data.filterList) {
      if (tmp.isChoose) {
        gender = tmp.name;
        break;
      }
    }
    // 筛选出性别 数据
    var queryGender = [];
    if (gender == '') {
      queryGender = this.data.jobTypeList;
    } else{
      for (var tmp of this.data.jobTypeList) {
        if (tmp.gender == gender) {
          queryGender.push(tmp);
        }
      }
    }

    // 筛选工资
    var querySalaryVal = [];
    if (minSalary == '') {
      minSalary = 0;
    }
    if (maxSalary == '') {
      maxSalary = 10000000;
    }
    for (var tmp of queryGender) {
      if (tmp.minSalary >= parseInt(minSalary) &&
        tmp.maxSalary <= parseInt(maxSalary)) {
        querySalaryVal.push(tmp);
      }
    }
    this.setData({
      queryGenderAndSalary: querySalaryVal
    });
    // 关闭mask 同时给jobTypeList 赋值
    this.hideTypeMask();
  },

  /**
   * 选择工作类型
   */
  typeChooseHandle: function (e) {
    var flag = e.target.dataset.choose;
    var index = e.target.dataset.index;
    var isChoose = `typeList[${index}].isChoose`;
    this.setData({
      [isChoose]: !flag
    });
  },

  /**
   * 选择奖励金额
   */
  awardChooseHandle: function (e) {
    // 单选 取消之前选中的
    if (this.data.awardIndex != -1) {
      var status = `awardList[${this.data.awardIndex}].isChoose`;
      this.setData({
        [status]: false
      })
    }
    var flag = e.target.dataset.choose;
    var index = e.target.dataset.index;
    var status = `awardList[${index}].isChoose`;
    this.setData({
      awardIndex: index,
      [status]: !flag
    })
  },

  /**
   * 选择综合排序
   */
  rankChooseHandle: function (e) {
    var flag = e.target.dataset.choose;
    var index = e.target.dataset.index;
    var status = `rankList[${index}].isChoose`;
    this.setData({
      [status]: !flag
    })
  },

  /**
   * 筛选
   */
  filterChooseHandle: function (e) {
    // 单选 取消之前选中的
    if (this.data.filterIndex != -1) {
      var status = `filterList[${this.data.filterIndex}].isChoose`;
      this.setData({
        [status]: false
      })
    }
    var flag = e.target.dataset.choose;
    var index = e.target.dataset.index;
    var status = `filterList[${index}].isChoose`;
    this.setData({
      filterIndex: index,
      [status]: !flag
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
  },

  /**
   * 加载更多
   */
  loadMoreHandle(jobTypeList) {
    var app = getApp();
    var len = this.data.jobTypeList.length;
    var jobs = this.data.jobTypeList;
    for (var i = len; i < len + 2; i++) {
      if (i >= jobTypeList.length) {
        console.log('没有更多数据啦啦啦');
        this.setData({
          hasMore: false
        });
        return;
      }
      jobs.push(jobTypeList[i]);
    }
    this.setData({
      jobTypeList: jobs
    });
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


})