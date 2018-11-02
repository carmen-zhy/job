//app.js
App({

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取缓存的nickName
    var _this = this;
    wx.getStorage({
      key: 'nickName',
      success: function (res) {
        _this.globalData.nickName = res.data
      }
    });

    // 获取缓存的 avatarUrl 
    wx.getStorage({
      key: 'avatarUrl',
      success: function (res) {
        _this.globalData.avatarUrl = res.data
      }
    });

    // 获取缓存的 collectIndex
    wx.getStorage({
      key: 'collectIndex',
      success: function (res) {
        _this.globalData.collectIndex = res.data;
      },
    });

    // 获取缓存的 applyJobIndex
    wx.getStorage({
      key: 'applyJobIndex',
      success: function(res) {
        _this.globalData.applyJobIndex = res.data;
      },
    });

    // 获取缓存的 user
    wx.getStorage({
      key: 'user',
      success: function (res) {
        _this.globalData.user = res.data;
      },
    });

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    typeNavList: [
      { id: 1, name: '类型', isChoose: false},
      { id: 2, name: '奖励金额', isChoose: false },
      { id: 3, name: '综合排序', isChoose: false },
      { id: 4, name: '筛选', isChoose: false }
    ],
    typeList: [
      { id: 1, name: '前端开发工程师', isChoose: false },
      { id: 2, name: '销售', isChoose: false },
      { id: 3, name: '培训主管', isChoose: false },
      { id: 4, name: '财务', isChoose: false },
      { id: 5, name: 'Java开发工程师', isChoose: false },
      { id: 6, name: '厨司', isChoose: false },
      { id: 7, name: '电工', isChoose: false },
      { id: 8, name: '客服', isChoose: false },
      { id: 9, name: '电子工', isChoose: false },
      { id: 10, name: '司机', isChoose: false },
      { id: 11, name: '快递员', isChoose: false }
    ],         // 工作种类
    awardList: [
      { id: 1, award: '1000-2000', isChoose: false },
      { id: 2, award: '2000-3000', isChoose: false },
      { id: 3, award: '3000-4000', isChoose: false },
      { id: 4, award: '4000以上', isChoose: false },
    ],
    rankList: [
      { id: 1, name: '最新发布', isChoose: false },
      { id: 2, name: '离我最近', isChoose: false }
    ],
    filterList: [
      { id: 1, name: '全部', isChoose: false },
      { id: 2, name: '男可做', isChoose: false },
      { id: 3, name: '女可做', isChoose: false }
    ],
    companyProfileList: [
      {
        id: 1, name: '阿里巴巴', address: '浙江省杭州市', imgUrl: '/assets/home/c1.png',
        profile: '阿里巴巴网络技术有限公司（简称：阿里巴巴集团）是以曾担任英语教师的马云为首的18人于1999年在浙江杭州创立。阿里巴巴集团经营多项业务，另外也从关联公司的业务和服务中取得经营商业生态系统上的支援。业务和关联公司的业务包括：淘宝网、天猫、聚划算、全球速卖通、阿里巴巴国际交易市场、1688、阿里妈妈、阿里云、蚂蚁金服、菜鸟网络等。2014年9月19日，阿里巴巴集团在纽约证券交易所正式挂牌上市，股票代码“BABA”，创始人和董事局主席为马云。2018年7月19日，全球同步《财富》世界500强排行榜发布，阿里巴巴集团排名300位。'},
      {
        id: 2, name: '腾讯', address: '广东省深圳市', imgUrl: '/assets/home/c2.png',
        profile: '深圳市腾讯计算机系统有限公司成立于1998年11月，由马化腾、张志东、许晨晔、陈一丹、曾李青五位创始人共同创立。 [1]  是中国最大的互联网综合服务提供商之一，也是中国服务用户最多的互联网企业之一。腾讯多元化的服务包括：社交和通信服务QQ及微信/WeChat、社交网络平台QQ空间、腾讯游戏旗下QQ游戏平台、门户网站腾讯网、腾讯新闻客户端和网络视频服务腾讯视频等。2004年腾讯公司在香港联交所主板公开上市（股票代号00700），董事会主席兼首席执行官是马化腾。'},
      {
        id: 3, name: '百度', address: '上海市', imgUrl: '/assets/home/c3.png',
        profile: '百度（纳斯达克：BIDU），全球最大的中文搜索引擎、最大的中文网站。1999年底,身在美国硅谷的李彦宏看到了中国互联网及中文搜索引擎服务的巨大发展潜力，抱着技术改变世界的梦想，他毅然辞掉硅谷的高薪工作，携搜索引擎专利技术，于 2000年1月1日在中关村创建了百度公司“百度”二字, 来自于八百年前南宋词人辛弃疾的一句词：众里寻他千百度。这句话描述了词人对理想的执着追求。百度拥有数万名研发工程师，这是中国乃至全球最为优秀的技术团队。这支队伍掌握着世界上最为先进的搜索引擎技术，使百度成为中国掌握世界尖端科学核心技术的中国高科技企业，也使中国成为美国、俄罗斯、和韩国之外，全球仅有的4个拥有搜索引擎核心技术的国家之一。'},
      {
        id: 4, name: '小米', address: '上海市', imgUrl: '/assets/home/c4.png',
        profile: '北京小米科技有限责任公司成立于2010年3月3日 ，是一家专注于智能硬件和电子产品研发的移动互联网公司，同时也是一家专注于高端智能手机、互联网电视以及智能家居生态链建设的创新型科技企业。 为发烧而生”是小米的产品概念。小米公司创造了用互联网模式开发手机操作系统、发烧友参与开发改进的模式。小米还是继苹果、三星、华为之后第四家拥有手机芯片自研能力的科技公司。' },
      {
        id: 5, name: '京东', address: '北京市', imgUrl: '/assets/home/c5.png',
        profile: '京东（股票代码：JD），中国自营式电商企业，创始人刘强东担任京东集团董事局主席兼首席执行官 [1]  。旗下设有京东商城、京东金融、拍拍网、京东智能、O2O及海外事业部等。2013年正式获得虚拟运营商牌照。2014年5月在美国纳斯达克证券交易所正式挂牌上市。 2016年6月与沃尔玛达成深度战略合作，1号店并入京东。' },
      {
        id: 7, name: '唐卡豆子', address: '广州市', imgUrl: '/assets/home/my.png',
        profile: '唐卡豆子，个人测试demo。如有涉及企业信息侵权，请告知，立刻删除'
      }
    ],
    jobTypeList: [
      {
        id: 1, cid: 1, job: '前端开发工程师', minSalary: 10000, name: '阿里巴巴',
        maxSalary: 2000, recruitNum: '不限', gender: '全部', publishTime: '2018/10/14',
        award: 3000, interestedNum: 2, imgUrl: '/assets/home/j1.png', address: '浙江省杭州市',
        jobProfile: `
        1、负责Web前端技术架构及核心组件、框架开发
        2、负责web前端项目设计、功能的开发、文档编写（用户手册等），持续优化代码，保持主流浏览器的兼容性；
        3、参与制定和编写前端规范文档 (如：设计标准)及标准管理；
        4、与产品同事沟通交流产品设计优化、与后端技术团队协作开发 。`, 
        warmPrompt: `
        1、三年以上前端工作经验；
        2、精通HTML&CSS，熟悉 W3C 标准，掌握Bootstrap、jQuery等常见框架的使用
        3、对目前主流的一些MVC、MVVM框架，如react、VueJS等有了解并使用的经验
        4、熟悉响应式布局, 客户端性能优化，会使用 bootstrap/Pure/foundation等至少一种
        5、熟悉web项目的测试、错误处理及发布生产（tomcat容器）
        6、 熟练使用git,会使用Webpack 或 Gulp 等前端构建工具实现开发流程自动化`
        , label:['奖励最高', '名企']
      }, {
        id: 2, cid: 2, job: 'Java开发工程师', minSalary: 15000, name: '腾讯',
        maxSalary: 26000, recruitNum: '不限', gender: '男可做', publishTime: '2018/9/23',
        award: 4000, interestedNum: 2, imgUrl: '/assets/home/j2.png', address: '广东省深圳市',
        jobProfile: `
        1、负责Java服务器端开发；
        2、按计划完成产品模块的代码编写，产品模块测试，保证代码质量；
        3、编写接口文档并与前端开发工程师进行接口对接。
        4、具备良好的沟通协调能力和团队意识。`,
        warmPrompt: `
        1、本科及以上学历，计算机或相关专业毕业，2年以上java服务器端开发经验；
        2、java基础扎实，有良好的面向对象设计思想；
        3、熟悉Mysql或Mongodb数据库，并具有一定性能优化经验；
        4、有Memcache或Redis使用经验；
        5、熟练Http及Socket开发，对线程有深入了解；
        6、有Dubbo使用经验优先；
        7、有高并发及分布式项目开发经验优先。`, 
        label: ['奖励最高', '管理费']
      }, {
        id: 3, cid: 3, job: '大数据开发工程师', minSalary: 14000, name: '百度',
        maxSalary: 26000, recruitNum: '不限', gender: '全部', publishTime: '2018/9/20',
        award: 3000, interestedNum: 2, imgUrl: '/assets/home/j3.png', address: '上海市',
        jobProfile: `
        1. 负责数据采集、清洗、存储、展现、监控工具的开发；
        2. 参与数据基础架构和处理流程的设计和优化；
        3. 为商务智能、运营决策提供可靠稳定的数据平台服务；`, 
        warmPrompt: `
        1.大学本科以上学历，计算机、软件相关专业优先；
        2.熟悉MySQL，对MySQL的较大量数据存储、优化有丰富的经验；
        3. 一年以上基于hadoop、hive、spark等分布式计算环境进行大数据处理经验优先；
        4. 熟练使用Linux，熟悉一种以上脚本语言（Shell、Perl、Python等）；
        5.对常见的数据分析模型有一定的了解，有海量数据分析项目经验、数据挖掘项目经验尤佳；
        6.优秀的解决问题、抗压能力，具有较强的数据分析能力
        7.有较强的抗压能力；
        `, label: ['口碑爆棚', '名企']
      }, {
        id: 4, cid: 4, job: '销售', minSalary: 7000, name: '小米', address: '上海市',
        maxSalary: 15000, recruitNum: '不限', gender: '女可做', publishTime: '2018/9/16',
        award: 2000, interestedNum: 2,imgUrl: '/assets/home/j4.png',
        jobProfile: `
        1、迅速熟悉商圈及证券知识——师傅一对一、手把手教学；
        2、积累并开发客户——善用积累资源；
        3、根据客户需求意向，为客户讲解产品——对销售产品了如指掌；
        4、达成业务成交——商务谈判实践及能力培养；
        5、为客户提供优质服务——赢得客户信任，自然会有源源不断的介绍客户。`, 
        warmPrompt: `
        1、弹性工作时间
        2、新人无责任底薪4000元，提成10-20%，奖金500-2000
        第一阶段：3个月  销售管培生  5200-6200元
        第二阶段：6个月  销售专员    7000-9000元
        第三阶段：9个月  资深销售    17560元+
        第四阶段：12个月  储备职业经理人     年薪50万-80万  参与职业经理人培养计划`,
         label: ['奖励最高', '优职']
      },
      {
        id: 5, cid: 5, job: '培训主管', minSalary: 12000, name: '京东', address: '北京市',maxSalary: 30000, recruitNum: '5', gender: '全部', publishTime: '2018/9/15',
        award: 2000, interestedNum: 2, imgUrl: '/assets/home/j5.png',
        jobProfile: `
        1、新人训岗前培训、在岗培训以及后期成长跟进（不定时培训新人谈单，发现其问题所在并给予其做对应的能力提升，迅速使其快速成长），
        2、新员工参加岗前培训后，及时准确地发现新员工技能提升空间，有计划的组织辅导、培训，提高新员工销售短板，有效减少流失；
        3、内部老员工能力提升，定时定期发现并反馈团队问题，及时与团队主管、经理沟通，确保销售团队地健康与稳定；
        通过观察和沟通发现员工惯性存在问题并及时处理；和包括管理能力提升；
        4、企业文化和公司制度宣贯和推行，提高大家对公司的认可度和归属感觉；
        5、周大会组织、月度启动会策划和组织、季度户外拓展活动组织；
        6、销售团队月度、季度业绩激励的宣贯；`,
        warmPrompt: `
        1、大专及以上学历
        2、培训出身，2年以上互联网或房地产相关培训管理工作经验；
        3、优秀的语言表达能力及良好的文字组织能力，善于分享，高效沟通，注重团队协作。
        4、从事过写字楼商业地产销售主管者优秀者亦考虑。`, 
        label: ['奖励最高', '口碑爆棚']
      }, 
      {
        id: 6, cid: 4, job: '财务', minSalary: 7000, name: '小米', address: '湖北省武汉市',
        maxSalary: 15000, recruitNum: '不限', gender: '全部', publishTime: '2018/10/14',
        award: 5000, interestedNum: 2, imgUrl: '/assets/home/j6.png',
        jobProfile: `
        1、负责公司全盘账务处理，编制公司资产负债，所有者权益，现金流量及香港子公司合并财报；
        2、办理公司各项税收业务，拟定并实施纳税筹划策略，控制税务风险；
        3、有海外财税处理经验，结算并核对海外业务收入，办理相关海外业务税收备案等；
        4、双软企业及高新技术企业申请及相关工作处理；
        5、协助资金管理操作，合同审核；
        6、协助处理其他上级安排的任务。`,
        warmPrompt: `
        1、财会及相关专业，本科及以上学历，两年以上总账会计或税务会计工作经验；
        2、能独立处理全盘账务，精通财务知识及工作流程，熟悉国家税务政策；
        3、熟练操作金蝶K3及各种办公软件；
        4、工作踏实、细致，认真负责，有高度的责任心、良好的职业道德及沟通能力，风险意识高
        5、有移动广告，游戏类、移动互联网任职经验优先，有海外收入结算经验优先；
        6、熟悉香港的会计政策，有一年以上的香港会计处理经验。`, 
        label: ['奖励最高', '口碑爆棚']
      }
    ],
    avatarUrl: '',
    nickName: '',
    collectIndex:[],
    applyJobIndex:[],
    user:{}
  },


})