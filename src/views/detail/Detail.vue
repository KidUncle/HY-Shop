<template>
  <div class="detail">
   <detail-nav-bar
   class="detail-nav"
   ref="detailnavbar"
   @titleClick="titleClick"></detail-nav-bar>
   <div class="detail-content">
   <scroll class="content"
   :probe-type="3"
   ref="scroll"
   @scroll="contentScroll">
     <div>
       <detail-swiper :top-images="topImages"/>
       <detail-base-info :goods="goods"/>
       <detail-shop-info :shop='shop' />
       <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
       <detail-param-info :param-info="paramInfo" ref="paramsinfo"/>
       <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
       <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
     </div>
   </scroll>
   </div>
   <back-top @click.native="backTop" v-if="showBackTop" class="back-top"/>
   <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from './childComps/DetailRecommendInfo'
import DetailBottomBar from './childComps/DetailBottomBar'


import Scroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/common/backtop/backtop'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from '../../network/detail'
import { backTopMixin } from '../../common/mixin'

import {mapActions} from 'vuex';
export default {
  name: 'Detail',
  data(){
    return {
      iid:null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      currentIndex: 0,
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    Scroll,
    BackTop,
  },
  mixins:[
    backTopMixin
  ],
  created() {
    this.iid = this.$route.query.iid;
    this._getRecommend();

    getDetail(this.iid).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      this.shop = new Shop(data.shopInfo);
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
      this.detailInfo = data.detailInfo;

      // 7.获取评论信息
      if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
    })
  },
  updated(){
    this.themeTopYs = [];
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.paramsinfo.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  },
  methods: {
    imageLoad(){
      this.$refs.scroll.scroll.refresh();
    },
    _getRecommend(){
      getRecommend().then((res,error) => {
        if (error) return
        this.recommendList = res.data.list
      })
    },
    contentScroll(position){
      const y = -position.y
      this.showBackTop = y > 2000;
      let length = this.themeTopYs.length;
      for(let i = 0; i < length; i++){
        if(this.currentIndex !== i && ((i < length - 1 && y > this.themeTopYs[i] && y < this.themeTopYs[i+1]) ||
        (i == length - 1 && y > this.themeTopYs[i]))){
          this.currentIndex = i;
          this.$refs.detailnavbar.currentIndex = this.currentIndex;
        }
      }
    },
    titleClick(index){
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],200);
    },
    ...mapActions(['addCart']),
    addToCart(){
      const product = {};

      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      //product.price = this.goods.newPrice;
      const prices = this.goods.newPrice.match(/\d+(.\d+)/g);
      product.price = prices
      product.iid = this.iid;

      this.addCart(product).then(res => {

        this.$toast.show(res,2000);
        //console.log(res);
      })
    }
  }
}
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
  .content {
    height: 100%;
  }
  .back-top {
    bottom: 55px;
  }
</style>
