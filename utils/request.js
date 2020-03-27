import config from "./config"
export default (url,data={},method="GET")=>{
      return new Promise((resolve,reject)=>{
        //   执行异步任务
        wx.request({
            url:config.host+url,
            data,
            method,
            header:{
              cookie:JSON.parse(wx.getStorageSync('cookies') || '[]').toString(),
            },
            success:(res)=>{
            //   console.log(res.data);
              // 更新banner得数据
            //   this.setData({
            //     bannersList:res.data.banners
            //   })

            // 存储cookies
              if(data.isLogin){
                  wx.setStorage({
                    key:'cookies',
                    data:JSON.stringify(res.cookies)
                  })
              }
            resolve(res.data)
            },
            fail:(error)=>{
            //   console.log(error)
              reject(error)
            }
          })
      })
}