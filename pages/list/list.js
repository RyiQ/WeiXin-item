// pages/list/list.js
const fetch = require('../../utills/fetch')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*分类下全部店铺*/
    shops:[],
    /*分类*/
    category:{},
    pageIndex:0,
    pageSize:20,
    hasMore:true
  },

  loadMore(){
    if(!this.data.hasMore) return 
    let {pageIndex,pageSize} = this.data
    const n={_page:++pageIndex,_limit:pageSize}
    fetch(`categories/${this.data.category.id}/shops`,n)
      .then(res=>{
        const totalCount = parseInt(res.header['X-Total-Count'])
        const hasMore = pageIndex*pageSize<totalCount
        const shops=this.data.shops.concat(res.data)
      this.setData({shops,pageIndex,hasMore})
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`categories/${options.cat}`).then(res=>{
      //wx.setNavigationBarTitle({
        //title:res.data.name
     // })
     this.setData({category:res.data})
     wx.setNavigationBarTitle({
        title:res.data.name
      })
     this.loadMore()
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.category.name){
      wx.setNavigationBarTitle({
        title:res.data.name
      })
    }
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
    this.setData({shops:[],pageIndex:0,hasMore:true})
    this.loadMore()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})