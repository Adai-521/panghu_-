// personal/personal/personal.js
import request from "../../utils/request"
let startY = 0;
let moveY = 0;
let moveDistance = 0;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:'translateY(0)',
    coverTransition:"0s",
    userInfo:{},
    recentPlayList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 1.验证用户是否登录
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
     userInfo = JSON.parse(userInfo)
        this.setData({
          userInfo
        })
      // 发送请求，获取最近播放记录   
        let recentPlayListData = await request("/user/record",{uid:userInfo.profile.userId,type:0})
        // console.log(recentPlayListData);
        this.setData({
          recentPlayList:recentPlayListData.allData
        })
    }
  },



  handleTouchstart(event){
    startY = event.touches[0].clientY;
  },
  handleTouchmove(event){
    moveY = event.touches[0].clientY;
    // 计算移动的距离
    moveDistance = moveY - startY;
    // 1.小于00，不能拖
    if(moveDistance<0){
      return;
    }
    // 2.向下走一定距离 距离80
    if(moveDistance >= 80){
      moveDistance = 80
    }

    this.setData({
      coverTransform:`translateY(${moveDistance}px)`
    })
  },
  handleTouchend(){
    this.setData({
      coverTransform:`translateY(0px)`,
      coverTransition:"transition 5s cubic-bezier(.21,1.93,.53,64)"
    })
  },
// 跳转至个人中心页
  toLogin(){
    if (this.data.userInfo.profile) {
      return;
    }
    wx.redirectTo({
      url:"/pages/login/login"
    })  
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