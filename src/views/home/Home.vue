<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="['流行','新款','精选']"
      @tabclick="tabclick"
      class="tab-control"
      v-show="isTabFixed"
      ref='topTabControl'></tab-control>

    <div class="home-list">
      <scroll class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load = "true"
      @pullingup="loadMore">
      <div>
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommend="recommends"/>
        <feature-view/>

        <tab-control :titles="['流行','新款','精选']"
        @tabclick="tabclick"
        ref="tabControl"></tab-control>

        <goods-list :goods-list="showGoodsList"/>
      </div>
      </scroll>
    </div>

    <back-top @click.native="backTop" v-if="showBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

import NavBar from 'common/navbar/Navbar';
import TabControl from 'common/tabControl/TabControl';
import GoodsList from 'content/goods/GoodsList';
import Scroll from 'common/scroll/Scroll';
import BackTop from 'common/backtop/backtop'

import { getHomeMultidata , getHomeData} from 'network/home';

import { debounce } from '@/common/utils';
import { backTopMixin } from '@/common/mixin';
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  computed:{
    showGoodsList() {
		    return this.goodsList[this.currentType].list
      }
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goodsList:{
        'pop':{ page: 1 , list:[] },
        'new':{ page: 1 , list:[] },
        'sell':{ page: 1 , list:[] }
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isShowBackTop: false,
      isTabFixed: false,
    }
  },
  mixins: [
    backTopMixin
  ],
  created(){
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted(){
    // 3.监听item中图片加载完成
    // 这里有bug
    const refresh =  debounce(this.$refs.scroll.scroll.refresh,500);
    this.$bus.$on('itemImageLoad',() => {
      //refresh();
      this.$refs.scroll.scroll.refresh();
    })
  },
  methods:{
    // 事件监听
    tabclick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
        break;
        case 1:
          this.currentType = 'new'
        break;
        case 2:
          this.currentType = 'sell'
        break;
      };
      this.$refs.topTabControl.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },

    contentScroll(position){
      // 1. 判断BackTop是否显示
     this.showBackTop = (-position.y) > 2000;

      // 2. 决定tabControl是否吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },

    loadMore(){
      this.getHomeGoods(this.currentType);
    },

    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    // 网络请求事件
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      getHomeData(type,this.goodsList[type].page).then(res =>{
        const goodsList = res.data.list;
        this.goodsList[type].list.push(...goodsList)
        this.goodsList[type].page += 1

        this.$refs.scroll.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
   .home {
     position: relative;
   }
   .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    z-index: 10; */
  }
  .home-list {
    height: calc(100vh - 44px - 49px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
  .tab-control{
    position: relative;
    z-index: 10;
    background: #fff
  }
</style>
