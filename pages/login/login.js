// pages/login/login.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      phone:"",
      password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleBlur(event){
    let type = event.currentTarget.dataset.type;
    this.setData({
        [type]:event.detail.value
    })
  },
  async login(){
    // 1.获取表单数据
    let{phone,password} = this.data;
    //2.前端验证
    if(!phone || !password){
        return;
    }
    // 3.后端验证
    let loginData = await request(`/login/cellphone`,{phone,password,isLogin:true})
   if (loginData.code === 200) {
     wx.showToast({
       title:"登陆成功",
       icon:"success"
     })
    //  1.将用户登陆成功的数据存入本地
    wx.setStorage({
      key:"userInfo",
      data:JSON.stringify(loginData)
    })
    // 2.跳转到个人中心
    // wx.switchTab && wx.redirectTo
    wx.switchTab({
      url:"/pages/personal/personal"
    })
   }else{
    wx.showToast({
      title:"登陆失败",
      icon:"loading"
    })
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

  }
})