<template>
    <swiper v-if="banners.length">
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.list">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper,SwiperItem } from 'common/swiper/index'
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      isLoad: false,
    }
  },
  methods:{
    imageLoad(){
      if( !this.isLoad ) {
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    }
  }
}
</script>

<style lang="">

</style>
