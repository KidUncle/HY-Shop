<template>
  <div class="detailNarBar">
    <nav-bar>
      <div slot="left" @click="backClick" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot='center' class="titles">
        <div v-for="(item , index) in titles"
         class="titles-item"
        :key="index"
        :class="{active: index === currentIndex}"
        @click="btnClick(index)">{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/Navbar'


export default {
  name: 'DetailNarBar',
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    btnClick(index){
      this.currentIndex = index;
      this.$emit('titleClick',index);
    },
    backClick(){
      this.$router.back();
    }
  },
  components: {
    NavBar,
  }
}
</script>

<style scoped>

.titles {
  display: flex;
  justify-content: center;
  align-items: center;
}
.titles-item {
  flex: 1;
  font-size: 14px;
}
.active {
  color: red;
}
.back img {
  margin-top: 10px;
}
</style>
