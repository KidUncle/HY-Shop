<template>
    <Swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in topImages"
      :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </Swiper>
</template>

<script>
import { Swiper , SwiperItem } from '../../../components/common/swiper/index'
export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  data(){
    return{

    }
  },
  props: {
    topImages: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
