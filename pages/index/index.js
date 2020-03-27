// pages/index/index.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannersList: [], //轮播图数据
    recommendList: [], //推荐歌曲得数据
    topList: [], //排行榜的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 发送请求
    let bannersListData = await request('/banner', {
      type: 2
    })
    this.setData({
      bannersList: bannersListData.banners
    })
    // 获取推荐歌曲得数据
    let recommendListData = await request('/personalized');
    // console.log(recommendListData);
    this.setData({
      recommendList: recommendListData.result
    })
    // 获取排行榜的数据
    let initIdxIds = [0, 1, 2, 3, 4];
    let index = 0;
    let resultArr = [];
    let result; //前端开发模式：单例模式：
    while (index < initIdxIds.length) {
      result = await request(`/top/list?idx=${index++}`);
      let obj = {
        name: result.playlist.name,
        tracks: [...result.playlist.tracks].slice(0, 3)
      };
      resultArr.push(obj);
      this.setData({
        topList: resultArr
      })
    }
    //  放在此处统一更新，会引起白屏
    //   this.setData({
    //       topList:resultArr
    //  })
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